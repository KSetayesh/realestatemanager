import React from 'react';
import { ListingWithScenariosDTO } from "@realestatemanager/shared";
import '../styles/PropertyDetailsModal.css';
import { TableColumn, TableRow } from "../components/ReusableTable";

const PropertyDetailsModal: React.FC<{
    property: ListingWithScenariosDTO | null;
    rowData: TableRow;
    onClose: () => void;
    columns: TableColumn[];
}> = ({ property, rowData, onClose, columns }) => {
    if (!property) return null;

    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={stopPropagation}>
                <h2>Property Details</h2>
                {columns.map((column, colIndex) => {
                    const cellData = rowData[column.accessor as keyof ListingWithScenariosDTO];
                    // const displayData = renderCellData(cellData);
                    return (
                        <p key={colIndex}>
                            <span className="modal-label">{column.header}:</span>
                            {column.isURL && typeof cellData === 'string' ? (
                                <a href={cellData} target="_blank" rel="noopener noreferrer">View</a>
                            ) : (
                                <span> {cellData}</span>
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
