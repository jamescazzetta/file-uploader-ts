import { type ReactElement } from 'react';

import { Page } from '../shared/ui/Page/Page';
import { FileUpload } from '../widgets/FileUpload/FileUpload';
import { UploadedFilesList } from '../widgets/UploadedFilesList/UploadedFilesList';

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
