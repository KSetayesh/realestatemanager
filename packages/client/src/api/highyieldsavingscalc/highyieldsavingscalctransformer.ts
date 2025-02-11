import { HighYeildSavingsResponseDTO } from "@realestatemanager/types";
import { Transformer } from "../transformer";

export class HighYieldSavingsCalcTransformer implements Transformer<HighYeildSavingsResponseDTO, HighYeildSavingsResponseDTO> {

    toClient(): HighYeildSavingsResponseDTO {
        throw new Error('Method not implemented');
    }

    toClientArray(highYeildSavingsResponseDTOs: HighYeildSavingsResponseDTO[]): HighYeildSavingsResponseDTO[] {
        return highYeildSavingsResponseDTOs;
    }

}