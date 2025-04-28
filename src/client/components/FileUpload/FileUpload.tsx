import React, { useRef, useState } from 'react';

import classList from '../../lib/classList';

import UploadPreviewer from './UploadPreviewer';
import commonClassNames from '../../lib/commonClassNames';

const DEFAULT_TITLE = 'File Uploader';

export interface FileUploadProps {
    title?: string;
    accept?: string;
    uploadUrl: string;
    multiple?: boolean;
    children?: React.ReactNode;
    onUploadComplete?: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
    children,
    uploadUrl,
    accept = '*/*',
    multiple = false,
    title = DEFAULT_TITLE,
    onUploadComplete = () => {},
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const pickFiles = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            return;
        }
        setUploading(true);
        setError(null);

        try {
            // @todo: we might want to show per-file progress, cancel actions
            await Promise.all(
                selectedFiles.map((file) => {
                    const form = new FormData();
                    form.append('file', file);
                    return fetch(uploadUrl, {
                        method: 'POST',
                        body: form,
                    }).then((res) => {
                        if (!res.ok) {
                            throw new Error(`Failed: ${file.name}`);
                        }
                    });
                })
            );

            onUploadComplete(selectedFiles);
            setSelectedFiles([]);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <h2 className={commonClassNames.h2}>{title}</h2>
            <input
                type="file"
                ref={inputRef}
                accept={accept}
                multiple={multiple}
                className="sr-only"
                onChange={handleFileChange}
            />

            <button
                type="button"
                onClick={pickFiles}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg focus:outline-none focus:ring"
            >
                {children ?? 'Choose files...'}
            </button>

            {selectedFiles.length > 0 && (
                <div className="p-4 border rounded-md space-y-2 bg-gray-50">
                    <UploadPreviewer files={selectedFiles} />
                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className={classList(
                            'px-4 py-2 rounded',
                            uploading
                                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                : 'bg-green-600 text-white hover:bg-green-700'
                        )}
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            )}

            {error && (
                <div role="alert" className="text-red-600">
                    {error}
                </div>
            )}
        </div>
    );
};
