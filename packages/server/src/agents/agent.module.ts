import { Module } from '@nestjs/common';
import { AgentService } from './services/agent.services';
import { AgentController } from './controllers/agent.controller';

@Module({
    controllers: [AgentController],
    providers: [AgentService]
})
export class AgentModule { }
