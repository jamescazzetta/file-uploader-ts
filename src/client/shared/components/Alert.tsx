export interface Alert {
    content: string;
}

export const Alert: React.FC<Alert> = ({ content }) => {
    return (
        <div role="alert" className="text-red-600">
            {content}
        </div>
    );
};
