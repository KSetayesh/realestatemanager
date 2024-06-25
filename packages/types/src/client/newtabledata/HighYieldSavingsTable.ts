import { HighYeildSavingsResponseDTO } from "../../server/HighYieldSavingsApiTypes";
import { TableColumnDetailsEnum } from "../tabledata/TableColumnConfig";
import { DefaultTableType, TableType } from "../tabledata/TableConfig";
import { ColumnDetail, PrimitiveType } from "../types/ClientTypes";
import { AbstractTable } from "./AbstractTable";

export class HighYieldSavingsTable extends AbstractTable<
    TableType.HIGH_YIELD_SAVINGS_TABLE,
    HighYeildSavingsResponseDTO,
    DefaultTableType
> { 

    getAllSubTableColumns(subTableType: DefaultTableType): TableColumnDetailsEnum[] {
        return this.subTables[subTableType];
    }

    getColumnValue(
        subTableType: DefaultTableType,
        item: HighYeildSavingsResponseDTO,
        columnType: TableColumnDetailsEnum
    ): PrimitiveType {
        const columnDetail: ColumnDetail = this.getColumnDetails(subTableType, columnType);
        if (columnDetail[TableType.HIGH_YIELD_SAVINGS_TABLE]) {
            const { value } = columnDetail[TableType.HIGH_YIELD_SAVINGS_TABLE]!;
            return value(item);
        }
        throw new Error(`Column ${columnType} does not have a value function for AGENT_TABLE`);
    }


}