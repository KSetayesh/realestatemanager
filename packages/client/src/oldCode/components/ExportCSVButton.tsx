// import CustomButtonComponent from "../basicdatadisplaycomponents/ButtonComponent";
// import Papa from 'papaparse';
// import { TableType } from "@realestatemanager/types";
// import { AbstractTable, TableColumn, TableData } from "../newtabledata/tabledata/AbstractTable";

// export interface TableRow { [key: string]: any };

// export interface ExportDataProps<K extends TableType, Y, X> {
//     tableHandler: AbstractTable<K, Y, X>;
//     tableData: TableData<Y, X>,
// };

// Delete line below
const ExportCSVButton = ({

});

// const ExportCSVButton = <K extends TableType, Y, X>({
//     tableHandler,
//     tableData,
// }: ExportDataProps<K, Y, X>) => {

//     const getCellContent = (
//         tableColumn: TableColumn,
//         item: Y,
//     ): string => {
//         return tableHandler.getColumnValueToBeDisplayed(item, tableColumn).toString();
//     };

//     const preprocessDataForCSV = (data: Y[], columns: TableColumn[]) => {
//         return data.map(item => {
//             const processedRow: TableRow = {};
//             columns.forEach(column => {
//                 processedRow[column.columnDetails.title] = getCellContent(column, item);
//             });
//             return processedRow;
//         });
//     };

//     const exportToCSV = (filename: string) => {
//         const preprocessedData = preprocessDataForCSV(tableData.rows, tableData.columns);
//         const headers = tableData.columns.map(column => column.columnDetails.title);
//         const csv = Papa.unparse({
//             fields: headers,
//             data: preprocessedData
//         });
//         const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//         const link = document.createElement('a');
//         const url = URL.createObjectURL(blob);
//         link.setAttribute('href', url);
//         link.setAttribute('download', filename);
//         link.style.visibility = 'hidden';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     const isEnabled = (): boolean => {
//         return tableHandler.exportToCSV.enabled;
//     };

//     const buttonTitle = (): string => {
//         return tableHandler.exportToCSV.buttonName;
//     };

//     return (
//         <CustomButtonComponent
//             disabled={!isEnabled()}
//             onClick={() => !isEnabled() && exportToCSV('table-data.csv')}
//             style={{ marginBottom: '20px' }}  // Add margin bottom
//             buttonTitle={buttonTitle()}
//         />
//     );
// };

// export default ExportCSVButton;