import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PropertiesList.css';
import '../styles/Tooltip.css';
import { ensureAbsoluteUrl, renderCellData } from '../constants/Constant';
import Tooltip from '../components/Tooltip';
import ExportCSVButton from './ExportCSVButton';  // Import the new component

enum SortDirection {
    ASCENDING = 'ascending',
    DESCENDING = 'descending',
};

export interface TableRow { [key: string]: any };

export interface TableDataItem<T> {
    objectData: {
        key: T;
    };
    rowData: TableRow;
};

export interface TableColumn {
    header: string;
    accessor: string;
    isURL: boolean;
    isDollarAmount: boolean;
    showColumn: boolean;
    isSortable: boolean;
    routeTo?: string;
    addSuffix?: string;
    detailedDescription?: string;
};

export interface ReusableTableProps<T> {
    columns: TableColumn[];
    tableData: TableDataItem<T>[];
    onRowClick?: (item: T) => void;
    includeTableSeparator?: boolean;
    canExportIntoCSV?: boolean;
};

const ReusableTable = <T,>({
    columns,
    tableData,
    onRowClick,
    includeTableSeparator,
    canExportIntoCSV
}: ReusableTableProps<T>) => {

    const [sortConfig, setSortConfig] = useState<{ key: string; direction: SortDirection } | null>(null);

    const sortedData = [...tableData];

    if (sortConfig !== null) {
        sortedData.sort((a, b) => {
            if (a.rowData[sortConfig.key] < b.rowData[sortConfig.key]) {
                return sortConfig.direction === SortDirection.ASCENDING ? -1 : 1;
            }
            else if (a.rowData[sortConfig.key] > b.rowData[sortConfig.key]) {
                return sortConfig.direction === SortDirection.ASCENDING ? 1 : -1;
            }
            return 0;
        });
    }

    const requestSort = (column: TableColumn) => {
        if (!column.isSortable) {
            return;
        }
        const key = column.accessor;
        let direction = SortDirection.ASCENDING;
        if (sortConfig && sortConfig.key === key && sortConfig.direction === SortDirection.ASCENDING) {
            direction = SortDirection.DESCENDING;
        }
        setSortConfig({ key, direction });
    };

    const visibleColumnsCount = columns.filter(column => column.showColumn).length;

    return (
        <div>
            {canExportIntoCSV && (
                <ExportCSVButton columns={columns} tableData={tableData} />  // Use the new component
            )}
            <table className="properties-table">
                <thead>
                    <tr>
                        {columns.filter(column => column.showColumn).map((column) => (
                            <th key={column.accessor} onClick={() => requestSort(column)}>
                                <Tooltip content={column.detailedDescription || column.header}>
                                    {column.header}
                                </Tooltip>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            <tr
                                style={{ cursor: 'pointer' }}
                                onClick={() => onRowClick ? onRowClick(item.objectData.key) : undefined}
                            >
                                {columns.filter(column => column.showColumn).map((column, colIndex) => {
                                    const cellData = renderCellData(item.rowData[column.accessor], column.isDollarAmount, column.addSuffix);

                                    let cellContent;
                                    if (column.isURL) {
                                        const formattedUrl = ensureAbsoluteUrl(cellData); // Ensure the URL is absolute
                                        console.log("Formatted URL:", formattedUrl);
                                        cellContent = (
                                            <a href={formattedUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                                View
                                            </a>
                                        );
                                    } else {
                                        cellContent = cellData;
                                    }

                                    if (column.routeTo) {
                                        cellContent = (
                                            <span>
                                                <Link to={`/${column.routeTo}/${cellData}`} state={{ data: item.objectData.key }}>
                                                    {cellData}
                                                </Link>
                                            </span>
                                        );
                                    }

                                    return <td key={`cell_${colIndex}_${rowIndex}`}>{cellContent}</td>;
                                })}
                            </tr>
                            {includeTableSeparator && ((rowIndex + 1) % 12 === 0) && (
                                <tr key={`separator_${rowIndex}`}>
                                    <td colSpan={visibleColumnsCount} style={{ textAlign: 'center' }}>
                                        <b>End of Year {(rowIndex + 1) / 12}</b>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReusableTable;
