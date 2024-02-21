import React from 'react';
import { ListingWithScenariosDTO } from "@realestatemanager/shared";
import '../styles/PropertyDetailsModal.css';
import { TableColumn } from "../components/ReusableTable";

const PropertyDetailsModal: React.FC<{
    property: ListingWithScenariosDTO | null;
    onClose: () => void;
    columns: TableColumn[];
}> = ({ property, onClose, columns }) => {
    if (!property) return null;

    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    const booleanToYesNo = (value: boolean | undefined) => value ? 'Yes' : 'No';

    // Function to render the cell data based on its type
    const renderCellData = (cellData: any) => {
        if (typeof cellData === 'boolean') {
            return booleanToYesNo(cellData);
        } else if (typeof cellData === 'string' || typeof cellData === 'number') {
            return cellData;
        } else if (Array.isArray(cellData)) {
            return cellData.join(', '); // Example: array to comma-separated string
        } else if (typeof cellData === 'object' && cellData !== null) {
            return JSON.stringify(cellData); // Or extract specific properties to render
        }
        return ''; // Fallback for undefined or null
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={stopPropagation}>
                <h2>Property Details</h2>
                {columns.map((column, colIndex) => {
                    const cellData = property[column.accessor as keyof ListingWithScenariosDTO];
                    const displayData = renderCellData(cellData);
                    return (
                        <p key={colIndex}>
                            <span className="modal-label">{column.header}:</span>
                            {column.isURL && typeof displayData === 'string' ? (
                                <a href={displayData} target="_blank" rel="noopener noreferrer">View</a>
                            ) : (
                                <span> {displayData}</span>
                            )}
                        </p>
                    );
                })}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PropertyDetailsModal;
