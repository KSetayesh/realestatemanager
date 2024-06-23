import { AgentResponseDTO } from "../../server/AgentApiTypes";
import { TableType } from "../tabledata/TableColumnConfig";
import { ColumnDetail, InputType, PrimitiveType } from "../types/ClientTypes";

export const PhoneNumberColumn: ColumnDetail = {
    title: "Phone Number",
    accessor: "phoneNumber",
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
            return agent.phoneNumber;
        }
    },
};