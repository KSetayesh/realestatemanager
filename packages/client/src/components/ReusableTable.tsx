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
    ensureAbsoluteUrl,
    renderCellData
} from '../constants/Constant';
import ExportCSVButton from './ExportCSVButton';
import { AbstractTable, TablesConfig } from '../tables/AbstractTable';
import ConfirmationDialog from './ConfirmationDialog';

enum SortDirection {
    ASCENDING = 'ascending',
    DESCENDING = 'descending',
};

export interface TableRow { [key: string]: any };

export interface TableDataItem<Y> {
    objectData: {
        key: Y;
    };
    rowData: TableRow;
};

export interface TableColumn {
    header: string;
    accessor: string;
    isURL: boolean;
    isDollarAmount: boolean;
    showColumn: boolean;
    inputType: InputType;
    isSortable: boolean;
    routeTo?: string;
    addSuffix?: string;
    detailedDescription?: string;
    isEditable?: boolean;
};

export type TableSeparatorDetails = {
    separatorText: (rowCounter: number) => string; // Text to be displayed at the separator
    rowsInterval: number;  // Number of rows between each separator
};

export type ExportIntoCSV = {
    buttonTitle: string;
};

export type TableActions<Y> = {
    handleEditUpdate?: (tableDataItem: TableDataItem<Y>) => Promise<Y>;
    handleDeleteUpdate?: (tableDataItem: TableDataItem<Y>) => Promise<boolean>;
};

/* ----For PropertiesListTable---- 
    Y = ListingWithScenariosResponseDTO
    X = PropertiesListTableType

   ----For InvestmentBreakdownTable---- 
    Y = MonthlyInvestmentDetailsResponseDTO
    X = InvestmentBreakdownTableType
*/
export interface ReusableTableProps<Y, X extends keyof TablesConfig<Y>> {
    data: Y[];
    tableHandler: AbstractTable<Y, X>;
    onRowClick?: (item: Y) => void;
    tableSeperatorDetails?: TableSeparatorDetails;
    exportIntoCSV?: ExportIntoCSV;
    tableActions?: TableActions<Y>;
    onPaginationChange?: (page: number, rowsPerPage: number) => void;
};

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

const ReusableTable = <Y, X extends keyof TablesConfig<Y>>({
    data,
    tableHandler,
    onRowClick,
    tableSeperatorDetails,
    exportIntoCSV,
    tableActions,
    onPaginationChange,
}: ReusableTableProps<Y, X>) => {

    const getTableColumns = (): TableColumn[] => {
        const tablesConfig: TablesConfig<Y> = tableHandler.getTablesConfig();
        return tablesConfig[tableType].columns;
    };

    const getTableData = (): TableDataItem<Y>[] => {
        return tableHandler.getTableData(data, tableType);
    };

    const [tableType, setTableType] = useState<X>(tableHandler.getDefaultTableType());
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: SortDirection } | null>(null);
    const [editMode, setEditMode] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<TableDataItem<Y>[]>(getTableData());
    const [currentEdit, setCurrentEdit] = useState<TableDataItem<Y> | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    useEffect(() => {
        setEditableData(getTableData());
    }, [data, tableType]);

    // useEffect(() => {
    //     if (onPaginationChange) {
    //         onPaginationChange(page, rowsPerPage);
    //     }
    // }, [page, rowsPerPage, onPaginationChange]);

    const deepCopy = (obj: TableDataItem<Y>): TableDataItem<Y> => {
        return JSON.parse(JSON.stringify(obj));
    };

    const sortData = (data: TableDataItem<Y>[]) => {
        if (sortConfig !== null) {
            return [...data].sort((a, b) => {
                if (a.rowData[sortConfig.key] < b.rowData[sortConfig.key]) {
                    return sortConfig.direction === SortDirection.ASCENDING ? -1 : 1;
                } else if (a.rowData[sortConfig.key] > b.rowData[sortConfig.key]) {
                    return sortConfig.direction === SortDirection.ASCENDING ? 1 : -1;
                }
                return 0;
            });
        }
        return data;
    };

    const requestSort = (column: TableColumn) => {
        if (!column.isSortable || isEditing) {
            return;
        }
        const key = column.accessor;
        let direction = SortDirection.ASCENDING;
        if (sortConfig && sortConfig.key === key && sortConfig.direction === SortDirection.ASCENDING) {
            direction = SortDirection.DESCENDING;
        }
        setSortConfig({ key, direction });
    };

    const areTableRowsEditable = (): boolean => {
        if (tableActions) {
            return tableActions.handleEditUpdate ? true : false;
        }
        return false;
    };

    const areTableRowsDeletable = (): boolean => {
        if (tableActions) {
            return tableActions.handleDeleteUpdate ? true : false;
        }
        return false;
    };

    const handleDeleteClick = async (index: number) => {
        if (editMode === null) {
            if (areTableRowsDeletable()) {
                setOpenDialog(true);
                setDeleteIndex(index);
            }
        }
    };

    const confirmDelete = async () => {
        if (deleteIndex !== null) {
            const row = editableData[deleteIndex];
            if (areTableRowsDeletable()) {
                try {
                    const wasDeleted = await tableActions!.handleDeleteUpdate!(row);
                    console.log('Was deleted: ', wasDeleted);
                    if (wasDeleted) {
                        setEditableData(prevData => prevData.filter((_, i) => i !== deleteIndex));
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
        setEditMode(index);
        setIsEditing(true);
        setCurrentEdit(deepCopy(editableData[index])); // Backup the current state before editing
    };

    const handleCancelClick = () => {
        if (editMode !== null && currentEdit) {
            const newData = [...editableData];
            newData[editMode] = currentEdit;
            setEditableData(newData);
        }
        setEditMode(null);
        setIsEditing(false);
        setCurrentEdit(null);
    };

    const handleSaveClick = async () => {
        if (editMode !== null) {
            const editedRow = editableData[editMode];
            if (areTableRowsEditable()) {
                try {
                    const updatedRow: Y = await tableActions!.handleEditUpdate!(editedRow);

                    const updatedEditableData = [...editableData];
                    const rowDataItem: TableDataItem<Y> = tableHandler.getRowData(updatedRow, tableType);
                    updatedEditableData[editMode] = rowDataItem;

                    setEditableData(updatedEditableData);
                } catch (error) {
                    console.error('Error updating row:', error);
                }
            }
        }

        setEditMode(null);
        setIsEditing(false);
        setCurrentEdit(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, column: TableColumn) => {
        const accessor = column.accessor;
        const newData = [...editableData];
        const value = e.target.value;
        if (InputType.NUMBER === column.inputType) {
            newData[rowIndex].rowData[accessor] = Number(value);
        }
        else {
            newData[rowIndex].rowData[accessor] = value;
        }
        setEditableData(newData);
    };

    const needToFetchData = (page: number, rowsPerPage: number): boolean => {
        const numberOfRowsAvailable = editableData.length;
        return numberOfRowsAvailable < ((page * rowsPerPage) + rowsPerPage);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        console.log(event);
        setPage(newPage);

        if (onPaginationChange && needToFetchData(page, rowsPerPage)) {
            onPaginationChange(page, rowsPerPage);
        }
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        if (onPaginationChange && needToFetchData(0, rowsPerPage)) {
            onPaginationChange(page, rowsPerPage);
        }
    };

    const displayEditActionButton = (rowIndex: number) => {
        if (editMode === rowIndex) {
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
        if (editMode !== rowIndex) {
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
        const columns: TableColumn[] = getTableColumns();
        return columns.filter(column => column.showColumn).length;
    };

    const getExportCSVButton = () => {
        return (
            exportIntoCSV && <ExportCSVButton
                columns={getTableColumns()}
                tableData={editableData}
                disabled={isEditing}
                buttonTitle={exportIntoCSV.buttonTitle}
            />
        );
    };

    const getCellContent = (
        originalIndex: number,
        column: TableColumn,
        item: TableDataItem<Y>,
    ) => {
        const cellData = renderCellData(item.rowData[column.accessor], column.isDollarAmount, column.addSuffix);

        let cellContent;
        if (editMode === originalIndex && column.isEditable) {
            cellContent = getEditableCellContent(originalIndex, column);
        } else if (column.isURL) {
            cellContent = getUrlCellContent(cellData);
        } else {
            cellContent = cellData;
        }

        if (column.routeTo) {
            cellContent = getRouteToCellContent(cellData, column, item);
        }

        return cellContent;
    };

    const getRouteToCellContent = (cellData: string, column: TableColumn, item: TableDataItem<Y>) => {
        return (
            <span>
                <Link to={`/${column.routeTo}/${cellData}`} state={{ data: item.objectData.key }}>
                    {cellData}
                </Link>
            </span>
        );
    };

    const getEditableCellContent = (originalIndex: number, column: TableColumn) => {
        return (
            <TextField
                type={column.inputType === InputType.NUMBER ? 'number' : 'text'}
                value={editableData[originalIndex].rowData[column.accessor]}
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

    const getUrlCellContent = (cellData: string) => {
        const formattedUrl = ensureAbsoluteUrl(cellData);
        return (
            <a href={formattedUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
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

    const getTableRow = (originalIndex: number, item: TableDataItem<Y>) => {
        return (
            <TableRow
                key={originalIndex}
                hover
                style={{ cursor: isEditing ? 'default' : 'pointer' }}
                onClick={() => !isEditing && onRowClick ? onRowClick(item.objectData.key) : undefined}
            >
                {(areTableRowsEditable() || areTableRowsDeletable()) && (
                    <StyledTableBodyCell>
                        {areTableRowsEditable() && displayEditActionButton(originalIndex)}
                        {areTableRowsDeletable() && displayDeleteActionButton(originalIndex)}
                    </StyledTableBodyCell>
                )}
                {getTableColumns().filter(column => column.showColumn).map((column, colIndex) => {
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
                    {getTableColumns().filter(column => column.showColumn).map((column) => (
                        <StyledTableCell key={column.accessor} onClick={() => requestSort(column)}>
                            <Tooltip title={column.detailedDescription || column.header}>
                                <Typography variant="subtitle2">{column.header}</Typography>
                            </Tooltip>
                        </StyledTableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    };

    const getTableBody = () => {
        const sortedData = sortData(editableData);
        const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

        return (
            <TableBody>
                {paginatedData.map((item) => {
                    const originalIndex = editableData.findIndex(data => data.objectData.key === item.objectData.key);
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

    const tableOptions: X[] = tableHandler.getTableOptions();

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            {setTableType && (tableOptions.length > 1) && (
                <Box mb={2}>
                    <Typography variant="h6" gutterBottom>Select Table Type</Typography>
                    <Box display="flex" flexDirection="row">
                        {tableOptions.map((option) => (
                            <Box key={option} mr={2}>
                                <Button
                                    variant={tableType === option ? "contained" : "outlined"}
                                    color="primary"
                                    onClick={() => setTableType(option)}
                                >
                                    {option}
                                </Button>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
            {exportIntoCSV && (
                <Box mb={2}>
                    {getExportCSVButton()}
                </Box>
            )}
            <Box width="95%">
                <StyledPaper>
                    <StyledTableContainer>
                        <StyledTable>
                            {getTableHead()}
                            {getTableBody()}
                        </StyledTable>
                    </StyledTableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={editableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </StyledPaper>
            </Box>
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
