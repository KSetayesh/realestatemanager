import React, { useEffect, useState } from 'react';
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
import {
    AbstractTable1,
    TableDataItem,
    TableType,
    ColumnDetail,
    TableColumn,
    TableColumnDetailsEnum,
    SortDirection,
    PrimitiveType
} from '@realestatemanager/types';
import NewExportCSVButton from './NewExportCSVButton';
import ConfirmationDialog from '../components/ConfirmationDialog';

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

export type SortConfig = {
    columnKey: TableColumnDetailsEnum;
    direction: SortDirection;
};

export type TableSeparatorDetails = {
    separatorText: (rowCounter: number) => string; // Text to be displayed at the separator
    rowsInterval: number;  // Number of rows between each separator
};

export type TableActions<Y> = {
    handleEditUpdate?: (tableDataItem: TableDataItem<Y>) => Promise<Y>;
    handleDeleteUpdate?: (tableDataItem: TableDataItem<Y>) => Promise<boolean>;
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
    tableHandler: AbstractTable1<K, Y, X>;
    onRowClick?: (item: Y) => void;
    tableSeperatorDetails?: TableSeparatorDetails;
    tableActions?: TableActions<Y>;
};

const NewNewReusableTable = <K extends TableType, Y, X>({
    data,
    tableHandler,
    onRowClick,
    tableSeperatorDetails,
    tableActions,
}: ReusableTableProps<K, Y, X>) => {

    const getTableData = (_data: Y[]) => {
        return tableHandler.getTableData(_data);
    }

    const [tableType, setTableType] = useState<X>(tableHandler.getDefaultTableType());
    const [tableData, setTableData] = useState<TableDataItem<Y>[]>(getTableData(data));
    const [sortConfig, setSortConfig] = useState<SortConfig>();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<number | null>(null);
    const [currentEdit, setCurrentEdit] = useState<TableDataItem<Y> | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    useEffect(() => {
        setTableData(getTableData(data));
    }, [data, tableType]);

    const getTableColumns = (): TableColumn[] => {
        return tableHandler.getAllSubTableColumnDetails(tableType);
    };

    const getExportCSVButton = () => {

        const hasExportCsvOption = (): boolean => {
            return tableHandler.exportToCSV.enabled;
        };

        return (
            <>
                {hasExportCsvOption() && (
                    <Box mb={2}>
                        {/* Come back and update ExportCSVButton component */}
                        <NewExportCSVButton
                            columns={getTableColumns()}
                            tableData={tableData}
                            disabled={isEditing}
                            buttonTitle={tableHandler.exportToCSV.buttonName}
                        />
                    </Box>
                )}
            </>
        );
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

    const confirmDelete = async () => {
        if (deleteIndex !== null) {
            const row = tableData[deleteIndex];
            if (areTableRowsDeletable()) {
                try {
                    const wasDeleted = await tableActions!.handleDeleteUpdate!(row);
                    console.log('Was deleted: ', wasDeleted);
                    if (wasDeleted) {
                        setTableData(prevData => prevData.filter((_, i) => i !== deleteIndex));
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

    const getTableSeparator = (originalIndex: number) => {
        if (!tableSeperatorDetails) {
            return;
        }

        const getVisibleColumnCount = (): number => {
            return getTableColumns().length;
        };

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

    const getTableHead = () => {

        const getColumnKey = (tableColumn: TableColumn): TableColumnDetailsEnum => {
            return tableColumn.columnKey;
        };

        const getColumnDetails = (tableColumn: TableColumn): ColumnDetail => {
            return tableColumn.columnDetails;
        };

        const requestSort = (columnKey: TableColumnDetailsEnum, columnDetails: ColumnDetail) => {
            if (!columnDetails.isSortable || isEditing) {
                return;
            }
            let direction = SortDirection.ASCENDING;
            if (sortConfig && sortConfig.columnKey === columnKey && sortConfig.direction === SortDirection.ASCENDING) {
                direction = SortDirection.DESCENDING;
            }
            setSortConfig({ columnKey, direction });
        };

        const tableColumns: TableColumn[] = getTableColumns();

        return (
            <TableHead>
                <TableRow>
                    {(areTableRowsEditable() || areTableRowsDeletable()) && <StyledTableCell>Actions</StyledTableCell>}
                    {tableColumns
                        .map((tableColumn) => {
                            const columnDetails = getColumnDetails(tableColumn);
                            const columnKey = getColumnKey(tableColumn);
                            return (
                                <StyledTableCell key={columnDetails.accessor} onClick={() => requestSort(columnKey, columnDetails)}>
                                    <Tooltip title={columnDetails.detailedDescription || columnDetails.title}>
                                        <Typography variant="subtitle2">{columnDetails.title}</Typography>
                                    </Tooltip>
                                </StyledTableCell>
                            );
                        })}
                </TableRow>
            </TableHead>
        );
    };

    const getCellContent = (
        // originalIndex: number,
        column: TableColumn,
        item: TableDataItem<Y>,
    ): string => {
        return item.tableRow[column.columnKey]?.valueToBeDisplayed ?? '';
        // return tableHandler.getColumnValue(tableType, item.objectData.key, column.columnKey);

        // const cellData = renderCellData(item.rowData[column.accessor], column.isDollarAmount, column.addSuffix);

        // let cellContent;
        // if (editMode === originalIndex && column.isEditable) {
        //     cellContent = getEditableCellContent(originalIndex, column);
        // } else if (column.isURL) {
        //     cellContent = getUrlCellContent(cellData);
        // } else {
        //     cellContent = cellData;
        // }

        // if (column.routeTo) {
        //     cellContent = getRouteToCellContent(cellData, column, item);
        // }

    };

    const getTableRow = (originalIndex: number, item: TableDataItem<Y>) => {

        const tableColumns: TableColumn[] = getTableColumns();

        const handleSaveClick = async () => {
            if (editMode !== null) {
                const editedRow = tableData[editMode];
                if (areTableRowsEditable()) {
                    try {
                        const updatedRow: Y = await tableActions!.handleEditUpdate!(editedRow);

                        const updatedEditableData = [...tableData];
                        const rowDataItem: TableDataItem<Y> = tableHandler.getTableRow(updatedRow, tableType);
                        updatedEditableData[editMode] = rowDataItem;

                        setTableData(updatedEditableData);
                    } catch (error) {
                        console.error('Error updating row:', error);
                    }
                }
            }

            setEditMode(null);
            setIsEditing(false);
            setCurrentEdit(null);
        };

        const handleCancelClick = () => {
            if (editMode !== null && currentEdit) {
                const newData = [...tableData];
                newData[editMode] = currentEdit;
                setTableData(newData);
            }
            setEditMode(null);
            setIsEditing(false);
            setCurrentEdit(null);
        };

        const handleEditClick = (index: number) => {

            const deepCopy = (obj: TableDataItem<Y>): TableDataItem<Y> => {
                return JSON.parse(JSON.stringify(obj));
            };

            setEditMode(index);
            setIsEditing(true);
            setCurrentEdit(deepCopy(tableData[index])); // Backup the current state before editing
        };

        const handleDeleteClick = async (index: number) => {
            if (editMode === null) {
                if (areTableRowsDeletable()) {
                    setOpenDialog(true);
                    setDeleteIndex(index);
                }
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
                {tableColumns.map((column, colIndex) => {
                    // const cellContent = getCellContent(originalIndex, column, item);
                    const cellContent = getCellContent(column, item);
                    return (
                        <StyledTableBodyCell key={`cell_${colIndex}_${originalIndex}`}>
                            {cellContent}
                        </StyledTableBodyCell>
                    );
                })}
            </TableRow>
        );
    };

    const getTableBody = () => {
        // const sortedData = sortData(editableData);
        const sortedData = tableHandler.sort(tableData, tableType, sortConfig);
        const paginatedData = sortedData;  //sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

        return (
            <TableBody>
                {paginatedData.map((item) => {
                    const originalIndex = tableData.findIndex(data => data.objectData.key === item.objectData.key);
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

    // These are the different table types you can select on the GUI 
    const getTableOptions = () => {
        return (<></>);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            {getTableOptions()}
            {getExportCSVButton()}
            <Box width="95%">
                <StyledPaper>
                    <StyledTableContainer>
                        <StyledTable>
                            {getTableHead()}
                            {getTableBody()}
                        </StyledTable>
                    </StyledTableContainer>
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

export default NewNewReusableTable;
