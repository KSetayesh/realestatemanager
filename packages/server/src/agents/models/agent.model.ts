import { AgentResponseDTO, AgentType, Country, State } from "@realestatemanager/shared";
import { IDTOConvertible } from "src/realestatecalc/models/idtoconvertible.model";
import { Entity } from "src/shared/entity";

export class Agent extends Entity implements IDTOConvertible<AgentResponseDTO> {

    private _firstName: string;
    private _lastName: string;
    private _website: string;
    private _companyName: string;
    private _phoneNumber: string;
    private _email: string;
    private _state: State;
    private _country: Country;
    private _agentType: AgentType;

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        website: string,
        companyName: string,
        phoneNumber: string,
        email: string,
        state: State,
        country: Country,
        agentType: AgentType
    ) {
        super(id);
        this._firstName = firstName;
        this._lastName = lastName;
        this._website = website;
        this._companyName = companyName;
        this._phoneNumber = phoneNumber;
        this._email = email;
        this._state = state;
        this._country = country;
        this._agentType = agentType;
    }

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    get website(): string {
        return this._website;
    }

    get companyName(): string {
        return this._companyName;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    get email(): string {
        return this._email;
    }

    get state(): State {
        return this._state;
    }

    get country(): Country {
        return this._country;
    }

    get agentType(): AgentType {
        return this._agentType;
    }

    toDTO(): AgentResponseDTO {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: this.fullName,
            website: this.website,
            companyName: this.companyName,
            phoneNumber: this.phoneNumber,
            email: this.email,
            state: this.state,
            country: this.country,
            agentType: this.agentType,
        };
    }

}