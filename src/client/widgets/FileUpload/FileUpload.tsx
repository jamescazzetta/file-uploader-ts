import React, { useRef, useState } from 'react';

import FilesList from '../../components/FileList/FileList';
import classList from '../../shared/lib/classList';
import { Alert } from '../../shared/ui/Alert/Alert';
import { SectionHeader } from '../../shared/ui/SectionHeader/SectionHeader';

const DEFAULT_TITLE = 'File Uploader';
const MESSAGE_CHOOSE_FILES = 'Choose files...';

export interface FileUploadProps {
    title?: string;
    accept?: string;
    uploadUrl: string;
    multiple?: boolean;
    onUploadComplete?: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
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
    const uploadDisabled = uploading || selectedFiles.length === 0;

    // @todo: add support for drag-and-dropping files onto a dropzone,
    // and the visualizing respective active states, or use dropzone

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
                            // @todo: could be solved in a nicer way
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
        <div className="p-2 space-y-2 flex flex-col min-h-0 overflow-auto">
            <SectionHeader title={title}>
                <button
                    onClick={handleUpload}
                    disabled={uploadDisabled}
                    className={classList(
                        'px-4 py-2 rounded',
                        uploadDisabled
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-emerald-300 text-black hover:bg-emerald-400 focus:ring-emerald-500'
                    )}
                >
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </SectionHeader>

            <label htmlFor="file-upload" className="sr-only">
                {MESSAGE_CHOOSE_FILES}
            </label>
            <input
                type="file"
                ref={inputRef}
                accept={accept}
                id="file-upload"
                multiple={multiple}
                className="sr-only"
                onChange={handleFileChange}
            />

            <div
                tabIndex={0}
                role="button"
                onClick={pickFiles}
                /* 
                    @todo: add drag and drop support..
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                */
                onKeyUp={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        pickFiles();
                    }
                }}
                className={classList(
                    'w-full flex-1 py-2 border rounded-md bg-gray-50',
                    'flex flex-col items-center justify-center transition-colors',
                    'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500',
                    'hover:bg-gray-100'
                )}
            >
                {uploadDisabled && <span className="text-gray-700">{MESSAGE_CHOOSE_FILES}</span>}
                {selectedFiles.length > 0 && <FilesList files={selectedFiles} showHeader={false} />}
            </div>

            {error && <Alert content={error} />}
        </div>
    );
};
