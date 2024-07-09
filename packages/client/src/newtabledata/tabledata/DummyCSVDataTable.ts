import {
    ColumnDetail,
    DefaultTableType,
    DummyCSVDataType,
    PrimitiveType,
    TableColumnDetailsEnum,
    TableType
} from "@realestatemanager/types";
import { AbstractTable, TableColumn } from "./AbstractTable";

export class DummyCSVDataTable extends AbstractTable<TableType.DUMMY_CSV_DATA_TABLE, DummyCSVDataType, DefaultTableType> {

    constructor() {
        super(TableType.DUMMY_CSV_DATA_TABLE);
    }

    getDefaultTableType(): DefaultTableType {
        return DefaultTableType.DEFAULT;
    }

    protected _getAllSubTableColumns(subTableType: DefaultTableType): TableColumnDetailsEnum[] {
        return this.subTables[subTableType];
    }

    protected getColumnValue(
        item: DummyCSVDataType,
        tableColumn: TableColumn,
    ): PrimitiveType {
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.DUMMY_CSV_DATA_TABLE]) {
            const { value } = columnDetail[TableType.DUMMY_CSV_DATA_TABLE]!;
            return value(item);
        }
        throw new Error(`Column ${tableColumn.columnKey} does not have a value function for ${TableType.DUMMY_CSV_DATA_TABLE}`);
    }

    protected setColumnValue(
        item: DummyCSVDataType,
        newValue: PrimitiveType,
        tableColumn: TableColumn,
    ): void {
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.DUMMY_CSV_DATA_TABLE]) {
            const { setValue } = columnDetail[TableType.DUMMY_CSV_DATA_TABLE];
            if (setValue) {
                setValue(item, newValue);
                return;
            }
        }
        throw new Error(`Column ${tableColumn.columnKey} does not have a setValue function for ${TableType.DUMMY_CSV_DATA_TABLE}`);
    }

}