import {
    AgentResponseDTO,
    AgentType,
    ColumnDetail,
    InputType,
    PrimitiveType,
    TableType,
    ValidationValue
} from "@realestatemanager/types";
import { Utility } from "@realestatemanager/utilities";
import { isValidEmail, isValidPhoneNumber } from "../../constants/Constant";

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
            agent.firstName = newValue === undefined ? "" : newValue.toString();
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: false,
                    message: 'Must have a first name'
                };
            }
            return {
                isValid: true
            }
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
            agent.lastName = newValue === undefined ? "" : newValue.toString();
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: false,
                    message: 'Must have a last name'
                };
            }
            return {
                isValid: true
            }
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
            agent.fullName = newValue === undefined ? "" : newValue.toString();
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: false,
                    message: 'Must have a full name'
                };
            }
            return {
                isValid: true
            }
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
            agent.website = newValue === undefined ? "" : newValue.toString();
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
            agent.companyName = newValue === undefined ? "" : newValue.toString();
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
            agent.phoneNumber = newValue === undefined ? "" : newValue.toString();
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: false,
                    message: 'Must have a phone number'
                };
            }
            if (!isValidPhoneNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid phone number format'
                };
            }
            return {
                isValid: true
            }
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
            agent.email = newValue === undefined ? "" : newValue.toString();
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            if (newValue === undefined || newValue.toString().length === 0) {
                return {
                    isValid: false,
                    message: 'Must have an email'
                };
            }
            if (!isValidEmail(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid email format'
                };
            }
            return {
                isValid: true
            }
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
            const errorMsg = 'CreationType cannot be undefined';
            if (newValue === undefined) {
                throw new Error(errorMsg);
            }
            const agentTypeEnum: AgentType | undefined = Utility.getEnumValue(
                AgentType,
                newValue.toString()
            );
            if (agentTypeEnum === undefined) {
                throw new Error(errorMsg);
            }
            agent.agentType = agentTypeEnum;
        },
    },
};
