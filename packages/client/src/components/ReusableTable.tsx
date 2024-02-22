import { Link } from 'react-router-dom';
import '../styles/PropertiesList.css';
import { renderCellData } from '../constants/Constant';

// export interface TableColumn {
//     header: string;
//     accessor: string; // Property name in the tableData objects
//     isURL: boolean;
//     showColumn: boolean;
// }

// export interface ReusableTableProps {
//     columns: TableColumn[];
//     tableData: any[]; // Consider specifying a more specific type if possible
//     onRowClick?: (item: any) => void;
// }

export interface TableRow { [key: string]: any };

export interface TableDataItem<T> {
    objectData: {
        key: T;
    };
    rowData: TableRow;
}

export interface TableColumn {
    header: string;
    accessor: string; // Consider making this more specific or generic to match keys of tableData items
    isURL: boolean;
    isDollarAmount: boolean;
    showColumn: boolean;
    routeTo?: string;
    addSuffix?: string;
}

export interface ReusableTableProps<T> {
    columns: TableColumn[];
    tableData: TableDataItem<T>[]; // Array of objects with string keys and string values
    onRowClick?: (item: T) => void; // Now explicitly accepts an object with string keys and string values
}

const ReusableTable = <T,>({ columns, tableData, onRowClick }: ReusableTableProps<T>) => {
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
                        onClick={() => onRowClick ? onRowClick(item.objectData.key) : undefined}
                    >
                        {columns.filter(column => column.showColumn).map((column, colIndex) => {
                            const cellData = renderCellData(item.rowData[column.accessor],
                                column.isDollarAmount,
                                column.addSuffix);

                            let cellContent;
                            if (column.routeTo) {
                                cellContent = <span><Link to={`/${column.routeTo}/${cellData}`} state={{ data: tableData[rowIndex].objectData.key }}>
                                    {column.routeTo}
                                </Link></span>;
                            }
                            else if (column.isURL) {
                                cellContent = (
                                    <a href={cellData} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                        View
                                    </a>
                                );
                            } else {
                                cellContent = cellData;
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

