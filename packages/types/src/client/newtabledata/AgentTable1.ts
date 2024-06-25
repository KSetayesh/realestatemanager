import { AgentResponseDTO } from "../../server/AgentApiTypes";
import { TableColumnDetailsEnum } from "../tabledata/TableColumnConfig";
import { DefaultTableType, TableType } from "../tabledata/TableConfig";
import { ColumnDetail, PrimitiveType } from "../types/ClientTypes";
import { AbstractTable1 } from "./AbstractTable1";

export class AgentTable1 extends AbstractTable1<TableType.AGENT_TABLE, AgentResponseDTO, DefaultTableType> {

    getDefaultTableType(): DefaultTableType {
        return DefaultTableType.DEFAULT;
    }

    getAllSubTableColumns(subTableType: DefaultTableType): TableColumnDetailsEnum[] {
        return this.subTables[subTableType];
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