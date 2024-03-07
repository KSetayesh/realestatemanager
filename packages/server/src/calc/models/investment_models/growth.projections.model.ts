import { GrowthProjectionsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";

export class GrowthProjections implements IDTOConvertible<GrowthProjectionsDTO> {

    private annualRentIncreaseRate: number;
    private annualAppreciationRate: number;
    private annualTaxIncreaseRate: number;

    constructor(annualRentIncreaseRate: number, annualAppreciationRate: number, annualTaxIncreaseRate: number) {
        this.annualRentIncreaseRate = annualRentIncreaseRate;
        this.annualAppreciationRate = annualAppreciationRate;
        this.annualTaxIncreaseRate = annualTaxIncreaseRate;
    }

    getAnnualRentIncreaseRate() {
        return this.annualRentIncreaseRate
    }

    getAnnualAppreciationRate() {
        return this.annualAppreciationRate
    }

    getAnnualTaxIncreaseRate() {
        return this.annualTaxIncreaseRate
    }

    toDTO(): GrowthProjectionsDTO {
        return {
            annualRentIncreaseRate: this.annualRentIncreaseRate,
            annualAppreciationRate: this.annualAppreciationRate,
            annualTaxIncreaseRate: this.annualTaxIncreaseRate,
        }
    }
}