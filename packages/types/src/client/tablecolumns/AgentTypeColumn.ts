import { AgentResponseDTO } from "../../server/AgentApiTypes";
import { TableType, sort } from "../tabledata/TableColumnConfig";
import { ColumnDetail, InputType, PrimitiveType } from "../types/ClientTypes";

export const AgentTypeColumn: ColumnDetail = {
    title: "Agent Type",
    accessor: "agentType",
    inputType: InputType.STRING,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.AGENT_TABLE]: {
        value: (agent: AgentResponseDTO): PrimitiveType => {
            return agent.agentType;
        }
    },
};
