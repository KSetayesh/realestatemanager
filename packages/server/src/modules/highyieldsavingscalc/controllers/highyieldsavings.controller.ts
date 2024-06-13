import { Body, Controller, Post } from "@nestjs/common";
import { HighYieldSavingsCalcService } from "../services/highyieldsavings.calc.service";
import { HighYeildSavingsResponseDTO, HighYeildSavingsRequest } from "@realestatemanager/types";

@Controller('highyieldsavingscalc')
export class HighYieldSavingsCalcController {

    constructor(private readonly highYieldSavingsCalcService: HighYieldSavingsCalcService) { }

    @Post('calculate')
    async calculate(
        @Body() highYeildSavingsRequest: HighYeildSavingsRequest,
    ): Promise<HighYeildSavingsResponseDTO[]> {
        return this.highYieldSavingsCalcService.calculateFutureValueByMonth(highYeildSavingsRequest);
    }

}