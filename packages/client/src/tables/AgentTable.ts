import { AgentResponseDTO } from "@realestatemanager/shared";
import { AbstractTable, TablesConfig } from "./AbstractTable";
import { TableColumn, TableRow } from "../components/ReusableTable";
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
                data: (agent: AgentResponseDTO): TableRow => {
                    return this.createRowData(agent);
                },
            },
        };
    }

    getDefaultColumns(): TableColumn[] {
        return agentDefaultColumns;
    }

    private createRowData(agent: AgentResponseDTO) {
        return {
            firstName: agent.firstName,
            lastName: agent.lastName,
            fullName: agent.fullName,
            website: agent.website,
            companyName: agent.companyName,
            phoneNumber: agent.phoneNumber,
            email: agent.email,
            country: agent.country,
            state: agent.state,
            agentType: agent.agentType,
        };
    }

}