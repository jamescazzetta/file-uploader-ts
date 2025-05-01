import React, { type ReactNode } from 'react';

import commonClassNames from '../lib/commonClassNames';

export interface SectionHeaderProps {
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
 * A header component with a title on the left and action
 * elements on the right.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, children }) => (
    <div className="flex items-center justify-between mb-4">
        <h2 className={commonClassNames.h2}>{title}</h2>
        {children && <div className="flex-shrink-0 ml-4">{children}</div>}
    </div>
);
