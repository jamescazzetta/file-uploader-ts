export interface Truncate {
    content: string;
}

/**
 * Truncate the content and add a title
 *
 * @todo: this is basic and could be done in a nicer way..
 */
export const Truncate: React.FC<Truncate> = ({ content }) => {
    return (
        <span className="flex-1 min-w-0 truncate" title={content}>
            {content}
        </span>
    );
};
