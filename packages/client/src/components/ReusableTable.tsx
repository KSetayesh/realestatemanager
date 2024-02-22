import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PropertiesList.css';
import { renderCellData } from '../constants/Constant';

enum SortDirection {
    ASCENDING = 'ascending',
    DESCENDING = 'descending',
}

export interface TableRow { [key: string]: any };

export interface TableDataItem<T> {
    objectData: {
        key: T;
    };
    rowData: TableRow;
}

export interface TableColumn {
    header: string;
    accessor: string;
    isURL: boolean;
    isDollarAmount: boolean;
    showColumn: boolean;
    isSortable: boolean;
    routeTo?: string;
    addSuffix?: string;
}

export interface ReusableTableProps<T> {
    columns: TableColumn[];
    tableData: TableDataItem<T>[];
    onRowClick?: (item: T) => void;
}

const ReusableTable = <T,>({ columns, tableData, onRowClick }: ReusableTableProps<T>) => {
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

    return (
        <table className="properties-table">
            <thead>
                <tr>
                    {columns.filter(column => column.showColumn).map((column) => (
                        <th key={column.accessor} onClick={() => requestSort(column)}>
                            {column.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sortedData.map((item, rowIndex) => (
                    <tr
                        key={rowIndex}
                        style={{ cursor: 'pointer' }}
                        onClick={() => onRowClick ? onRowClick(item.objectData.key) : undefined}
                    >
                        {columns.filter(column => column.showColumn).map((column, colIndex) => {
                            const cellData = renderCellData(item.rowData[column.accessor], column.isDollarAmount, column.addSuffix);

                            let cellContent;
                            if (column.isURL) {
                                cellContent = (
                                    <a href={cellData} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                        View
                                    </a>
                                );
                            }
                            else {
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

                            return <td key={colIndex}>{cellContent}</td>;
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReusableTable;
