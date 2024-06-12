import { Test, TestingModule } from '@nestjs/testing';
import { PropertyTransactionService } from 'src/modules/realestatecalc/services/property.transaction.service';


describe('PropertyTransactionService', () => {
    let service: PropertyTransactionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PropertyTransactionService],
        }).compile();

        service = module.get<PropertyTransactionService>(PropertyTransactionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
