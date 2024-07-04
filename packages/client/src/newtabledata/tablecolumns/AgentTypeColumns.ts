import { AgentResponseDTO, AgentType } from "../../server/AgentApiTypes";
import { ColumnDetail, InputType, PrimitiveType, TableType } from "../types/ClientTypes";
import { Utility } from "@realestatemanager/utilities";

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
        },
        setValue: (agent: AgentResponseDTO, newValue: PrimitiveType): void => {
            agent.firstName = newValue.toString();
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
        },
        setValue: (agent: AgentResponseDTO, newValue: PrimitiveType): void => {
            agent.lastName = newValue.toString();
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
        },
        setValue: (agent: AgentResponseDTO, newValue: PrimitiveType): void => {
            agent.fullName = newValue.toString();
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
        },
        setValue: (agent: AgentResponseDTO, newValue: PrimitiveType): void => {
            agent.website = newValue.toString();
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
        },
        setValue: (agent: AgentResponseDTO, newValue: PrimitiveType): void => {
            agent.companyName = newValue.toString();
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
        },
        setValue: (agent: AgentResponseDTO, newValue: PrimitiveType): void => {
            agent.phoneNumber = newValue.toString();
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
        },
        setValue: (agent: AgentResponseDTO, newValue: PrimitiveType): void => {
            agent.email = newValue.toString();
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
        },
        setValue: (agent: AgentResponseDTO, newValue: PrimitiveType): void => {
            agent.agentType = Utility.getEnumValue(AgentType, newValue.toString());
        }
    },
};
