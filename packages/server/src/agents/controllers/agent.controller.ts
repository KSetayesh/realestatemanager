import { Body, Controller, Get, Post } from "@nestjs/common";
import { AgentService } from "../services/agent.services";
import { AgentResponseDTO, CreateAgentRequest } from '@realestatemanager/shared';

@Controller('agents')
export class AgentController {

    constructor(private readonly calcService: AgentService) { }

    @Get()
    async getAllAgents(): Promise<AgentResponseDTO[]> {
        return this.calcService.getAllAgents();
    }

    @Post('addNewAgent')
    async addNewAgent(
        @Body() agent: CreateAgentRequest
    ): Promise<void> {
        console.log('agent:', agent);
        await this.calcService.addNewAgent(agent);
    }

}