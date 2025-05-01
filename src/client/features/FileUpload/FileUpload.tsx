import React, { useRef, useState } from 'react';

import { Alert } from '../../shared/components/Alert';
import { SectionHeader } from '../../shared/components/SectionHeader';
import classList from '../../shared/lib/classList';
import FilesList from '../../widgets/FileList/FileList';

import { useFileUpload } from './model/useFileUpload';

const DEFAULT_TITLE = 'File Uploader';
const MESSAGE_CHOOSE_FILES = 'Choose files...';

export interface FileUploadUIProps {
    title?: string;
    accept?: string;
    multiple?: boolean;
}

export interface FileUploadProps extends FileUploadUIProps {
    uploadUrl: string;
    onUploadComplete?: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
    uploadUrl,
    accept = '*/*',
    multiple = false,
    title = DEFAULT_TITLE,
    onUploadComplete = () => {},
}) => {
    const { upload, uploading, error, clearError } = useFileUpload(uploadUrl);
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const uploadDisabled = uploading || selectedFiles.length === 0;

    // @todo: add support for drag-and-dropping files onto a dropzone,
    // and the visualizing respective active states, or use dropzone

    // @todo: add support for large files -> chunked

    const pickFiles = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
            clearError();
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            return;
        }
        try {
            await upload(selectedFiles);
            onUploadComplete(selectedFiles);
            setSelectedFiles([]);
        } catch {
            /* do nothing */
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
                    'w-full flex-1 p-2 rounded-md bg-gray-50',
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
