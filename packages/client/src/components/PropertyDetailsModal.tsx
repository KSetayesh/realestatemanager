import React from 'react';
import { ListingWithScenariosResponseDTO } from "@realestatemanager/shared";
import '../styles/PropertyDetailsModal.css';
import { TableColumn, TableRow } from "./ReusableTable";
import { Link } from 'react-router-dom';
import { ensureAbsoluteUrl, renderCellData } from '../constants/Constant';

export interface PropertyDetailsModalType<T> {
    data: T | null;
    rowData: TableRow;
    onClose: () => void;
    columns: TableColumn[];
};

const PropertyDetailsModal = <T,>({
    data,
    rowData,
    onClose,
    columns,
}: PropertyDetailsModalType<T>) => {

    if (!data) return null;

    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={stopPropagation}>
                <h2>Property Details</h2>
                {columns.map((column, colIndex) => {
                    const cellData = renderCellData(rowData[column.accessor as keyof ListingWithScenariosResponseDTO],
                        column.isDollarAmount,
                        column.addSuffix);

                    let content;
                    if (column.routeTo) {
                        content = <span><Link to={`/${column.routeTo}/${cellData}`} state={{ data: data }}>
                            {column.routeTo}
                        </Link></span>;
                    }
                    else if (column.isURL) {
                        const formattedUrl = ensureAbsoluteUrl(cellData);
                        content = <a href={formattedUrl} target="_blank" rel="noopener noreferrer">View</a>;
                    }
                    else {
                        content = <span> {cellData}</span>;
                    }
                    return (
                        <p key={colIndex}>
                            <span className="modal-label">{column.header}: </span>
                            {content}
                        </p>
                    );
                })}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );

};

export default PropertyDetailsModal;
