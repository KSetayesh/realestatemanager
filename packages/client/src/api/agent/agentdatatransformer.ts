import { AgentResponseDTO } from "@realestatemanager/types";
import { Transformer } from "../transformer";

export class AgentDataTransformer implements Transformer<AgentResponseDTO, AgentResponseDTO> {

    toClient(agentDTO: AgentResponseDTO): AgentResponseDTO {
        return agentDTO;
    }

    toClientArray(agentDTOs: AgentResponseDTO[]): AgentResponseDTO[] {
        return agentDTOs;
    }

}