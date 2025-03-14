import { Test, TestingModule } from '@nestjs/testing';
import { CalcController } from '../../src/realestatecalc/controllers/calc.controller';

describe('CalcController', () => {
    let controller: CalcController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CalcController],
        }).compile();

        controller = module.get<CalcController>(CalcController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
