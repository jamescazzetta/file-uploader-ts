import React, { useEffect, useState } from 'react';

import commonClassNames from '../../lib/commonClassNames';
import { VirtualList } from '../VirtualList/VirtualList';

const MESSAGE_LOADING = 'Loading Files...';
const DEFAULT_TITLE = 'Uploaded Files';

interface UploadedFilesListProps {
    /** The URL to fetch files from */
    filesUrl: string;
    /** The title of the component */
    title?: string;
}

interface FileItem {
    name: string;
    size: number;
}

interface FilesApiResponse {
    files: FileItem[];
}

export const UploadedFilesList: React.FC<UploadedFilesListProps> = ({ filesUrl, title = DEFAULT_TITLE }) => {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFiles = async () => {
            const response = await fetch(filesUrl);
            const data = (await response.json()) as FilesApiResponse;
            setFiles(data.files);
        };

        fetchFiles()
            .catch((error) => {
                console.error('Failed to fetch files:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [filesUrl]);

    const header = (
        <div className="flex items-center px-4 py-2 border-b font-semibold text-gray-700">
            <span className="flex-1 min-w-0 truncate">File name</span>
            <span className="flex-none ml-4">Size</span>
        </div>
    );

    const renderFile = (file: FileItem, _: number) => {
        const sizeKB = `${(file.size / 1024).toFixed(2)} KB`;

        return (
            <div className="flex items-center px-4 hover:bg-gray-100 transition-colors">
                <span className="flex-1 min-w-0 truncate" title={file.name}>
                    {file.name}
                </span>
                <span className="flex-none ml-4 text-gray-500">{sizeKB}</span>
            </div>
        );
    };

    return (
        <div className="uploaded-files">
            <h2 className={commonClassNames.h2}>{title}</h2>
            {loading ? (
                <div>{MESSAGE_LOADING}</div>
            ) : files.length === 0 ? (
                <div>No Files uploaded</div>
            ) : (
                <VirtualList<FileItem>
                    zebra
                    height={200}
                    items={files}
                    itemSize={30}
                    header={header}
                    renderItem={renderFile}
                />
            )}
        </div>
    );
};
