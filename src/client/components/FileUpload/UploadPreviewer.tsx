import { VirtualList } from '../VirtualList/VirtualList';

interface UploadPreviewerProps {
    files: File[];
}

const UploadPreviewer: React.FC<UploadPreviewerProps> = ({ files }) => {
    const ITEM_SIZE = 32;
    const MAX_HEIGHT = 160;

    // dynamically set height so it never scrolls
    // @todo: implement auto height utility component
    const height = Math.min(files.length * ITEM_SIZE, MAX_HEIGHT);

    return (
        <VirtualList<File>
            zebra={false}
            items={files}
            height={height}
            itemSize={ITEM_SIZE}
            renderItem={(file) => {
                const sizeKB = `${(file.size / 1024).toFixed(1)} KB`;
                return (
                    <div
                        className="flex items-center px-2 py-1 text-sm hover:bg-gray-100 transition-colors"
                        title={file.name}
                    >
                        <span className="flex-1 min-w-0 truncate">{file.name}</span>
                        <span className="ml-2 text-gray-500">{sizeKB}</span>
                    </div>
                );
            }}
        />
    );
};

export default UploadPreviewer;
