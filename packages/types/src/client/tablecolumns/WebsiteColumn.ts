import { AgentResponseDTO } from "../../server/AgentApiTypes";
import { TableType } from "../tabledata/TableColumnConfig";
import { ColumnDetail, InputType, PrimitiveType } from "../types/ClientTypes";

export const WebsiteColumn: ColumnDetail = {
    title: "Website",
    accessor: "website",
    inputType: InputType.STRING,
    isUrl: true,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.AGENT_TABLE]: {
        value: (agent: AgentResponseDTO): PrimitiveType => {
            return agent.website;
        }
    },
};