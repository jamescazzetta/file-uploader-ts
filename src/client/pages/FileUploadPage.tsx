import { type ReactElement } from 'react';

import { FileUpload } from '../features/FileUpload/FileUpload';
import { UploadedFilesList } from '../features/UploadedFilesList/UploadedFilesList';
import { Page } from '../shared/components/Page';

// @todo: use nicer panel and use spacing more thoughtfully
export const FileUploadPage = (): ReactElement => {
    return (
        <div className="relative isolate h-dvh">
            <Page title="Frontify Task - Senior Frontend Engineer">
                <FileUpload
                    multiple
                    uploadUrl="/api/upload-single"
                    onUploadComplete={() => {
                        // @todo: show nice notification about what has been addded
                        window.location.reload();
                    }}
                />
                <UploadedFilesList filesUrl="/api/files" />
            </Page>
        </div>
    );
};
