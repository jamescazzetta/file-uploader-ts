import React from 'react';

import { Alert } from '../../shared/components/Alert';
import { useEndpoint } from '../../shared/hooks/useEndpoint';
import commonClassNames from '../../shared/lib/commonClassNames';
import FilesList from '../../widgets/FileList/FileList';

const MESSAGE_LOADING = 'Loading Files...';
const DEFAULT_TITLE = 'Uploaded Files';

interface UploadedFilesListProps {
    /** The URL to fetch files from */
    filesUrl: string;
    /** The title of the component */
    title?: string;
}

interface FilesApiResponse {
    files: File[];
}

export const UploadedFilesList: React.FC<UploadedFilesListProps> = ({ filesUrl, title = DEFAULT_TITLE }) => {
    const { data, loading, error } = useEndpoint<FilesApiResponse>({ url: filesUrl });
    const files = data?.files || [];

    if (loading) {
        return <div>{MESSAGE_LOADING}</div>;
    }
    if (error) {
        return <Alert content={error.message} />;
    }
    if (data?.files.length === 0) {
        return <div>No files uploaded</div>;
    }

    return (
        <div className="p-2 overflow-auto flex-1">
            <h2 className={commonClassNames.h2}>{title}</h2>
            <FilesList files={files} />
        </div>
    );
};
