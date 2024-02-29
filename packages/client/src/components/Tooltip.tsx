import React, { ReactNode, useState } from 'react';
import '../styles/Tooltip.css';

interface TooltipProps {
    children: ReactNode;
    content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
    const [show, setShow] = useState(false);

    // Split content by a specific delimiter, e.g., "\n" for new lines
    const contentLines = content.split("\n").map((line, index) => (
        // Render each line, followed by a <br /> except for the last line
        <React.Fragment key={index}>
            {line}{index < content.length - 1 && <br />}
        </React.Fragment>
    ));

    return (
        <div
            className="tooltip"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {children}
            {show && (
                <div className="tooltip-content">
                    {contentLines}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
