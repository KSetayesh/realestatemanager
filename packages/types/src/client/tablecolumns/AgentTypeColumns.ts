import { AgentResponseDTO } from "../../server/AgentApiTypes";
import { TableType } from "../tabledata/TableConfig";
import { ColumnDetail, InputType, PrimitiveType } from "../types/ClientTypes";

export const FirstNameColumn: ColumnDetail = {
    title: "First Name",
    accessor: "firstName",
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
            return agent.firstName;
        }
    },
};

export const LastNameColumn: ColumnDetail = {
    title: "Last Name",
    accessor: "lastName",
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
            return agent.lastName;
        }
    },
};

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

export const CompanyNameColumn: ColumnDetail = {
    title: "Company Name",
    accessor: "companyName",
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
            return agent.companyName;
        }
    },
};

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

export const EmailColumn: ColumnDetail = {
    title: "Email",
    accessor: "email",
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
            return agent.email;
        }
    },
};

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
