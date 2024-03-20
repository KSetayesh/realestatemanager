import { Body, Controller, Get, Post } from "@nestjs/common";
import { AgentService } from "../services/agent.services";
import { AgentsDTO } from '@realestatemanager/shared';

@Controller('agents')
export class AgentController {

    constructor(private readonly calcService: AgentService) { }

    @Get()
    async getAllAgents(): Promise<AgentsDTO[]> {
        return this.calcService.getAllAgents();
    }

    @Post('addNewAgent')
    async addNewAgent(
        @Body() agent: AgentsDTO
    ): Promise<void> {
        console.log('agent:', agent);
        await this.calcService.addNewAgent(agent);
    }

}