import { Agent, AgentResponseDTO } from "@realestatemanager/types";
import { Transformer } from "../transformer";

export class AgentDataTransformer implements Transformer<AgentResponseDTO, Agent> {

    toClient(agentDTO: AgentResponseDTO): Agent {
        return { ...agentDTO };
    }

    toClientArray(agentDTOs: AgentResponseDTO[]): Agent[] {
        return agentDTOs.map(agentDTO => this.toClient(agentDTO));
    }

}