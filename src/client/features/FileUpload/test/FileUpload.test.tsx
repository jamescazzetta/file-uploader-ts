import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';

import { FileUpload } from '../FileUpload';

// @todo: fix `toBeInTheDocument` linting issues..

const mockUploadUrl = '/api/upload-single';

describe('FileUpload', () => {
    beforeEach(() => {
        vi.stubGlobal(
            'fetch',
            vi.fn(() => Promise.resolve({ ok: true }) as unknown as ReturnType<typeof fetch>)
        );
    });

    it('renders with default title', () => {
        render(<FileUpload uploadUrl={mockUploadUrl} />);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        expect(screen.getByText(/file uploader/i)).toBeInTheDocument();
    });

    it('allows selecting and uploading a file', async () => {
        const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
        const onUploadComplete = vi.fn();

        render(<FileUpload uploadUrl={mockUploadUrl} onUploadComplete={onUploadComplete} />);

        const input = screen.getByLabelText(/choose files/i);
        await waitFor(() => fireEvent.change(input, { target: { files: [file] } }));

        const uploadButton = screen.getByRole('button', { name: /upload/i });
        fireEvent.click(uploadButton);

        await waitFor(() => {
            expect(onUploadComplete).toHaveBeenCalledWith([file]);
        });
    });

    it('shows error message if upload fails', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(() => Promise.resolve({ ok: false }) as unknown as ReturnType<typeof fetch>)
        );

        const file = new File(['fail'], 'fail.txt', { type: 'text/plain' });

        render(<FileUpload uploadUrl={mockUploadUrl} />);

        const input = screen.getByLabelText(/choose files/i);
        await waitFor(() => fireEvent.change(input, { target: { files: [file] } }));

        const uploadButton = screen.getByRole('button', { name: /upload/i });
        fireEvent.click(uploadButton);

        await waitFor(() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            expect(screen.getByRole('alert')).toBeInTheDocument();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            expect(screen.getByText(/Upload failed for fail\.txt/)).toBeInTheDocument();
        });
    });
});
