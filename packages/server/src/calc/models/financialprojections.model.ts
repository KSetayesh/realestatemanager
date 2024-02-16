import { FinancialProjectionsDTO } from "@realestatemanager/shared";

export class FinancialProjections {
    annualAppreciationRate?: number;
    annualTaxIncreaseRate?: number;
    annualRentIncreaseRate?: number;

    constructor() { }

    toDTO(): FinancialProjectionsDTO {
        return {
            annualAppreciationRate: this.annualAppreciationRate,
            annualTaxIncreaseRate: this.annualTaxIncreaseRate,
            annualRentIncreaseRate: this.annualRentIncreaseRate,
        }
    }
}