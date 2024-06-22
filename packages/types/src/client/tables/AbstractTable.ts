import { TableType } from "../tabledata/TableColumnConfig";
import { TableDetailType, tableDetails, } from "../tabledata/TableConfig";

export class AbstractTable<T> {
    private _title: string;
    private _tableType: TableType;
    private _isEditable: boolean;
    private _canDeleteFromTable: boolean;
    private _isSortable: boolean;
    private _pageable: boolean;
    private _columns: any[];
    private _data: T[];

    constructor(tableType: TableType, columns: any[], data: T[]) {
        this._tableType = tableType;
        const tableDetail: TableDetailType = tableDetails[this.tableType];
        this._title = tableDetail.title;
        this._isEditable = tableDetail.isEditable;
        this._canDeleteFromTable = tableDetail.canDeleteFromTable;
        this._isSortable = tableDetail.isSortable;
        this._pageable = tableDetail.pageable;
        this._columns = columns;
        this._data = data;
    }

    get title(): string {
        return this._title;
    }

    get tableType(): TableType {
        return this._tableType;
    }

    get isEditable(): boolean {
        return this._isEditable;
    }

    get canDeleteFromTable(): boolean {
        return this._canDeleteFromTable;
    }

    get isSortable(): boolean {
        return this._isSortable;
    }

    get pageable(): boolean {
        return this._pageable;
    }

    get data(): T[] {
        return this._data;
    }

    get coluns(): any[] {
        return this._columns;
    }


}