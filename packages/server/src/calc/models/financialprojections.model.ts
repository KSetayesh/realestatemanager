import { FinancialProjectionsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export class FinancialProjections implements IDTOConvertible<FinancialProjectionsDTO> {
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

    toDTO(): FinancialProjectionsDTO {
        return {
            annualAppreciationRate: this.annualAppreciationRate,
            annualTaxIncreaseRate: this.annualTaxIncreaseRate,
            annualRentIncreaseRate: this.annualRentIncreaseRate,
        }
    }
}