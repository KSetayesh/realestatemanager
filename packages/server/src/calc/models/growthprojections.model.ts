import { GrowthProjectionsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export class GrowthProjections implements IDTOConvertible<GrowthProjectionsDTO> {
    private annualAppreciationRate?: number;
    private annualTaxIncreaseRate?: number;
    private annualRentIncreaseRate?: number;

    constructor(annualAppreciationRate?: number,
        annualTaxIncreaseRate?: number,
        annualRentIncreaseRate?: number) {

        this.annualAppreciationRate = annualAppreciationRate;
        this.annualTaxIncreaseRate = annualTaxIncreaseRate;
        this.annualRentIncreaseRate = annualRentIncreaseRate;
    }

    getAnnualAppreciationRate(): number {
        return this.annualAppreciationRate;
    }

    getAnnualTaxIncreaseRate(): number {
        return this.annualTaxIncreaseRate;
    }

    getAnnualRentIncreaseRate(): number {
        return this.annualRentIncreaseRate;
    }

    toDTO(): GrowthProjectionsDTO {
        return {
            annualAppreciationRate: this.annualAppreciationRate,
            annualTaxIncreaseRate: this.annualTaxIncreaseRate,
            annualRentIncreaseRate: this.annualRentIncreaseRate,
        }
    }
}