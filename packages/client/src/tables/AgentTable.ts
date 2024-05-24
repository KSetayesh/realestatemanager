import { AgentResponseDTO } from "@realestatemanager/shared";
import { DefaultTableType } from "../pages/AgentsList";
import { AbstractTable } from "./AbstractTable";
import { TableColumn, TableDataItem, TableRow } from "../components/ReusableTable";
import { TablesConfig } from "../pages/InvestmentBreakdown";
import { agentDefaultColumns } from "./columns/AgentColumns";

export class AgentTable implements AbstractTable<AgentResponseDTO, DefaultTableType, AgentResponseDTO> {

    getTableData(listOfData: AgentResponseDTO[], tableType: DefaultTableType): TableDataItem<AgentResponseDTO>[] {
        const tablesConfig = this.getTablesConfig();
        return listOfData.map(data => ({
            objectData: {
                key: data,
            },
            rowData: tablesConfig[tableType].data(data),
        }));
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