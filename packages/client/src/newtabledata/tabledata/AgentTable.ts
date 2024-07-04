import { AgentResponseDTO, ColumnDetail, CreateUpdateAgentRequest, DefaultTableType, PrimitiveType, TableColumn, TableColumnDetailsEnum, TableType } from "@realestatemanager/types";
import { AbstractTable } from "./AbstractTable";

export class AgentTable extends AbstractTable<TableType.AGENT_TABLE, AgentResponseDTO, DefaultTableType> {

    constructor() {
        super(TableType.AGENT_TABLE);
    }

    getDefaultTableType(): DefaultTableType {
        return DefaultTableType.DEFAULT;
    }

    protected _getAllSubTableColumns(subTableType: DefaultTableType): TableColumnDetailsEnum[] {
        return this.subTables[subTableType];
    }

    protected getColumnValue(
        item: AgentResponseDTO,
        tableColumn: TableColumn,
    ): PrimitiveType {
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.AGENT_TABLE]) {
            const { value } = columnDetail[TableType.AGENT_TABLE]!;
            return value(item);
        }
        throw new Error(`Column ${tableColumn.columnKey} does not have a value function for ${TableType.AGENT_TABLE}`);
    }

    protected setColumnValue(
        item: AgentResponseDTO,
        newValue: PrimitiveType,
        tableColumn: TableColumn,
    ): void {
        const columnDetail: ColumnDetail = tableColumn.columnDetails;
        if (columnDetail[TableType.AGENT_TABLE]) {
            const { setValue } = columnDetail[TableType.AGENT_TABLE];
            if (setValue) {
                setValue(item, newValue);
                return;
            }
        }
        throw new Error(`Column ${tableColumn.columnKey} does not have a setValue function for ${TableType.AGENT_TABLE}`);
    }

    createUpdateAgentRequest(agent: AgentResponseDTO): CreateUpdateAgentRequest {
        return {
            id: agent.id,
            firstName: agent.firstName,
            lastName: agent.lastName,
            website: agent.website,
            companyName: agent.companyName,
            phoneNumber: agent.phoneNumber,
            email: agent.email,
        };
    }


}