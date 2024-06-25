import { AgentResponseDTO } from "../../server/AgentApiTypes";
import { TableColumnDetailsEnum } from "../tabledata/TableColumnConfig";
import { DefaultTableType, TableType } from "../tabledata/TableConfig";
import { ColumnDetail, PrimitiveType } from "../types/ClientTypes";
import { AbstractTable } from "./AbstractTable";

export class AgentTable extends AbstractTable<TableType.AGENT_TABLE, AgentResponseDTO, DefaultTableType> {

    getAllSubTableColumns(subTableType: DefaultTableType): Set<TableColumnDetailsEnum> {
        const tableColumnsTypes: TableColumnDetailsEnum[] = this.subTables[subTableType];
        return new Set(tableColumnsTypes);
    }

    getColumnValue(
        subTableType: DefaultTableType,
        item: AgentResponseDTO,
        columnType: TableColumnDetailsEnum
    ): PrimitiveType {
        const columnDetail: ColumnDetail = this.getColumnDetails(subTableType, columnType);
        if (columnDetail[TableType.AGENT_TABLE]) {
            const { value } = columnDetail[TableType.AGENT_TABLE]!;
            return value(item);
        }
        throw new Error(`Column ${columnType} does not have a value function for AGENT_TABLE`);
    }


}