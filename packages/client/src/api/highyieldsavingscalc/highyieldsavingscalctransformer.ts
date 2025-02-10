import { HighYeildSavings, HighYeildSavingsResponseDTO } from "@realestatemanager/types";
import { Transformer } from "../transformer";

export class HighYieldSavingsCalcTransformer implements Transformer<HighYeildSavingsResponseDTO, HighYeildSavings> {

    toClient(highYeildSavingsResponseDTO: HighYeildSavingsResponseDTO): HighYeildSavings {
        return { ...highYeildSavingsResponseDTO };
    }

    toClientArray(highYeildSavingsResponseDTOs: HighYeildSavingsResponseDTO[]): HighYeildSavings[] {
        return highYeildSavingsResponseDTOs.map(highYeildSavingsResponseDTO => this.toClient(highYeildSavingsResponseDTO));
    }

}