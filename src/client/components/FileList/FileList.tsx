import transformBytesToKB from '../../shared/lib/helpers';
import { Truncate } from '../../shared/ui/Truncate/Truncate';
import { VirtualList } from '../../shared/ui/VirtualList/VirtualList';

export interface FileItem {
    name: string;
    size: number;
}

export interface FilesListProps {
    files: File[];
    showHeader?: boolean;
}

const FilesList: React.FC<FilesListProps> = ({ files, showHeader = true }) => {
    const ITEM_SIZE = 30;

    const header = (
        <div className="flex items-center px-4 py-2 border-b font-semibold text-gray-700">
            <span className="flex-1 min-w-0 truncate">File name</span>
            <span className="flex-none ml-4">Size</span>
        </div>
    );

    const renderFile = (file: FileItem) => {
        const { name, size } = file;
        const sizeKB = `${transformBytesToKB(size)}`;

        return (
            <div className="flex items-center px-4 hover:bg-gray-100 transition-colors">
                <Truncate content={name} />
                <span className="flex-none ml-4 text-gray-500">{sizeKB}</span>
            </div>
        );
    };

    return (
        <VirtualList<File>
            zebra
            height={200}
            items={files}
            itemSize={ITEM_SIZE}
            renderItem={renderFile}
            {...(showHeader && { header })}
        />
    );
};

export default FilesList;
