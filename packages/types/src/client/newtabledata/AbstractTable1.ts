import { TableColumnDetailsEnum, columnDetails } from "../tabledata/TableColumnConfig";
import { TableDetailType, TableType, TableTypeMapping, tableDetails } from "../tabledata/TableConfig";
import { ColumnDetail, PrimitiveType, SortDirection } from "../types/ClientTypes";

export type CellData = {
    column: TableColumnDetailsEnum;
    value: PrimitiveType;
};

export type TableDataItem<Y> = {
    objectData: {
        key: Y;
    };
    tableRow: CellData[];
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

    sort(list: Y[], subTableType: X, columnType: TableColumnDetailsEnum, sortDirection: SortDirection): Y[] {
        if (!this.isSortable) {
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

        const _sort = <T>(list: T[], _func: (s: T) => PrimitiveType, sortDirection: SortDirection): T[] => {
            return list.sort((a, b) => {
                const aValue = _func(a);
                const bValue = _func(b);
                return genericSort(aValue, bValue, sortDirection);
            });
        };

        return _sort(list, data => this.getColumnValue(subTableType, data, columnType), sortDirection);
    }

    getTableData(listOfData: Y[], subTableType: X): TableDataItem<Y>[] {
        const tableData: TableDataItem<Y>[] = [];
        const tableColumns: TableColumnDetailsEnum[] = this.getAllSubTableColumns(subTableType);
        for (const data of listOfData) {
            const tableRow: CellData[] = [];
            for (const column of tableColumns) {
                const value: PrimitiveType = this.getColumnValue(subTableType, data, column);
                const cellData: CellData = {
                    column: column,
                    value: value,
                };
                tableRow.push(cellData);
            }
            tableData.push({
                objectData: {
                    key: data,
                },
                tableRow: tableRow,
            });
        }
        return tableData;
    }

    protected getColumnDetails(subTableType: X, columnType: TableColumnDetailsEnum): ColumnDetail {
        const tableColumnEnums: Set<TableColumnDetailsEnum> = this.getAllSubTableColumnsAsSet(subTableType);
        if (!tableColumnEnums.has(columnType)) {
            throw new Error('Error with table structure');
        }
        return columnDetails[columnType];

    }

    protected getAllSubTableColumnsAsSet(subTableType: X): Set<TableColumnDetailsEnum> {
        return new Set(this.getAllSubTableColumns(subTableType));
    }

    abstract getAllSubTableColumns(subTableType: X): TableColumnDetailsEnum[];

    abstract getColumnValue(subTableType: X, item: Y, columnType: TableColumnDetailsEnum): PrimitiveType;

    abstract getDefaultTableType(): X;

}