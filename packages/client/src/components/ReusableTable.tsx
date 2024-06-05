import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import '../styles/PropertiesList.css';
import '../styles/Tooltip.css';
import { InputType, ensureAbsoluteUrl, renderCellData } from '../constants/Constant';
import Tooltip from '../components/Tooltip';
import ExportCSVButton from './ExportCSVButton';  // Import the new component
import { AbstractTable, TablesConfig } from '../tables/AbstractTable';

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
    tableType: X;
    setTableType?: React.Dispatch<React.SetStateAction<X>>;
    tableTypeOptions?: X[];
    onRowClick?: (item: Y) => void;
    includeTableSeparator?: boolean;
    canExportIntoCSV?: boolean;
    isEditable?: boolean;
    handleUpdate?: (tableDataItem: TableDataItem<Y>) => Promise<Y>;
};

const ReusableTable = <Y, X extends keyof TablesConfig<Y>>({
    data,
    tableHandler,
    tableType,
    setTableType,
    tableTypeOptions,
    onRowClick,
    includeTableSeparator = false,
    canExportIntoCSV = false,
    isEditable = false,
    handleUpdate,
}: ReusableTableProps<Y, X>) => {

    const getTableColumns = (): TableColumn[] => {
        const tablesConfig: TablesConfig<Y> = tableHandler.getTablesConfig();
        return tablesConfig[tableType].columns;
    };

    const getTableData = (): TableDataItem<Y>[] => {
        return tableHandler.getTableData(data, tableType);
    };

    const [sortConfig, setSortConfig] = useState<{ key: string; direction: SortDirection } | null>(null);
    const [editMode, setEditMode] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<TableDataItem<Y>[]>(getTableData());
    const [currentEdit, setCurrentEdit] = useState<TableDataItem<Y> | null>(null);

    useEffect(() => {
        setEditableData(getTableData());
    }, [data, tableType]);

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
            // Send the editedRow to the backend
            if (handleUpdate) {
                try {
                    // Send the editedRow to the backend
                    console.log('Sending edited row to backend:', editedRow);
                    const updatedRow: Y = await handleUpdate(editedRow);

                    // Update the editableData state with the new data
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

    const displayActionButton = (rowIndex: number) => {
        if (editMode === rowIndex) {
            return (
                <>
                    <button
                        className="button-icon"
                        onClick={(e) => { e.stopPropagation(); handleSaveClick(); }}
                    >
                        <CheckIcon className="icon-small" />
                    </button>
                    <button
                        className="button-icon"
                        onClick={(e) => { e.stopPropagation(); handleCancelClick(); }}
                    >
                        <CloseIcon className="icon-small" />
                    </button>
                </>
            );
        }
        return (
            <>
                <button
                    className="button-icon"
                    onClick={(e) => { e.stopPropagation(); handleEditClick(rowIndex); }}
                >
                    <EditIcon className="icon-small" />
                </button>
                <button
                    className="button-icon"
                    onClick={(e) => { e.stopPropagation(); /* Add delete action here */ }}
                >
                    <DeleteIcon className="icon-small" />
                </button>
            </>
        );
    };

    const getVisibleColumnCount = (): number => {
        const columns: TableColumn[] = getTableColumns();
        return columns.filter(column => column.showColumn).length;
    };

    const getExportCSVButton = () => {
        return (
            <ExportCSVButton columns={getTableColumns()} tableData={editableData} disabled={isEditing} />
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
            <input
                type="text"
                value={editableData[originalIndex].rowData[column.accessor]}
                onChange={(e) => handleInputChange(e, originalIndex, column)}
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

    const getTableSeparator = (originalIndex: number, sortedIndex: number) => {
        return ((sortedIndex + 1) % 12 === 0) && (
            <tr key={`separator_${originalIndex}`}>
                <td colSpan={getVisibleColumnCount() + 1} style={{ textAlign: 'center' }}>
                    <b>End of Year {(sortedIndex + 1) / 12}</b>
                </td>
            </tr>
        );
    };

    const getTableRow = (originalIndex: number, item: TableDataItem<Y>) => {
        return (
            <tr
                style={{ cursor: isEditing ? 'default' : 'pointer' }}
                onClick={() => !isEditing && onRowClick ? onRowClick(item.objectData.key) : undefined}
            >
                {isEditable && <td>{displayActionButton(originalIndex)}</td>}
                {getTableColumns().filter(column => column.showColumn).map((column, colIndex) => {
                    const cellContent = getCellContent(originalIndex, column, item);
                    return <td key={`cell_${colIndex}_${originalIndex}`}>{cellContent}</td>;
                })}
            </tr>);
    }

    const getTableHead = () => {
        return (
            <thead>
                <tr>
                    {isEditable && <th>Actions</th>}
                    {getTableColumns().filter(column => column.showColumn).map((column) => (
                        <th key={column.accessor} onClick={() => requestSort(column)}>
                            <Tooltip content={column.detailedDescription || column.header}>
                                {column.header}
                            </Tooltip>
                        </th>
                    ))}
                </tr>
            </thead>
        );
    };

    const getTableBody = () => {
        return (
            <tbody>
                {sortedData.map((item, sortedIndex) => {
                    const originalIndex = editableData.findIndex(data => data.objectData.key === item.objectData.key);
                    return (
                        <React.Fragment key={originalIndex}>
                            {getTableRow(originalIndex, item)}
                            {includeTableSeparator && getTableSeparator(originalIndex, sortedIndex)}
                        </React.Fragment>
                    );
                })}
            </tbody>
        );
    };

    const sortedData = sortData(editableData);

    return (
        <div>
            {setTableType && tableTypeOptions && (
                <div className="radio-button-group">
                    <h2>Select Table Type</h2>
                    {tableTypeOptions.map((option) => (
                        <label key={option}>
                            <input
                                type="radio"
                                value={option}
                                checked={tableType === option}
                                onChange={() => setTableType(option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
            {canExportIntoCSV && (
                getExportCSVButton()
            )}
            <table className="properties-table">
                {getTableHead()}
                {getTableBody()}
            </table>
        </div>
    );
};

export default ReusableTable;
