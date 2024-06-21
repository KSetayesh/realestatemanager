import { TableColumnDetailsEnum } from "../tabledata/TableTitles";
import { InputType, SortDirection } from "./ClientTypes";
import { SortFunction, TableType, TableTypeSpecific, ValueFunction, ValueType, columnDetails } from "./TableColumnConfig";

export class TableColumn<T extends TableType> {

    private _tableType: T;
    private tableColumnDetail: TableColumnDetailsEnum;
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

    sort(list: TableTypeSpecific<T>[], sortDirection: SortDirection = SortDirection.ASCENDING): TableTypeSpecific<T>[] {
        const sortFunction: SortFunction<T> = columnDetails[this.tableColumnDetail][this._tableType].sortFunction as SortFunction<T>;
        return sortFunction(list, sortDirection) as TableTypeSpecific<T>[];
    }

    value(item: TableTypeSpecific<T>): ValueType | void {
        const valueFunction: ValueFunction<T> = columnDetails[this.tableColumnDetail][this._tableType].value as ValueFunction<T>;
        return valueFunction(item);
    }

}
