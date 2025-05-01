export async function uploadFile(uploadUrl: string, file: File): Promise<void> {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(uploadUrl, { method: 'POST', body: form });
    if (!res.ok) {
        throw new Error(`Upload failed for ${file.name}`);
    }
}
