import React from 'react';
import '../styles/PropertiesList.css';

export interface TableColumn {
    header: string;
    accessor: string; // Property name in the tableData objects
    isURL: boolean;
    showColumn: boolean;
}

export interface ReusableTableProps {
    columns: TableColumn[];
    tableData: any[]; // Consider specifying a more specific type if possible
    onRowClick?: (item: any) => void;
}

const ReusableTable: React.FC<ReusableTableProps> = ({ columns, tableData, onRowClick }) => {

    return (
        <table className="properties-table">
            <thead>
                <tr>
                    {columns.filter(column => column.showColumn).map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData.map((item, rowIndex) => (
                    <tr
                        key={rowIndex}
                        style={{ cursor: 'pointer' }}
                        onClick={() => onRowClick && onRowClick(item)}
                    >
                        {columns.filter(column => column.showColumn).map((column, colIndex) => {
                            const cellData = item[column.accessor];
                            return (
                                <td key={colIndex}>
                                    {column.isURL ? (
                                        <a href={cellData} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                            View
                                        </a>
                                    ) : (
                                        cellData
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReusableTable;
