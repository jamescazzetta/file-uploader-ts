import { type ReactElement } from 'react';

import { FileUpload } from './components/FileUpload/FileUpload';
import { UploadedFilesList } from './components/UploadedFilesList/UploadedFilesList';
import commonClassNames from './lib/commonClassNames';

// @todo: use nicer panel and use spacing more thoughtfully
export const App = (): ReactElement => {
    return (
        <div className="relative isolate h-dvh">
            <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
                <h1 className={commonClassNames.h1}>Frontify Task - Senior Frontend Engineer</h1>
                <FileUpload multiple uploadUrl="/api/upload-single" onUploadComplete={() => window.location.reload()} />
                <UploadedFilesList filesUrl="/api/files" />
            </div>
        </div>
    );
};
