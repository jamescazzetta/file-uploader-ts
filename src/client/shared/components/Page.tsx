import { type ReactNode } from 'react';

import classList from '../lib/classList';
import commonClassNames from '../lib/commonClassNames';

export interface Page {
    /**
     * The text to display as the section title
     */
    title: string;
    /**
     * Elements to render in the actions slot
     */
    children?: ReactNode;
}

/**
 * A basic Page layout with a title and content
 */
export const Page: React.FC<Page> = ({ title, children }) => {
    return (
        <div className={classList('mx-auto max-w-7xl text-center', commonClassNames.fullHeight)}>
            <h1 className={commonClassNames.h1}>{title}</h1>
            <div className='border border-anthracite rounded-2xl bg-white'>
                {children}
            </div>
        </div>
    );
};
