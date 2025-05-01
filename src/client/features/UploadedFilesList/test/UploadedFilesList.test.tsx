import { render, screen, waitFor } from '@testing-library/react';
import { describe, beforeEach, it, expect, vi } from 'vitest';

import { UploadedFilesList } from '../UploadedFilesList';

interface MockFile {
    name: string;
    size: number;
}

declare global {
    interface Window {
        fetch: typeof fetch;
    }
}

beforeEach(() => {
    vi.stubGlobal(
        'fetch',
        vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ files: [{ name: 'test.txt', size: 1024 }] as MockFile[] }),
            })
        ) as unknown as typeof fetch
    );
});

describe('UploadedFilesList', () => {
    it('renders uploaded files', async () => {
        render(<UploadedFilesList filesUrl="/api/files" />);
        await waitFor(() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            expect(screen.getByText(/test.txt/i)).toBeInTheDocument();
        });
    });
});
