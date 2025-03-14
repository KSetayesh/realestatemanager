import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tooltip,
    Button,
    Box,
    Typography,
    IconButton,
    styled,
    TextField,
    TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import {
    InputType,
    PrimitiveType,
    SortDirection,
    TableType
} from '@realestatemanager/types';
import ConfirmationDialog from './ConfirmationDialog';
import NewExportCSVButton from './ExportCSVButton';
import { AbstractTable, TableColumn, TableData } from '../newtabledata/tabledata/AbstractTable';

const TEMP_FEATURE_FLAG = true;

const StyledTableContainer = styled(TableContainer)(() => ({
    overflowX: 'auto',
}));

const StyledTable = styled(Table)(() => ({
    minWidth: 1000,
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#04AA6D',
    color: 'white',
    borderRight: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: '#037f58',
    },
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    fontWeight: 'bold',
    padding: theme.spacing(1),
    textAlign: 'center',
}));

const StyledTableBodyCell = styled(TableCell)(({ theme }) => ({
    borderRight: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
    padding: theme.spacing(1),
    textAlign: 'center',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Increased shadow
    borderRadius: '5px', // Curved edges
}));

export type TableSeparatorDetails = {
    separatorText: (rowCounter: number) => string; // Text to be displayed at the separator
    rowsInterval: number;  // Number of rows between each separator
};

export type ExportIntoCSV = {
    buttonTitle: string;
};

// export enum SortDirection {
//     ASCENDING = 'ascending',
//     DESCENDING = 'descending',
// };

export type SortConfig = { key: string; direction: SortDirection };

export type TableActions<Y> = {
    handleEditUpdate?: (tableDataItem: Y) => Promise<Y>;
    handleDeleteUpdate?: (tableDataItem: Y) => Promise<boolean>;
    onPaginationChange?: (
        event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        page: number,
        rowsPerPage: number,
        sortConfig?: SortConfig,
    ) => Promise<void>;
};

/* ----For PropertiesListTable---- 
    Y = ListingWithScenariosResponseDTO
    X = PropertiesListTableType

   ----For InvestmentBreakdownTable---- 
    Y = MonthlyInvestmentDetailsResponseDTO
    X = InvestmentBreakdownTableType
*/
export interface ReusableTableProps<K extends TableType, Y, X> {
    data: Y[];
    tableHandler: AbstractTable<K, Y, X>;
    onRowClick?: (item: Y) => void;
    tableSeperatorDetails?: TableSeparatorDetails;
    tableActions?: TableActions<Y>;
    rowLimit?: number;
};

const ReusableTable = <K extends TableType, Y, X>({
    data,
    tableHandler,
    onRowClick,
    tableSeperatorDetails,
    tableActions,
    rowLimit,
}: ReusableTableProps<K, Y, X>) => {

    const getTableData = (): TableData<Y, X> => {
        return tableHandler.getTableData(data, tableType);
    };

    const [tableType, setTableType] = useState<X>(tableHandler.getDefaultTableType());
    const [sortConfig, setSortConfig] = useState<SortConfig>();
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [tableData, setTableData] = useState<TableData<Y, X>>(getTableData());
    const [currentEdit, setCurrentEdit] = useState<Y | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    useEffect(() => {
        setTableData(getTableData());
    }, [data, tableType]);


    const deepCopy = (obj: Y): Y => {
        return JSON.parse(JSON.stringify(obj));
    };

    const requestSort = (column: TableColumn) => {
        if (!column.columnDetails.isSortable || isEditing) {
            return;
        }
        const key = column.columnKey;
        let direction = SortDirection.ASCENDING;
        if (sortConfig && sortConfig.key === key && sortConfig.direction === SortDirection.ASCENDING) {
            direction = SortDirection.DESCENDING;
        }
        setSortConfig({ key, direction });
    };

    const getExpectedNumberOfRows = (): number => {
        return rowLimit ? rowLimit : tableData.rows.length;
    };

    const areTableRowsEditable = (): boolean => {
        if (tableHandler.isEditable && tableActions) {
            return tableActions.handleEditUpdate ? true : false;
        }
        return false;
    };

    const areTableRowsDeletable = (): boolean => {
        if (tableHandler.canDeleteFromTable && tableActions) {
            return tableActions.handleDeleteUpdate ? true : false;
        }
        return false;
    };

    const handleDeleteClick = async (index: number) => {
        if (editIndex === null) {
            if (areTableRowsDeletable()) {
                setOpenDialog(true);
                setDeleteIndex(index);
            }
        }
    };

    const confirmDelete = async () => {
        if (deleteIndex !== null) {
            const row = tableData.rows[deleteIndex];
            if (areTableRowsDeletable()) {
                try {
                    const wasDeleted = await tableActions!.handleDeleteUpdate!(row);
                    console.log('Was deleted: ', wasDeleted);
                    if (wasDeleted) {
                        const removeTableRow = (deleteIndex: number) => {
                            const filteredRows = tableData.rows.filter((_, i) => i !== deleteIndex);
                            setTableData({
                                ...tableData,
                                rows: filteredRows
                            });
                        };
                        removeTableRow(deleteIndex);
                    }
                } catch (error) {
                    console.error('Error deleting row:', error);
                } finally {
                    setOpenDialog(false);
                    setDeleteIndex(null);
                }
            }
        }
    };

    const handleEditClick = (index: number) => {
        setEditIndex(index);
        setIsEditing(true);
        setCurrentEdit(deepCopy(tableData.rows[index])); // Backup the current state before editing
    };

    const handleCancelClick = () => {
        if (editIndex !== null && currentEdit) {
            const newData = [...tableData.rows];
            newData[editIndex] = currentEdit;
            setTableData({
                ...tableData,
                rows: newData
            });
        }
        setEditIndex(null);
        setIsEditing(false);
        setCurrentEdit(null);
    };

    const handleSaveClick = async () => {
        if (editIndex !== null) {
            const editedRow = tableData.rows[editIndex];
            if (areTableRowsEditable()) {
                try {
                    const updatedRow: Y = await tableActions!.handleEditUpdate!(editedRow);
                    const updatedRows: Y[] = [...tableData.rows];
                    updatedRows[editIndex] = updatedRow;

                    setTableData((prevData) => ({
                        ...prevData,
                        rows: updatedRows,
                    }));
                } catch (error) {
                    console.error('Error updating row:', error);
                }
            }
        }

        setEditIndex(null);
        setIsEditing(false);
        setCurrentEdit(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, column: TableColumn) => {
        // const key = column.columnKey;
        const newData = [...tableData.rows];
        const value = e.target.value;
        tableHandler.updateValue(newData[rowIndex], value, column);
        // if (InputType.NUMBER === column.columnDetails.inputType) {
        //     newData[rowIndex].tableRow[key]!.value = Number(value);
        // }
        // else {
        //     newData[rowIndex].tableRow[key]!.value = value;
        // }
        setTableData({
            ...tableData,
            rows: newData
        });
        // setTableData(newData);
    };

    const needToFetchData = (page: number, rowsPerPage: number): boolean => {
        if (TEMP_FEATURE_FLAG) {
            return false;
        }
        const numberOfRowsAvailable = tableData.rows.length;
        console.log('numberOfRowsAvailable:', numberOfRowsAvailable);
        console.log('((page * rowsPerPage) + rowsPerPage:', ((page * rowsPerPage) + rowsPerPage));
        console.log('Need to fetch data:', (numberOfRowsAvailable < ((page * rowsPerPage) + rowsPerPage)));

        return numberOfRowsAvailable < ((page * rowsPerPage) + rowsPerPage);
    };

    const handleChangePage = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        newPage: number
    ) => {
        setPage(newPage);

        if (tableActions && tableActions.onPaginationChange && needToFetchData(newPage, rowsPerPage)) {
            await tableActions.onPaginationChange(event, newPage, rowsPerPage);
        }
    };

    const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);

        if (tableActions && tableActions.onPaginationChange && needToFetchData(0, newRowsPerPage)) {
            await tableActions.onPaginationChange(event, page, newRowsPerPage);
        }
    };


    // const handleChangePage = (event: unknown, newPage: number) => {
    //     console.log(event);
    //     setPage(newPage);

    //     if (tableActions && tableActions.onPaginationChange && needToFetchData(page, rowsPerPage)) {
    //         tableActions.onPaginationChange(event, page, rowsPerPage);
    //     }
    // };

    // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    //     if (tableActions && tableActions.onPaginationChange && needToFetchData(0, rowsPerPage)) {
    //         tableActions.onPaginationChange(event, page, rowsPerPage);
    //     }
    // };

    const displayEditActionButton = (rowIndex: number) => {
        if (editIndex === rowIndex) {
            return (
                <>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleSaveClick(); }}>
                        <CheckIcon />
                    </IconButton>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleCancelClick(); }}>
                        <CloseIcon />
                    </IconButton>
                </>
            );
        }
        return (
            <>
                <IconButton onClick={(e) => { e.stopPropagation(); handleEditClick(rowIndex); }}>
                    <EditIcon />
                </IconButton>
            </>
        );
    };

    const displayDeleteActionButton = (rowIndex: number) => {
        if (editIndex !== rowIndex) {
            return (
                <>
                    <IconButton onClick={(e) => { e.stopPropagation(); handleDeleteClick(rowIndex); }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    };

    const getVisibleColumnCount = (): number => {
        return tableData.columns.length;
    };

    const getCellContent = (
        originalIndex: number,
        column: TableColumn,
        item: Y,
    ) => {
        // const cellData = renderCellData(item.rowData[column.accessor], column.isDollarAmount, column.addSuffix);
        const cellData: PrimitiveType = tableHandler.getColumnValueToBeDisplayed(item, column);

        let cellContent;
        if (editIndex === originalIndex && column.columnDetails.isEditable) {
            cellContent = getEditableCellContent(cellData, originalIndex, column);
        } else if (column.columnDetails.isUrl) {
            cellContent = getUrlCellContent(cellData);
        } else {
            cellContent = cellData;
        }

        if (column.columnDetails.routeTo) {
            cellContent = getRouteToCellContent(cellData, item);
        }

        return cellContent;
    };

    const getRouteToCellContent = (cellData: PrimitiveType, item: Y) => {
        return (
            <span>
                <Link to={cellData?.toString() ?? ''} state={{ data: item }}>
                    {cellData}
                </Link>
            </span>
        );
    };

    const getEditableCellContent = (cellData: PrimitiveType, originalIndex: number, column: TableColumn) => {
        return (
            <TextField
                type={column.columnDetails.inputType === InputType.NUMBER ? 'number' : 'text'}
                value={cellData}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, originalIndex, column)}
                fullWidth
                size="small"
                variant="outlined"
                InputProps={{
                    style: { fontSize: '0.9rem' }, // Adjust font size to match table data
                }}
            />
        );
    };

    const getUrlCellContent = (cellData: PrimitiveType) => {
        // const formattedUrl = ensureAbsoluteUrl(cellData);
        return (
            <a href={cellData?.toString() ?? ''} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                View
            </a>
        );
    };

    const getTableSeparator = (originalIndex: number) => {
        if (!tableSeperatorDetails) {
            return;
        }
        const rowsInterval: number = tableSeperatorDetails.rowsInterval;
        return ((originalIndex + 1) % rowsInterval === 0) && (
            <TableRow key={`separator_${originalIndex}`}>
                <TableCell colSpan={getVisibleColumnCount() + 1} align="center">
                    <Typography variant="subtitle1">
                        <b>{tableSeperatorDetails.separatorText(originalIndex)}</b>
                    </Typography>
                </TableCell>
            </TableRow>
        );
    };

    const getTableRow = (originalIndex: number, item: Y) => {
        return (
            <TableRow
                key={originalIndex}
                hover
                style={{ cursor: isEditing ? 'default' : 'pointer' }}
                onClick={() => !isEditing && onRowClick ? onRowClick(item) : undefined}
            >
                {(areTableRowsEditable() || areTableRowsDeletable()) && (
                    <StyledTableBodyCell>
                        {areTableRowsEditable() && displayEditActionButton(originalIndex)}
                        {areTableRowsDeletable() && displayDeleteActionButton(originalIndex)}
                    </StyledTableBodyCell>
                )}
                {tableData.columns.map((column, colIndex) => {
                    const cellContent = getCellContent(originalIndex, column, item);
                    return <StyledTableBodyCell key={`cell_${colIndex}_${originalIndex}`}>{cellContent}</StyledTableBodyCell>;
                })}
            </TableRow>
        );
    };

    const getTableHead = () => {
        return (
            <TableHead>
                <TableRow>
                    {(areTableRowsEditable() || areTableRowsDeletable()) && <StyledTableCell>Actions</StyledTableCell>}
                    {tableData.columns.map((column) => (
                        <StyledTableCell key={column.columnKey} onClick={() => requestSort(column)}>
                            <Tooltip title={column.columnDetails.detailedDescription || column.columnDetails.title}>
                                <Typography variant="subtitle2">{column.columnDetails.title}</Typography>
                            </Tooltip>
                        </StyledTableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    };

    const getTableBody = () => {
        const sortedData = tableHandler.sort(tableData).rows;
        const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

        return (
            <TableBody>
                {paginatedData.map((item) => {
                    const originalIndex = tableData.rows.findIndex(data => data === item);
                    return (
                        <React.Fragment key={originalIndex}>
                            {getTableRow(originalIndex, item)}
                            {tableSeperatorDetails && getTableSeparator(originalIndex)}
                        </React.Fragment>
                    );
                })}
            </TableBody>
        );
    };

    const getExportCSVButton = () => {
        if (tableHandler.exportToCSV.enabled) {
            return (<Box mb={2}>
                <NewExportCSVButton
                    tableHandler={tableHandler}
                    tableData={tableData}
                />
            </Box>);
        }
        return <></>;
    };

    const getTableOptions = () => {
        const tableOptions: X[] = tableHandler.getAllSubTableTypes();
        if (tableType && (tableOptions.length > 1)) {
            return (
                <Box mb={2}>
                    <Typography variant="h6" gutterBottom>Select Table Type</Typography>
                    <Box display="flex" flexDirection="row">
                        {tableOptions.map((option) => (
                            <Box key={String(option)} mr={2}>
                                <Button
                                    variant={tableType === option ? "contained" : "outlined"}
                                    color="primary"
                                    onClick={() => setTableType(option)}
                                >
                                    {String(option)}
                                </Button>
                            </Box>
                        ))}
                    </Box>
                </Box>
            );
        }
        return <></>;
    };

    const getTable = () => {
        return (<Box width="95%">
            <StyledPaper>
                <StyledTableContainer>
                    <StyledTable>
                        {getTableHead()}
                        {getTableBody()}
                    </StyledTable>
                </StyledTableContainer>
                <TablePagination
                    // rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={getExpectedNumberOfRows()}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    showFirstButton={true}
                    showLastButton={true}
                />
            </StyledPaper>
        </Box>);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            {getTableOptions()}
            {getExportCSVButton()}
            {getTable()}
            <ConfirmationDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onConfirm={confirmDelete}
                title="Confirm Delete"
                content="Are you sure you want to delete this row?"
            />
        </Box>
    );
};

export default ReusableTable;
