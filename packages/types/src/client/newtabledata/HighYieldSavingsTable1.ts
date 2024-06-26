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

    protected getAllSubTableColumns(subTableType?: DefaultTableType): TableColumnDetailsEnum[] {
        if (!subTableType) {
            return this.subTables[this.getDefaultTableType()];
        }
        return this.subTables[subTableType];
    }

    getDefaultTableType(): DefaultTableType {
        return DefaultTableType.DEFAULT;
    }

    getColumnValue(
        subTableType: DefaultTableType,
        item: HighYeildSavingsResponseDTO,
        columnType: TableColumnDetailsEnum
    ): PrimitiveType {
        const tableColumn: TableColumn = this.getColumnDetails(subTableType, columnType);
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.HIGH_YIELD_SAVINGS_TABLE]) {
            const { value } = columnDetail[TableType.HIGH_YIELD_SAVINGS_TABLE]!;
            return value(item);
        }
        throw new Error(`Column ${columnType} does not have a value function for ${TableType.HIGH_YIELD_SAVINGS_TABLE}`);
    }


}