// import React, { useState, useEffect } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Tooltip,
//     Button,
//     Box,
//     Typography,
//     IconButton,
//     styled,
//     TextField,
//     TablePagination
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';
// import { Link } from 'react-router-dom';
// import {
//     InputType,
//     ensureAbsoluteUrl,
//     renderCellData
// } from '../constants/Constant';
// import ExportCSVButton from './ExportCSVButton';
// import ConfirmationDialog from './ConfirmationDialog';
// import {
//     AbstractTable1,
//     ColumnDetail,
//     PrimitiveType,
//     SortConfig,
//     TableColumnDetailsEnum,
//     TableDataItem,
//     TableType
// } from '@realestatemanager/types';

// const TEMP_FEATURE_FLAG = true;

// const StyledTableContainer = styled(TableContainer)(() => ({
//     overflowX: 'auto',
// }));

// const StyledTable = styled(Table)(() => ({
//     minWidth: 1000,
//     borderCollapse: 'separate',
//     borderSpacing: '0 10px',
// }));

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     backgroundColor: '#04AA6D',
//     color: 'white',
//     borderRight: '1px solid #ddd',
//     borderBottom: '1px solid #ddd',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease',
//     '&:hover': {
//         backgroundColor: '#037f58',
//     },
//     boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//     fontWeight: 'bold',
//     padding: theme.spacing(1),
//     textAlign: 'center',
// }));

// const StyledTableBodyCell = styled(TableCell)(({ theme }) => ({
//     borderRight: '1px solid #ddd',
//     borderBottom: '1px solid #ddd',
//     padding: theme.spacing(1),
//     textAlign: 'center',
// }));

// const StyledPaper = styled(Paper)(({ theme }) => ({
//     padding: theme.spacing(2),
//     boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Increased shadow
//     borderRadius: '5px', // Curved edges
// }));

// // export interface TableRow { [key: string]: any };

// // export interface TableDataItem<Y> {
// //     objectData: {
// //         key: Y;
// //     };
// //     rowData: TableRow;
// // };

// // export interface TableColumn {
// //     header: string;
// //     accessor: string;
// //     isURL: boolean;
// //     isDollarAmount: boolean;
// //     showColumn: boolean;
// //     inputType: InputType;
// //     isSortable: boolean;
// //     routeTo?: string;
// //     addSuffix?: string;
// //     detailedDescription?: string;
// //     isEditable?: boolean;
// // };

// export type TableSeparatorDetails = {
//     separatorText: (rowCounter: number) => string; // Text to be displayed at the separator
//     rowsInterval: number;  // Number of rows between each separator
// };

// export type ExportIntoCSV = {
//     buttonTitle: string;
// };

// export enum SortDirection {
//     ASCENDING = 'ascending',
//     DESCENDING = 'descending',
// };

// // export type SortConfig = {
// //     key: TableColumnDetailsEnum;
// //     direction: SortDirection
// // };

// export type TableActions<Y> = {
//     handleEditUpdate?: (tableDataItem: TableDataItem<Y>) => Promise<Y>;
//     handleDeleteUpdate?: (tableDataItem: TableDataItem<Y>) => Promise<boolean>;
//     onPaginationChange?: (
//         event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
//         page: number,
//         rowsPerPage: number,
//         sortConfig?: SortConfig,
//     ) => Promise<void>;
// };

// /* ----For PropertiesListTable---- 
//     Y = ListingWithScenariosResponseDTO
//     X = PropertiesListTableType

//    ----For InvestmentBreakdownTable---- 
//     Y = MonthlyInvestmentDetailsResponseDTO
//     X = InvestmentBreakdownTableType
// */
// export interface ReusableTableProps<K extends TableType, Y, X> {
//     data: Y[];
//     tableHandler: AbstractTable1<K, Y, X>;
//     onRowClick?: (item: Y) => void;
//     tableSeperatorDetails?: TableSeparatorDetails;
//     exportIntoCSV?: ExportIntoCSV;
//     tableActions?: TableActions<Y>;
//     rowLimit?: number;
// };

// const NewReusableTable = <K extends TableType, Y, X>({
//     data,
//     tableHandler,
//     onRowClick,
//     tableSeperatorDetails,
//     exportIntoCSV,
//     tableActions,
//     rowLimit
// }: ReusableTableProps<K, Y, X>) => {

//     const getTableColumns = (): TableColumnDetailsEnum[] => {
//         // const tablesConfig: TablesConfig<Y> = tableHandler.getTablesConfig();
//         // return tablesConfig[tableType].columns;
//         return tableHandler.getAllSubTableColumns(tableType);
//     };

//     const getFormattedTableData = (): TableDataItem<Y>[] => {
//         return tableHandler.getTableData(data, tableType);
//     };

//     const [tableType, setTableType] = useState<X>(tableHandler.getDefaultTableType());
//     const [sortConfig, setSortConfig] = useState<SortConfig>();
//     const [editMode, setEditMode] = useState<number | null>(null);
//     const [isEditing, setIsEditing] = useState<boolean>(false);
//     const [tableData, setTableData] = useState<TableDataItem<Y>[]>(getFormattedTableData());
//     const [currentEdit, setCurrentEdit] = useState<TableDataItem<Y> | null>(null);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(50);
//     const [openDialog, setOpenDialog] = useState<boolean>(false);
//     const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

//     useEffect(() => {
//         setTableData(getFormattedTableData());
//     }, [data, tableType]);


//     const deepCopy = (obj: TableDataItem<Y>): TableDataItem<Y> => {
//         return JSON.parse(JSON.stringify(obj));
//     };

//     const sortData = (data: TableDataItem<Y>[]): TableDataItem<Y>[] => {
//         return tableHandler.sort(data, tableType, sortConfig);
//     };

//     const getColumnConfig = (columnKey: TableColumnDetailsEnum): ColumnDetail => {
//         return tableHandler.getColumnDetails(tableType, columnKey);
//     }

//     const requestSort = (columnKey: TableColumnDetailsEnum) => {
//         const columnConfig: ColumnDetail = getColumnConfig(columnKey);
//         if (!columnConfig.isSortable || isEditing) {
//             return;
//         }
//         const key = columnConfig.accessor;
//         let direction = SortDirection.ASCENDING;
//         if (sortConfig && sortConfig.columnKey === key && sortConfig.direction === SortDirection.ASCENDING) {
//             direction = SortDirection.DESCENDING;
//         }
//         setSortConfig({ columnKey, direction });
//     };

//     const getExpectedNumberOfRows = (): number => {
//         return rowLimit ? rowLimit : tableData.length;
//     };

//     const areTableRowsEditable = (): boolean => {
//         if (tableActions) {
//             return tableActions.handleEditUpdate ? true : false;
//         }
//         return false;
//     };

//     const areTableRowsDeletable = (): boolean => {
//         if (tableActions) {
//             return tableActions.handleDeleteUpdate ? true : false;
//         }
//         return false;
//     };

//     const handleDeleteClick = async (index: number) => {
//         if (editMode === null) {
//             if (areTableRowsDeletable()) {
//                 setOpenDialog(true);
//                 setDeleteIndex(index);
//             }
//         }
//     };

//     const confirmDelete = async () => {
//         if (deleteIndex !== null) {
//             const row = tableData[deleteIndex];
//             if (areTableRowsDeletable()) {
//                 try {
//                     const wasDeleted = await tableActions!.handleDeleteUpdate!(row);
//                     console.log('Was deleted: ', wasDeleted);
//                     if (wasDeleted) {
//                         setTableData(prevData => prevData.filter((_, i) => i !== deleteIndex));
//                     }
//                 } catch (error) {
//                     console.error('Error deleting row:', error);
//                 } finally {
//                     setOpenDialog(false);
//                     setDeleteIndex(null);
//                 }
//             }
//         }
//     };

//     const handleEditClick = (index: number) => {
//         setEditMode(index);
//         setIsEditing(true);
//         setCurrentEdit(deepCopy(tableData[index])); // Backup the current state before editing
//     };

//     const handleCancelClick = () => {
//         if (editMode !== null && currentEdit) {
//             const newData = [...tableData];
//             newData[editMode] = currentEdit;
//             setTableData(newData);
//         }
//         setEditMode(null);
//         setIsEditing(false);
//         setCurrentEdit(null);
//     };

//     const handleSaveClick = async () => {
//         if (editMode !== null) {
//             const editedRow = tableData[editMode];
//             if (areTableRowsEditable()) {
//                 try {
//                     const updatedRow: Y = await tableActions!.handleEditUpdate!(editedRow);

//                     const updatedEditableData = [...tableData];
//                     const rowDataItem: TableDataItem<Y> = tableHandler.getTableRow(updatedRow, tableType); //getRowData(updatedRow, tableType);
//                     updatedEditableData[editMode] = rowDataItem;

//                     setTableData(updatedEditableData);
//                 } catch (error) {
//                     console.error('Error updating row:', error);
//                 }
//             }
//         }

//         setEditMode(null);
//         setIsEditing(false);
//         setCurrentEdit(null);
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, column: TableColumn) => {
//         const accessor = column.accessor;
//         const newData = [...tableData];
//         const value = e.target.value;
//         if (InputType.NUMBER === column.inputType) {
//             newData[rowIndex].rowData[accessor] = Number(value);
//         }
//         else {
//             newData[rowIndex].rowData[accessor] = value;
//         }
//         setTableData(newData);
//     };

//     const needToFetchData = (page: number, rowsPerPage: number): boolean => {
//         if (TEMP_FEATURE_FLAG) {
//             return false;
//         }
//         const numberOfRowsAvailable = tableData.length;
//         console.log('numberOfRowsAvailable:', numberOfRowsAvailable);
//         console.log('((page * rowsPerPage) + rowsPerPage:', ((page * rowsPerPage) + rowsPerPage));
//         console.log('Need to fetch data:', (numberOfRowsAvailable < ((page * rowsPerPage) + rowsPerPage)));

//         return numberOfRowsAvailable < ((page * rowsPerPage) + rowsPerPage);
//     };

//     const handleChangePage = async (
//         event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
//         newPage: number
//     ) => {
//         setPage(newPage);

//         if (tableActions && tableActions.onPaginationChange && needToFetchData(newPage, rowsPerPage)) {
//             await tableActions.onPaginationChange(event, newPage, rowsPerPage);
//         }
//     };

//     const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newRowsPerPage = parseInt(event.target.value, 10);
//         setRowsPerPage(newRowsPerPage);
//         setPage(0);

//         if (tableActions && tableActions.onPaginationChange && needToFetchData(0, newRowsPerPage)) {
//             await tableActions.onPaginationChange(event, page, newRowsPerPage);
//         }
//     };

//     const displayEditActionButton = (rowIndex: number) => {
//         if (editMode === rowIndex) {
//             return (
//                 <>
//                     <IconButton onClick={(e) => { e.stopPropagation(); handleSaveClick(); }}>
//                         <CheckIcon />
//                     </IconButton>
//                     <IconButton onClick={(e) => { e.stopPropagation(); handleCancelClick(); }}>
//                         <CloseIcon />
//                     </IconButton>
//                 </>
//             );
//         }
//         return (
//             <>
//                 <IconButton onClick={(e) => { e.stopPropagation(); handleEditClick(rowIndex); }}>
//                     <EditIcon />
//                 </IconButton>
//             </>
//         );
//     };

//     const displayDeleteActionButton = (rowIndex: number) => {
//         if (editMode !== rowIndex) {
//             return (
//                 <>
//                     <IconButton onClick={(e) => { e.stopPropagation(); handleDeleteClick(rowIndex); }}>
//                         <DeleteIcon />
//                     </IconButton>
//                 </>
//             )
//         }
//     };

//     const getVisibleColumnCount = (): number => {
//         const columns: TableColumnDetailsEnum[] = getTableColumns();
//         return columns.filter(column => getColumnConfig(column).showColumn).length;
//     };

//     const getExportCSVButton = () => {
//         return (
//             exportIntoCSV && <ExportCSVButton
//                 columns={getTableColumns()}
//                 tableData={tableData}
//                 disabled={isEditing}
//                 buttonTitle={exportIntoCSV.buttonTitle}
//             />
//         );
//     };

//     const getCellContent = (
//         originalIndex: number,
//         columnKey: TableColumnDetailsEnum,
//         item: TableDataItem<Y>,
//     ) => {
//         const columnConfig: ColumnDetail = getColumnConfig(columnKey);
//         const cellValue: PrimitiveType = tableHandler.getColumnValue(tableType, item, columnKey);
//         const cellData = renderCellData(item.rowData[columnConfig.accessor], columnConfig.isDollarAmount, columnConfig.addSuffix);

//         let cellContent;
//         if (editMode === originalIndex && columnConfig.isEditable) {
//             cellContent = getEditableCellContent(originalIndex, column);
//         } else if (columnConfig.isUrl) {
//             cellContent = getUrlCellContent(cellData);
//         } else {
//             cellContent = cellData;
//         }

//         if (columnConfig.routeTo) {
//             cellContent = getRouteToCellContent(cellData, column, item);
//         }

//         return cellContent;
//     };

//     const getRouteToCellContent = (cellData: string, column: TableColumn, item: TableDataItem<Y>) => {
//         return (
//             <span>
//                 <Link to={`/${column.routeTo}/${cellData}`} state={{ data: item.objectData.key }}>
//                     {cellData}
//                 </Link>
//             </span>
//         );
//     };

//     const getEditableCellContent = (originalIndex: number, column: TableColumn) => {
//         return (
//             <TextField
//                 type={column.inputType === InputType.NUMBER ? 'number' : 'text'}
//                 value={tableData[originalIndex].rowData[column.accessor]}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, originalIndex, column)}
//                 fullWidth
//                 size="small"
//                 variant="outlined"
//                 InputProps={{
//                     style: { fontSize: '0.9rem' }, // Adjust font size to match table data
//                 }}
//             />
//         );
//     };

//     const getUrlCellContent = (cellData: string) => {
//         const formattedUrl = ensureAbsoluteUrl(cellData);
//         return (
//             <a href={formattedUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
//                 View
//             </a>
//         );
//     };

//     const getTableSeparator = (originalIndex: number) => {
//         if (!tableSeperatorDetails) {
//             return;
//         }
//         const rowsInterval: number = tableSeperatorDetails.rowsInterval;
//         return ((originalIndex + 1) % rowsInterval === 0) && (
//             <TableRow key={`separator_${originalIndex}`}>
//                 <TableCell colSpan={getVisibleColumnCount() + 1} align="center">
//                     <Typography variant="subtitle1">
//                         <b>{tableSeperatorDetails.separatorText(originalIndex)}</b>
//                     </Typography>
//                 </TableCell>
//             </TableRow>
//         );
//     };

//     const getTableRow = (originalIndex: number, item: TableDataItem<Y>) => {
//         const tableColumnsToShow: TableColumnDetailsEnum[] = [];
//         const tableColumns: TableColumnDetailsEnum[] = getTableColumns();
//         for (const column of tableColumns) {
//             const columnConfig: ColumnDetail = getColumnConfig(column);
//             if (columnConfig.showColumn) {
//                 tableColumnsToShow.push(column);
//             }
//         }

//         return (
//             <TableRow
//                 key={originalIndex}
//                 hover
//                 style={{ cursor: isEditing ? 'default' : 'pointer' }}
//                 onClick={() => !isEditing && onRowClick ? onRowClick(item.objectData.key) : undefined}
//             >
//                 {(areTableRowsEditable() || areTableRowsDeletable()) && (
//                     <StyledTableBodyCell>
//                         {areTableRowsEditable() && displayEditActionButton(originalIndex)}
//                         {areTableRowsDeletable() && displayDeleteActionButton(originalIndex)}
//                     </StyledTableBodyCell>
//                 )}
//                 {tableColumnsToShow.map((column, colIndex) => {
//                     const cellContent = getCellContent(originalIndex, column, item);
//                     return <StyledTableBodyCell key={`cell_${colIndex}_${originalIndex}`}>{cellContent}</StyledTableBodyCell>;
//                 })}
//             </TableRow>
//         );
//     };

//     const getTableHead = () => {
//         const tableColumns = getTableColumns().map(column => {
//             const columnConfig: ColumnDetail = getColumnConfig(column);
//             return columnConfig.showColumn ? (
//                 <StyledTableCell key={columnConfig.accessor} onClick={() => requestSort(column)}>
//                     <Tooltip title={columnConfig.detailedDescription || columnConfig.title}>
//                         <Typography variant="subtitle2">{columnConfig.title}</Typography>
//                     </Tooltip>
//                 </StyledTableCell>
//             ) : null;
//         }).filter(column => column !== null);

//         return (
//             <TableHead>
//                 <TableRow>
//                     {(areTableRowsEditable() || areTableRowsDeletable()) && <StyledTableCell>Actions</StyledTableCell>}
//                     {tableColumns}
//                 </TableRow>
//             </TableHead>
//         );
//     };

//     const getTableBody = () => {
//         const sortedData = sortData(tableData);
//         const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//         return (
//             <TableBody>
//                 {paginatedData.map((item) => {
//                     const originalIndex = tableData.findIndex(data => data.objectData.key === item.objectData.key);
//                     return (
//                         <React.Fragment key={originalIndex}>
//                             {getTableRow(originalIndex, item)}
//                             {tableSeperatorDetails && getTableSeparator(originalIndex)}
//                         </React.Fragment>
//                     );
//                 })}
//             </TableBody>
//         );
//     };

//     const tableOptions: X[] = tableHandler.getTableOptions();

//     return (
//         <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
//             {setTableType && (tableOptions.length > 1) && (
//                 <Box mb={2}>
//                     <Typography variant="h6" gutterBottom>Select Table Type</Typography>
//                     <Box display="flex" flexDirection="row">
//                         {tableOptions.map((option) => (
//                             <Box key={option} mr={2}>
//                                 <Button
//                                     variant={tableType === option ? "contained" : "outlined"}
//                                     color="primary"
//                                     onClick={() => setTableType(option)}
//                                 >
//                                     {option}
//                                 </Button>
//                             </Box>
//                         ))}
//                     </Box>
//                 </Box>
//             )}
//             {exportIntoCSV && (
//                 <Box mb={2}>
//                     {getExportCSVButton()}
//                 </Box>
//             )}
//             <Box width="95%">
//                 <StyledPaper>
//                     <StyledTableContainer>
//                         <StyledTable>
//                             {getTableHead()}
//                             {getTableBody()}
//                         </StyledTable>
//                     </StyledTableContainer>
//                     <TablePagination
//                         // rowsPerPageOptions={[10, 25, 50, 100]}
//                         component="div"
//                         count={getExpectedNumberOfRows()}
//                         rowsPerPage={rowsPerPage}
//                         page={page}
//                         onPageChange={handleChangePage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                         showFirstButton={true}
//                         showLastButton={true}
//                     />
//                 </StyledPaper>
//             </Box>
//             <ConfirmationDialog
//                 open={openDialog}
//                 onClose={() => setOpenDialog(false)}
//                 onConfirm={confirmDelete}
//                 title="Confirm Delete"
//                 content="Are you sure you want to delete this row?"
//             />
//         </Box>
//     );
// };

// export default NewReusableTable;
