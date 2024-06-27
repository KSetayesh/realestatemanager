import { AgentResponseDTO } from "../../server/AgentApiTypes";
import { TableColumnDetailsEnum } from "../tabledata/TableColumnConfig";
import { ColumnDetail, DefaultTableType, PrimitiveType, TableType, TableTypeMapping } from "../types/ClientTypes";
import { AbstractTable1, TableColumn } from "./AbstractTable1";

export class AgentTable1 extends AbstractTable1<TableType.AGENT_TABLE, AgentResponseDTO, DefaultTableType> {

    constructor() {
        super(TableType.AGENT_TABLE);
    }

    protected _getAllSubTableColumns(subTableType?: DefaultTableType): TableColumnDetailsEnum[] {
        if (!subTableType) {
            return this.subTables[this.getDefaultTableType()];
        }
        return this.subTables[subTableType];
    }

    getDefaultTableType(): DefaultTableType {
        return DefaultTableType.DEFAULT;
    }

    protected getColumnValue(
        subTableType: DefaultTableType,
        item: AgentResponseDTO,
        columnType: TableColumnDetailsEnum
    ): PrimitiveType {
        const tableColumn: TableColumn = this.getColumnDetails(subTableType, columnType);
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.AGENT_TABLE]) {
            const { value } = columnDetail[TableType.AGENT_TABLE]!;
            return value(item);
        }
        throw new Error(`Column ${columnType} does not have a value function for ${TableType.AGENT_TABLE}`);
    }

}