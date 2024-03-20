import { AgentType, AgentsDTO, Country, State } from "@realestatemanager/shared";
import { IDTOConvertible } from "src/realestatecalc/models/idtoconvertible.model";

export class Agent implements IDTOConvertible<AgentsDTO> {

    private firstName: string;
    private lastName: string;
    private companyName: string;
    private phoneNumber: string;
    private state: State;
    private country: Country;
    private agentType: AgentType;

    constructor(
        firstName: string,
        lastName: string,
        phoneNumber: string,
        state: State,
        country: Country,
        agentType: AgentType) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.state = state;
        this.country = country;
        this.agentType = agentType;
    }

    getFullName(): string {
        return `${this.firstName}' '${this.lastName}`;
    }

    toDTO(): AgentsDTO {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: this.getFullName(),
            companyName: this.companyName,
            phoneNumber: this.phoneNumber,
            state: this.state,
            country: this.country,
            agentType: this.agentType,
        };
    }

}