import { TableColumnDetailsEnum, columnDetails } from "../tabledata/TableColumnConfig";
import { tableDetails } from "../tabledata/TableConfig";
import {
    ColumnDetail,
    ExportOption,
    PrimitiveType,
    SortDirection,
    TableDetailType,
    TableType,
    TableTypeMapping
} from "../types/ClientTypes";

export type CellData = {
    column: TableColumnDetailsEnum;
    value: PrimitiveType;
    valueToBeDisplayed: string;
};

export type TableColumn = {
    columnKey: TableColumnDetailsEnum;
    columnDetails: ColumnDetail;
}

export type TableRow = Partial<Record<TableColumnDetailsEnum, CellData>>;

export type TableDataItem<Y> = {
    objectData: {
        key: Y;
    };
    tableRow: TableRow;
};

type TableData<Y, X> = {
    subTable: X;
    columns: TableColumn[];
    rows: TableDataItem<Y>[];
};

export type SortConfig = {
    columnKey: TableColumnDetailsEnum;
    direction: SortDirection;
};

export abstract class AbstractTable1<K extends TableType, Y, X> {
    private details: TableDetailType<K>;
    private _subTables: TableTypeMapping[K];
    private _tableType: K;
    private _title: string;
    private _canDeleteFromTable: boolean;
    private _isEditable: boolean;
    private _isSortable: boolean;
    private _pageable: boolean;
    private _exportToCSV: ExportOption;

    constructor(tableType: K) {
        this._tableType = tableType;
        this.details = tableDetails[tableType];
        this._subTables = this.details.subTables;
        this._title = this.details.title;
        this._canDeleteFromTable = this.details.canDeleteFromTable;
        this._isEditable = this.details.isEditable;
        this._isSortable = this.details.isSortable;
        this._pageable = this.details.pageable;
        this._exportToCSV = this.details.exportToCSV;
    }

    get tableType(): TableType {
        return this._tableType;
    }

    get title(): string {
        return this._title;
    }

    get canDeleteFromTable(): boolean {
        return this._canDeleteFromTable;
    }

    get isEditable(): boolean {
        return this._isEditable;
    }

    get isSortable(): boolean {
        return this._isSortable;
    }

    get pageable(): boolean {
        return this._pageable;
    }

    get exportToCSV(): ExportOption {
        return this._exportToCSV;
    }

    get subTables(): TableTypeMapping[K] {
        return this._subTables;
    }


    getAllSubTableTypes(): X[] {
        return Object.keys(this.subTables) as X[];
    }

    sort(
        list: TableDataItem<Y>[],
        subTableType: X,
        sortConfig?: SortConfig,
    ): TableDataItem<Y>[] {

        if (!this.isSortable || !sortConfig) {
            return list;
        }

        const genericSort = (
            aValue: number | string | boolean,
            bValue: number | string | boolean,
            sortDirection: SortDirection
        ): number => {
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortDirection === SortDirection.ASCENDING
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortDirection === SortDirection.ASCENDING
                    ? aValue - bValue
                    : bValue - aValue;
            }

            if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
                return sortDirection === SortDirection.ASCENDING
                    ? (aValue === bValue ? 0 : aValue ? -1 : 1)
                    : (aValue === bValue ? 0 : aValue ? 1 : -1);
            }

            // For mixed types or unhandled types, treat as equal
            return 0;
        };

        return list.sort((a, b) => {
            const data_a: Y = a.objectData.key;
            const data_b: Y = b.objectData.key;
            const cellValue_a: PrimitiveType = this.getColumnValue(subTableType, data_a, sortConfig.columnKey);
            const cellValue_b: PrimitiveType = this.getColumnValue(subTableType, data_b, sortConfig.columnKey);
            return genericSort(cellValue_a, cellValue_b, sortConfig.direction);
        });
    }

    getTableData(listOfData: Y[], subTableType?: X): TableDataItem<Y>[] {
        const tableData: TableDataItem<Y>[] = [];
        const tableColumns: TableColumnDetailsEnum[] = this.getAllSubTableColumns(subTableType);
        for (const data of listOfData) {
            tableData.push(this.getTableRow(data, subTableType, tableColumns));
        }
        return tableData;
    }

    // getAllSubTableColumnTitles(subTableType: X): string[] {
    //     const subTableColumns: TableColumnDetailsEnum[] = this.getAllSubTableColumns(subTableType);
    //     return subTableColumns.map(column => this.getColumnDetails(subTableType, column).columnDetails.title);
    // }

    getAllSubTableColumnDetails(subTableType: X): TableColumn[] {
        const subTableColumns: TableColumnDetailsEnum[] = this.getAllSubTableColumns(subTableType);
        return subTableColumns.map(column => this.getColumnDetails(subTableType, column));
    }

    protected getColumnDetails(subTableType: X, columnType: TableColumnDetailsEnum): TableColumn {
        const tableColumnEnums: Set<TableColumnDetailsEnum> = this.getAllSubTableColumnsAsSet(subTableType);
        if (!tableColumnEnums.has(columnType)) {
            throw new Error('Error with table structure');
        }
        return {
            columnKey: columnType,
            columnDetails: columnDetails[columnType],
        };

    }

    private getColumnValueToBeDisplayed(subTableType: X, item: Y, columnType: TableColumnDetailsEnum): string {
        const columnValue: PrimitiveType = this.getColumnValue(subTableType, item, columnType);
        const columnDetails = this.getColumnDetails(subTableType, columnType).columnDetails;
        return this.updateValueToBeDisplayed(columnValue, columnDetails);
    }

    private updateValueToBeDisplayed(cellData: PrimitiveType, columnDetails: ColumnDetail): string {

        const formatDollarAmount = (amount: number): string => {
            return amount.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
        };

        const booleanToYesNo = (value: boolean | undefined) => value ? 'Yes' : 'No';

        const ensureAbsoluteUrl = (url: string): string => {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                return 'http://' + url;  // Defaulting to http if no protocol is specified
            }
            return url;
        };

        const renderCellData = (cellData: PrimitiveType, columnDetails: ColumnDetail): string => {
            const isDollarAmount: boolean = columnDetails.isDollarAmount;
            const addSuffix: string = columnDetails.addSuffix;

            let toReturn = '';
            if (typeof cellData === 'boolean') {
                toReturn = booleanToYesNo(cellData);
            }
            else if (typeof cellData === 'string') {
                toReturn = cellData.toString();
            }
            else if (typeof cellData === 'number') {
                toReturn = isDollarAmount ? formatDollarAmount(cellData) : cellData.toString();
            }
            // else if (Array.isArray(cellData)) {
            //     toReturn = cellData.join(', '); // Example: array to comma-separated string
            // }
            else if (typeof cellData === 'object' && cellData !== null) {
                toReturn = JSON.stringify(cellData); // Or extract specific properties to render
            }

            toReturn = toReturn === '' ? toReturn : toReturn + (addSuffix ? addSuffix : ''); // Fallback for undefined or null

            if (columnDetails.isUrl) {
                toReturn = ensureAbsoluteUrl(toReturn);
            }
            if (columnDetails.routeTo) {
                toReturn = `/${columnDetails.routeTo}/${toReturn}`;
            }

            return toReturn;
        };

        return renderCellData(cellData, columnDetails);
    }

    getTableRow(data: Y, subTableType: X, tableColumns?: TableColumnDetailsEnum[]): TableDataItem<Y> {
        if (!tableColumns) {
            tableColumns = this.getAllSubTableColumns(subTableType);
        }
        const tableRow: TableRow = {};
        for (const column of tableColumns) {
            const value: PrimitiveType = this.getColumnValue(subTableType, data, column);
            const valueToBeDisplayed: string = this.getColumnValueToBeDisplayed(subTableType, data, column);
            const cellData: CellData = {
                column: column,
                value: value,
                valueToBeDisplayed: valueToBeDisplayed,
            };
            tableRow[column] = cellData;
        }
        return {
            objectData: {
                key: data,
            },
            tableRow: tableRow,
        };
    }

    private getAllSubTableColumnsAsSet(subTableType?: X): Set<TableColumnDetailsEnum> {
        return new Set(this.getAllSubTableColumns(subTableType));
    }

    private getAllSubTableColumns(subTableType?: X): TableColumnDetailsEnum[] {

        const showColumn = (column: TableColumnDetailsEnum): boolean => {
            return this.getColumnDetails(subTableType, column).columnDetails.showColumn;
        };

        const columnEnums: TableColumnDetailsEnum[] = this._getAllSubTableColumns(subTableType);
        const toReturn: TableColumnDetailsEnum[] = [];
        for (const column of columnEnums) {
            if (showColumn(column)) {
                toReturn.push(column);
            }
        }
        return toReturn;
    }

    protected abstract _getAllSubTableColumns(subTableType?: X): TableColumnDetailsEnum[];

    protected abstract getColumnValue(subTableType: X, item: Y, columnType: TableColumnDetailsEnum): PrimitiveType;

    abstract getDefaultTableType(): X;

}