import { useState } from 'react';

import { uploadFile } from '../../../shared/api/files';

export function useFileUpload(uploadUrl: string) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const upload = async (files: File[]) => {
        setUploading(true);
        setError(null);
        try {
            await Promise.all(files.map((file) => uploadFile(uploadUrl, file)));
        } catch (error) {
            setError((error as Error).message);
            throw error;
        } finally {
            setUploading(false);
        }
    };

    const clearError = () => setError(null);

    return { upload, uploading, error, clearError };
}
