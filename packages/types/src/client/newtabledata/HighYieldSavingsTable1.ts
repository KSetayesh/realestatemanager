import { HighYeildSavingsResponseDTO } from "../../server/HighYieldSavingsApiTypes";
import { TableColumnDetailsEnum } from "../tabledata/TableColumnConfig";
import { ColumnDetail, DefaultTableType, PrimitiveType, TableType } from "../types/ClientTypes";
import { AbstractTable1, TableColumn } from "./AbstractTable1";

export class HighYieldSavingsTable1 extends AbstractTable1<
    TableType.HIGH_YIELD_SAVINGS_TABLE,
    HighYeildSavingsResponseDTO,
    DefaultTableType
> {

    constructor() {
        super(TableType.HIGH_YIELD_SAVINGS_TABLE);
    }

    getDefaultTableType(): DefaultTableType {
        return DefaultTableType.DEFAULT;
    }

    protected _getAllSubTableColumns(subTableType: DefaultTableType): TableColumnDetailsEnum[] {
        return this.subTables[subTableType];
    }


    protected getColumnValue(
        item: HighYeildSavingsResponseDTO,
        tableColumn: TableColumn,
    ): PrimitiveType {
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.HIGH_YIELD_SAVINGS_TABLE]) {
            const { value } = columnDetail[TableType.HIGH_YIELD_SAVINGS_TABLE]!;
            return value(item);
        }
        throw new Error(`Column ${tableColumn.columnKey} does not have a value function for ${TableType.HIGH_YIELD_SAVINGS_TABLE}`);
    }

    protected setColumnValue(
        item: HighYeildSavingsResponseDTO,
        newValue: PrimitiveType,
        tableColumn: TableColumn,
    ): void {
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.HIGH_YIELD_SAVINGS_TABLE]) {
            const { setValue } = columnDetail[TableType.HIGH_YIELD_SAVINGS_TABLE];
            if (setValue) {
                setValue(item, newValue);
                return;
            }
        }
        throw new Error(`Column ${tableColumn.columnKey} does not have a setValue function for ${TableType.HIGH_YIELD_SAVINGS_TABLE}`);
    }


}