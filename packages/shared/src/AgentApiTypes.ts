import { Country, State } from "./Constants";

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
    website?: string;
    companyName: string;
    phoneNumber: string;
    email: string;
    state: State;
    country: Country;
    agentType: AgentType;
};