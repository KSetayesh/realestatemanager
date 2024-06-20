import { InputType, SortDirection } from "../../../types/ClientTypes";

export abstract class TableColumn<Y, T extends string> {
    private _showColumn: boolean;
    private _isEditable: boolean;
    private _isSortable: boolean;
    private _detailedDescription?: string;

    constructor(
        showColumn: boolean,
        isEditable: boolean,
        isSortable: boolean,
        detailedDescription?: string,
    ) {
        this._showColumn = showColumn;
        this._isEditable = isEditable;
        this._isSortable = isSortable;
        this._detailedDescription = detailedDescription;
    }

    protected abstract _sort(list: Y[], sortDirection: SortDirection): Y[];

    protected abstract value(list: Y): number | string | boolean;

    protected abstract _title: string;

    protected abstract _accessor: T;

    protected abstract _inputType: InputType;

    protected abstract _isUrl: boolean;

    protected abstract _isDollarAmount: boolean;

    protected abstract _addSuffix: string;

    protected genericSort(
        aValue: number | string | boolean,
        bValue: number | string | boolean,
        sortDirection: SortDirection
    ): number {
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
    }

    protected _isValidEdit(value: string): boolean {
        throw new Error("Method not implemented.");
    }

    sort(list: Y[], sortDirection: SortDirection): Y[] {
        if (!this.isSortable) {
            return list;
        }
        this._sort(list, sortDirection);
    }

    isValidEdit(value: string): boolean {
        if (!this.isEditable) {
            return false;
        }
        this._isValidEdit(value);
    }

    get title(): string {
        return this._title;
    }

    get accessor(): T {
        return this._accessor;
    }

    get inputType(): InputType {
        return this._inputType;
    }

    get isUrl(): boolean {
        return this._isUrl;
    }

    get isDollarAmount(): boolean {
        return this._isDollarAmount;
    }

    get addSuffix(): string {
        return this._addSuffix;
    }

    get showColumn(): boolean {
        return this._showColumn;
    }

    get isEditable(): boolean {
        return this._isEditable;
    }

    get isSortable(): boolean {
        return this._isSortable;
    }

    get detailedDescription(): string {
        return this._detailedDescription;
    }

}