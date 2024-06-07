import {
    AgentType,
    Country,
    CreateUpdateAgentRequest,
    State
} from "@realestatemanager/shared";
import { Agent } from "../models/agent.model";
import { BuilderInterface } from "src/builder.interface";

export class AgentBuilder implements BuilderInterface<Agent> {
    private agent: Agent;
    private updateAgentRequest: CreateUpdateAgentRequest;

    constructor(
        agent: Agent,
        updateAgentRequest: CreateUpdateAgentRequest,
    ) {
        this.agent = agent;
        this.updateAgentRequest = updateAgentRequest;
    }

    build(): Agent {
        return new Agent(
            this.id,
            this.firstName,
            this.lastName,
            this.website,
            this.companyName,
            this.phoneNumber,
            this.email,
            this.state,
            this.country,
            this.agentType,
        );
    }

    private get id(): number {
        return this.agent.id;
    }

    private get firstName(): string {
        return this.updateAgentRequest.firstName ?? this.agent.firstName;
    }

    private get lastName(): string {
        return this.updateAgentRequest.lastName ?? this.agent.lastName;
    }

    private get website(): string {
        return this.updateAgentRequest.website ?? this.agent.website;
    }

    private get companyName(): string {
        return this.updateAgentRequest.companyName ?? this.agent.companyName;
    }

    private get phoneNumber(): string {
        return this.updateAgentRequest.phoneNumber ?? this.agent.phoneNumber;
    }

    private get email(): string {
        return this.updateAgentRequest.email ?? this.agent.email;
    }

    private get state(): State {
        return this.agent.state;
    }

    private get country(): Country {
        return this.agent.country;
    }

    private get agentType(): AgentType {
        return this.agent.agentType;
    }

}