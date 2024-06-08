import { Body, Controller, Get, Post } from "@nestjs/common";
import { AgentService } from "../services/agent.services";
import { AgentResponseDTO, CreateAgentRequest, CreateUpdateAgentRequest } from '@realestatemanager/shared';

@Controller('agents')
export class AgentController {

    constructor(private readonly agentService: AgentService) { }

    @Get()
    async getAllAgents(): Promise<AgentResponseDTO[]> {
        return this.agentService.getAllAgents();
    }

    @Post('addNewAgent')
    async addNewAgent(
        @Body() agent: CreateAgentRequest
    ): Promise<void> {
        console.log('agent:', agent);
        await this.agentService.addNewAgent(agent);
    }

    @Post('updateAgent')
    async updateAgent(
        @Body() createUpdateAgentRequest: CreateUpdateAgentRequest,
    ): Promise<AgentResponseDTO> {
        console.log('createUpdateAgentRequest:', createUpdateAgentRequest);
        return this.agentService.updateAgent(createUpdateAgentRequest);
    }

}