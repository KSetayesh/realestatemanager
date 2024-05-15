import { Body, Controller, Post } from "@nestjs/common";
import { HighYieldSavingsCalcService } from "../services/highyieldsavings.calc.service";
import { HighYeildSavingsResponseDTO, HighYeildSavingsRequest } from "@realestatemanager/shared";

@Controller('highyieldsavingscalc')
export class HighYieldSavingsCalcController {

    constructor(private readonly calcService: HighYieldSavingsCalcService) { }

    @Post('calculate')
    async calculate(
        @Body() highYeildSavingsRequest: HighYeildSavingsRequest,
    ): Promise<HighYeildSavingsResponseDTO[]> {
        return this.calcService.calculateFutureValueByMonth(highYeildSavingsRequest);
    }

}