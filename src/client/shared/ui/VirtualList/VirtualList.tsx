import React from 'react';
import { FixedSizeList, type ListChildComponentProps } from 'react-window';

export interface VirtualListProps<T> {
    /** the data array to render */
    items: T[];
    /** height of the list (in px) */
    height: number;
    /** width of the list (in px or % - defaults to 100%) */
    width?: number | string;
    /** height of each row */
    itemSize: number;
    /** optional header */
    header?: React.ReactNode;
    /** row render function */
    renderItem: (item: T, index: number, style: React.CSSProperties) => React.ReactNode;
    /** whether to zebra-stripe the rows */
    zebra?: boolean;
}

export function VirtualList<T>({
    items,
    height,
    header,
    itemSize,
    renderItem,
    zebra = true,
    width = '100%',
}: VirtualListProps<T>) {
    const Row: React.FC<ListChildComponentProps<T[]>> = ({ index, style, data }) => {
        const bgClass = zebra ? (index % 2 === 0 ? 'bg-white' : 'bg-gray-50') : '';
        return (
            <div style={style} className={bgClass}>
                {renderItem(data[index], index, style)}
            </div>
        );
    };

    return (
        <>
            {header}
            <FixedSizeList<T[]>
                height={height}
                width={width}
                itemCount={items.length}
                itemSize={itemSize}
                itemData={items}
            >
                {Row}
            </FixedSizeList>
        </>
    );
}
