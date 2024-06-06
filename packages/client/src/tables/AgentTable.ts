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
                data: (data: AgentResponseDTO): TableRow => {
                    return data;
                },
            },
        };
    }

    getDefaultColumns(): TableColumn[] {
        return agentDefaultColumns;
    }

}