import React, { ReactNode, useState } from 'react';
import './Tooltip.css';

interface TooltipProps {
    children: ReactNode;
    content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
    const [show, setShow] = useState(false);

    return (
        <div
            className="tooltip"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {children}
            {show && (
                <div className="tooltip-content">
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
