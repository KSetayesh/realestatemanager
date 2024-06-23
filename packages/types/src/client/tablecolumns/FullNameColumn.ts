import { AgentResponseDTO } from "../../server/AgentApiTypes";
import { TableType } from "../tabledata/TableColumnConfig";
import { ColumnDetail, InputType, PrimitiveType } from "../types/ClientTypes";

export const FullNameColumn: ColumnDetail = {
    title: "Full Name",
    accessor: "fullName",
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
            return agent.fullName;
        }
    },
};