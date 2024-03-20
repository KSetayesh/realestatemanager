import { Country, State } from "./ApiTypes";

export enum AgentType {
    REAL_ESTATE_AGENT = "Real Estate Agent",
    LENDER = "Lender",
    PROPERTY_MANAGER = "Property Manager",
    CONTRACTOR = "Contractor",
};

export interface AgentsDTO {
    firstName: string;
    lastName: string;
    fullName?: string;
    companyName: string;
    phoneNumber: string;
    state: State;
    country: Country;
    agentType: AgentType;
};