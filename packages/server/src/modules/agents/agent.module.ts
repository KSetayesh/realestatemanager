import { Module, forwardRef } from '@nestjs/common';
import { AgentService } from './services/agent.services';
import { AgentController } from './controllers/agent.controller';
import { AgentManager } from 'src/db/realestate/dbmanager/agent.manager';
import { AgentDAO } from 'src/db/realestate/dao/agent.dao';
import applicationConfig from 'src/config/applicationConfig';
import { AppModule } from '../app.module';

@Module({
    imports: [forwardRef(() => AppModule)],  // Ensure AppModule is imported using forwardRef to avoid circular dependency
    controllers: [AgentController],
    providers: [
        AgentService,
        AgentDAO,
        {
            provide: AgentManager,
            useFactory: (agentDAO: AgentDAO) => {
                const commit: boolean = applicationConfig.commit;
                return new AgentManager(agentDAO, commit);
            },
            inject: [AgentDAO],
        },
    ],
})
export class AgentModule { }
