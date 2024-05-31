import React, { useState } from 'react';
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
import { AbstractTable } from '../tables/AbstractTable';

enum SortDirection {
    ASCENDING = 'ascending',
    DESCENDING = 'descending',
};

export interface TableRow { [key: string]: any };

export interface TableDataItem<T> {
    objectData: {
        key: T;
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
    T = ListingWithScenariosResponseDTO
    X = PropertiesListTableType
    Y = ListingWithScenariosResponseDTO

   ----For InvestmentBreakdownTable---- 
    T = ListingWithScenariosResponseDTO
    X = InvestmentBreakdownTableType
    Y = MonthlyInvestmentDetailsResponseDTO
*/
export interface ReusableTableProps<Y, X, T> {
    columns: TableColumn[];
    tableData: TableDataItem<T>[];
    tableHandler: AbstractTable<Y, X, T>;
    onRowClick?: (item: T) => void;
    includeTableSeparator?: boolean;
    canExportIntoCSV?: boolean;
    isEditable?: boolean;
    handleUpdate?: (tableDataItem: TableDataItem<T>) => Promise<T>;
};

const ReusableTable = <Y, X, T>({
    columns,
    tableData,
    tableHandler,
    onRowClick,
    includeTableSeparator = false,
    canExportIntoCSV = false,
    isEditable = false,
    handleUpdate,
}: ReusableTableProps<Y, X, T>) => {

    const [sortConfig, setSortConfig] = useState<{ key: string; direction: SortDirection } | null>(null);
    const [editMode, setEditMode] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<TableDataItem<T>[]>(tableData);
    const [currentEdit, setCurrentEdit] = useState<TableDataItem<T> | null>(null);

    const deepCopy = (obj: TableDataItem<T>): TableDataItem<T> => {
        return JSON.parse(JSON.stringify(obj));
    };

    const sortData = (data: TableDataItem<T>[]) => {
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
                    const updatedRow: T = await handleUpdate(editedRow);
                } catch (error) {
                    console.error('Error updating row:', error);
                }
            }
        }

        setEditMode(null);
        setIsEditing(false);
        setCurrentEdit(null);
    };

    // const handleSaveClick = () => {
    //     setEditMode(null);
    //     setIsEditing(false);
    //     setCurrentEdit(null);
    // };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, column: TableColumn) => { //accessor: string) => {
        const accessor = column.accessor;
        const newData = [...editableData];
        let value = e.target.value; // renderCellData(e.target.value, column.isDollarAmount, column.addSuffix);
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
        return columns.filter(column => column.showColumn).length;
    };

    const sortedData = sortData(editableData);

    return (
        <div>
            {canExportIntoCSV && (
                <ExportCSVButton columns={columns} tableData={editableData} disabled={isEditing} />  // Use the new component
            )}
            <table className="properties-table">
                <thead>
                    <tr>
                        {isEditable && <th>Actions</th>}
                        {columns.filter(column => column.showColumn).map((column) => (
                            <th key={column.accessor} onClick={() => requestSort(column)}>
                                <Tooltip content={column.detailedDescription || column.header}>
                                    {column.header}
                                </Tooltip>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, sortedIndex) => {
                        const originalIndex = editableData.findIndex(data => data.objectData.key === item.objectData.key);
                        return (
                            <React.Fragment key={originalIndex}>
                                <tr
                                    style={{ cursor: isEditing ? 'default' : 'pointer' }}
                                    onClick={() => !isEditing && onRowClick ? onRowClick(item.objectData.key) : undefined}
                                >
                                    {isEditable && <td>{displayActionButton(originalIndex)}</td>}
                                    {columns.filter(column => column.showColumn).map((column, colIndex) => {
                                        const cellData = renderCellData(item.rowData[column.accessor], column.isDollarAmount, column.addSuffix);

                                        let cellContent;
                                        if (editMode === originalIndex && column.isEditable) {
                                            cellContent = (
                                                <input
                                                    type="text"
                                                    value={editableData[originalIndex].rowData[column.accessor]}
                                                    onChange={(e) => handleInputChange(e, originalIndex, column)}
                                                />
                                            );
                                        } else if (column.isURL) {
                                            const formattedUrl = ensureAbsoluteUrl(cellData);
                                            cellContent = (
                                                <a href={formattedUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                                    View
                                                </a>
                                            );
                                        } else {
                                            cellContent = cellData;
                                        }

                                        if (column.routeTo) {
                                            cellContent = (
                                                <span>
                                                    <Link to={`/${column.routeTo}/${cellData}`} state={{ data: item.objectData.key }}>
                                                        {cellData}
                                                    </Link>
                                                </span>
                                            );
                                        }

                                        return <td key={`cell_${colIndex}_${originalIndex}`}>{cellContent}</td>;
                                    })}
                                </tr>
                                {includeTableSeparator && ((sortedIndex + 1) % 12 === 0) && (
                                    <tr key={`separator_${originalIndex}`}>
                                        <td colSpan={getVisibleColumnCount() + 1} style={{ textAlign: 'center' }}>
                                            <b>End of Year {(sortedIndex + 1) / 12}</b>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ReusableTable;
