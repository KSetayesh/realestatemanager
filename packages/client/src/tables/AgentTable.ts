import { AgentResponseDTO, CreateUpdateAgentRequest } from "@realestatemanager/types";
import { AbstractTable, TablesConfig } from "./AbstractTable";
import { TableColumn, TableDataItem, TableRow } from "../components/ReusableTable";
import { agentDefaultColumns } from "./columns/AgentColumns";
import { DefaultTableType } from "../constants/Constant";

export class AgentTable extends AbstractTable<AgentResponseDTO, DefaultTableType> {

    getDefaultTableType(): DefaultTableType {
        return DefaultTableType.DEFAULT;
    }

    getTablesConfig(): TablesConfig<AgentResponseDTO> {
        return {
            [DefaultTableType.DEFAULT]: {
                columns: this.getDefaultColumns(),
                data: (data: AgentResponseDTO): TableRow => {
                    return data;
                },
            },
        };
    }

    getDefaultColumns(): TableColumn[] {
        return agentDefaultColumns;
    }

    createUpdateAgentRequest(tableDataItem: TableDataItem<AgentResponseDTO>): CreateUpdateAgentRequest {
        const agent: AgentResponseDTO = tableDataItem.objectData.key;
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