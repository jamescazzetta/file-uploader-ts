export const transformBytesToKB = (bytes: number): string => `${(bytes / 1024).toFixed(2)} KB`;

export default transformBytesToKB;
