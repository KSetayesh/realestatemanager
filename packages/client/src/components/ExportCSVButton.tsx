import { renderCellData } from "../constants/Constant";
import { TableColumn, TableDataItem, TableRow } from "./ReusableTable";
import Papa from 'papaparse';

export interface ExportDataProps<T> {
    columns: TableColumn[];
    tableData: TableDataItem<T>[];
};


const ExportCSVButton = <T,>({
    columns,
    tableData,
}: ExportDataProps<T>) => {

    const preprocessDataForCSV = (data: TableDataItem<T>[], columns: TableColumn[]) => {
        const visibleColumns = columns.filter(column => column.showColumn);
        return data.map(item => {
            const processedRow: TableRow = {};
            visibleColumns.forEach(column => {
                processedRow[column.header] = renderCellData(item.rowData[column.accessor], column.isDollarAmount, column.addSuffix);
            });
            return processedRow;
        });
    };

    const exportToCSV = (data: TableDataItem<T>[], columns: TableColumn[], filename: string) => {
        const visibleColumns = columns.filter(column => column.showColumn);
        const preprocessedData = preprocessDataForCSV(data, visibleColumns);
        const headers = visibleColumns.map(column => column.header);
        const csv = Papa.unparse({
            fields: headers,
            data: preprocessedData
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={() => exportToCSV(tableData, columns, 'table-data.csv')}
            style={{ marginBottom: '20px' }}  // Add margin bottom
        >
            Export CSV
        </button>
    );
};

export default ExportCSVButton;