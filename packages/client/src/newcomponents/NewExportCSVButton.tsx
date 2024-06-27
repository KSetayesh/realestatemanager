import CustomButtonComponent from "../basicdatadisplaycomponents/ButtonComponent";
import Papa from 'papaparse';
import { TableColumn, TableDataItem } from "@realestatemanager/types";

export interface TableRow { [key: string]: any };

export interface ExportDataProps<Y> {
    columns: TableColumn[];
    tableData: TableDataItem<Y>[];
    disabled: boolean;
    buttonTitle: string;
};

const NewExportCSVButton = <Y,>({
    columns,
    tableData,
    disabled = false,
    buttonTitle,
}: ExportDataProps<Y>) => {

    const getCellContent = (
        column: TableColumn,
        item: TableDataItem<Y>,
    ): string => {
        return item.tableRow[column.columnKey]?.valueToBeDisplayed ?? '';
    };

    const preprocessDataForCSV = (data: TableDataItem<Y>[], columns: TableColumn[]) => {
        return data.map(item => {
            const processedRow: TableRow = {};
            columns.forEach(column => {
                processedRow[column.columnDetails.title] = getCellContent(column, item);
            });
            return processedRow;
        });
    };

    const exportToCSV = (data: TableDataItem<Y>[], columns: TableColumn[], filename: string) => {
        const preprocessedData = preprocessDataForCSV(data, columns);
        const headers = columns.map(column => column.columnDetails.title);
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
        <CustomButtonComponent
            disabled={disabled}
            onClick={() => !disabled && exportToCSV(tableData, columns, 'table-data.csv')}
            style={{ marginBottom: '20px' }}  // Add margin bottom
            buttonTitle={buttonTitle}
        />
    );
};

export default NewExportCSVButton;