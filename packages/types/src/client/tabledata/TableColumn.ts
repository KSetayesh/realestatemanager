import { InputType, SortDirection, TableTypeDetails, TableTypeSpecific, PrimitiveType } from "../types/ClientTypes";
import {
    TableColumnDetailsEnum,
    TableType,
    columnDetails
} from "./TableColumnConfig";

export abstract class TableColumn<T extends TableType> {

    private _tableType: T;
    protected tableColumnDetail: TableColumnDetailsEnum;
    private overrideShowColumn?: boolean;
    private overrideIsEditable?: boolean;
    private overrideIsSortable?: boolean;
    private overrideDetailedDescription?: string;

    constructor(
        tableType: T,
        tableColumnDetail: TableColumnDetailsEnum,
        overrideShowColumn?: boolean,
        overrideIsEditable?: boolean,
        overrideIsSortable?: boolean,
        overrideDetailedDescription?: string
    ) {
        this._tableType = tableType;
        this.tableColumnDetail = tableColumnDetail;
        this.overrideShowColumn = overrideShowColumn;
        this.overrideIsEditable = overrideIsEditable;
        this.overrideIsSortable = overrideIsSortable;
        this.overrideDetailedDescription = overrideDetailedDescription;
    }

    protected abstract getTableTypeDetails(): TableTypeDetails<T>;

    abstract sort(list: TableTypeSpecific<T>[], sortDirection: SortDirection): TableTypeSpecific<T>[];

    abstract value(item: TableTypeSpecific<T>): PrimitiveType;

    get tableType(): T {
        return this._tableType;
    }

    get title(): string {
        return columnDetails[this.tableColumnDetail].title;
    }

    get accessor(): string {
        return columnDetails[this.tableColumnDetail].accessor;
    }

    get inputType(): InputType {
        return columnDetails[this.tableColumnDetail].inputType;
    }

    get isUrl(): boolean {
        return columnDetails[this.tableColumnDetail].isUrl;
    }

    get isDollarAmount(): boolean {
        return columnDetails[this.tableColumnDetail].isDollarAmount;
    }

    get addSuffix(): string {
        return columnDetails[this.tableColumnDetail].addSuffix;
    }

    get showColumn(): boolean {
        if (this.overrideShowColumn === undefined) {
            return columnDetails[this.tableColumnDetail].showColumn;
        }
        return this.overrideShowColumn;
    }

    get isEditable(): boolean {
        if (this.overrideIsEditable === undefined) {
            return columnDetails[this.tableColumnDetail].isEditable;
        }
        return this.overrideIsEditable;
    }

    get isSortable(): boolean {
        if (this.overrideIsSortable === undefined) {
            return columnDetails[this.tableColumnDetail].isSortable;
        }
        return this.overrideIsSortable;
    }

    get detailedDescription(): string {
        if (this.overrideDetailedDescription === undefined) {
            return columnDetails[this.tableColumnDetail].detailedDescription;
        }
        return this.overrideDetailedDescription;
    }

}
