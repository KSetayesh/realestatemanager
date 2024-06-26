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
    Box,
    Typography,
    styled,
} from '@mui/material';
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
    direction: SortDirection
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
};

const NewNewReusableTable = <K extends TableType, Y, X>({
    data,
    tableHandler,
}: ReusableTableProps<K, Y, X>) => {

    const getTableData = (_data: Y[]) => {
        return tableHandler.getTableData(_data);
    }

    const [tableType, setTableType] = useState<X>(tableHandler.getDefaultTableType());
    const [tableData, setTableData] = useState<TableDataItem<Y>[]>(getTableData(data));
    const [sortConfig, setSortConfig] = useState<SortConfig>();

    useEffect(() => {
        setTableData(getTableData(data));
    }, [data, tableType]);

    const getTableColumns = (): TableColumn[] => {
        return tableHandler.getAllSubTableColumnDetails(tableType);
    };

    const getColumnDetails = (tableColumn: TableColumn): ColumnDetail => {
        return tableColumn.columnDetails;
    };

    const getColumnKey = (tableColumn: TableColumn): TableColumnDetailsEnum => {
        return tableColumn.columnKey;
    };

    const getTableHead = () => {

        const requestSort = (columnKey: TableColumnDetailsEnum, columnDetails: ColumnDetail) => {
            if (!columnDetails.isSortable) { //|| isEditing) {
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
                    {/* {(areTableRowsEditable() || areTableRowsDeletable()) && <StyledTableCell>Actions</StyledTableCell>} */}
                    {tableColumns
                        .filter(tableColumn => getColumnDetails(tableColumn).showColumn)
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

        return (
            <TableRow
                key={originalIndex}
                hover
            // style={{ cursor: isEditing ? 'default' : 'pointer' }}
            // onClick={() => !isEditing && onRowClick ? onRowClick(item.objectData.key) : undefined}
            >
                {/* {(areTableRowsEditable() || areTableRowsDeletable()) && (
                    <StyledTableBodyCell>
                        {areTableRowsEditable() && displayEditActionButton(originalIndex)}
                        {areTableRowsDeletable() && displayDeleteActionButton(originalIndex)}
                    </StyledTableBodyCell>
                )} */}
                {tableColumns.filter(column => getColumnDetails(column).showColumn).map((column, colIndex) => {
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
                            {/* {tableSeperatorDetails && getTableSeparator(originalIndex)} */}
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
        </Box>
    );
};

export default NewNewReusableTable;
