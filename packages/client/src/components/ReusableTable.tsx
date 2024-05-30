import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import '../styles/PropertiesList.css';
import '../styles/Tooltip.css';
import { ensureAbsoluteUrl, renderCellData } from '../constants/Constant';
import Tooltip from '../components/Tooltip';
import ExportCSVButton from './ExportCSVButton';  // Import the new component

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
    isSortable: boolean;
    routeTo?: string;
    addSuffix?: string;
    detailedDescription?: string;
    isEditable?: boolean;
};

export interface ReusableTableProps<T> {
    columns: TableColumn[];
    tableData: TableDataItem<T>[];
    onRowClick?: (item: T) => void;
    includeTableSeparator?: boolean;
    canExportIntoCSV?: boolean;
    isEditable?: boolean;
};

const ReusableTable = <T,>({
    columns,
    tableData,
    onRowClick,
    includeTableSeparator = false,
    canExportIntoCSV = false,
    isEditable = false
}: ReusableTableProps<T>) => {

    const [sortConfig, setSortConfig] = useState<{ key: string; direction: SortDirection } | null>(null);
    const [editMode, setEditMode] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<TableDataItem<T>[]>(tableData);
    const [currentEdit, setCurrentEdit] = useState<TableDataItem<T> | null>(null);

    let sortedData = [...editableData];

    if (sortConfig !== null) {
        sortedData.sort((a, b) => {
            if (a.rowData[sortConfig.key] < b.rowData[sortConfig.key]) {
                return sortConfig.direction === SortDirection.ASCENDING ? -1 : 1;
            } else if (a.rowData[sortConfig.key] > b.rowData[sortConfig.key]) {
                return sortConfig.direction === SortDirection.ASCENDING ? 1 : -1;
            }
            return 0;
        });
    }

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
        setCurrentEdit(editableData[index]);
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

    const handleSaveClick = () => {
        setEditMode(null);
        setIsEditing(false);
        setCurrentEdit(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, accessor: string) => {
        const newData = [...editableData];
        newData[rowIndex].rowData[accessor] = e.target.value;
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

    const visibleColumnsCount = columns.filter(column => column.showColumn).length;

    return (
        <div>
            {canExportIntoCSV && (
                <ExportCSVButton columns={columns} tableData={editableData} />  // Use the new component
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
                                                    onChange={(e) => handleInputChange(e, originalIndex, column.accessor)}
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
                                        <td colSpan={visibleColumnsCount + 1} style={{ textAlign: 'center' }}>
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
