import { TableColumnDetailsEnum, columnDetails } from "../tabledata/TableColumnConfig";
import { tableDetails } from "../tabledata/TableConfig";
import { ColumnDetail, PrimitiveType, SortDirection, TableDetailType, TableType, TableTypeMapping } from "../types/ClientTypes";

export type CellData = {
    column: TableColumnDetailsEnum;
    value: PrimitiveType;
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

    constructor(tableType: K) {
        this._tableType = tableType;
        this.details = tableDetails[tableType];
        this._subTables = this.details.subTables;
        this._title = this.details.title;
        this._canDeleteFromTable = this.details.canDeleteFromTable;
        this._isEditable = this.details.isEditable;
        this._isSortable = this.details.isSortable;
        this._pageable = this.details.pageable;
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

    get subTables(): TableTypeMapping[K] {
        return this._subTables;
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

    getColumnDetails(subTableType: X, columnType: TableColumnDetailsEnum): TableColumn {
        const tableColumnEnums: Set<TableColumnDetailsEnum> = this.getAllSubTableColumnsAsSet(subTableType);
        if (!tableColumnEnums.has(columnType)) {
            throw new Error('Error with table structure');
        }
        return {
            columnKey: columnType,
            columnDetails: columnDetails[columnType],
        };

    }

    getAllSubTableColumnDetails(subTableType: X): TableColumn[] {
        const subTableColumns: TableColumnDetailsEnum[] = this.getAllSubTableColumns(subTableType);
        return subTableColumns.map(column => this.getColumnDetails(subTableType, column));
    }

    private getTableRow(data: Y, subTableType: X, tableColumns?: TableColumnDetailsEnum[]): TableDataItem<Y> {
        if (!tableColumns) {
            tableColumns = this.getAllSubTableColumns(subTableType);
        }
        const tableRow: TableRow = {};
        for (const column of tableColumns) {
            const value: PrimitiveType = this.getColumnValue(subTableType, data, column);
            const cellData: CellData = {
                column: column,
                value: value,
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

    protected abstract getAllSubTableColumns(subTableType?: X): TableColumnDetailsEnum[];

    protected abstract getColumnValue(subTableType: X, item: Y, columnType: TableColumnDetailsEnum): PrimitiveType;

    abstract getDefaultTableType(): X;

}