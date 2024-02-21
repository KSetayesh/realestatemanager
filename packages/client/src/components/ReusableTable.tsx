import '../styles/PropertiesList.css';

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

export interface TableRow { [key: string]: string };

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
    showColumn: boolean;
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
                        onClick={() => onRowClick && onRowClick(item.objectData.key)}
                    >
                        {columns.filter(column => column.showColumn).map((column, colIndex) => {
                            // Access cell data from rowData using column.accessor
                            const cellData = item.rowData[column.accessor];
                            return (
                                <td key={colIndex}>
                                    {column.isURL && typeof cellData === 'string' ? (
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

