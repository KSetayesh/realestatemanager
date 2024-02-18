import { FinancialProjectionsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export class FinancialProjections implements IDTOConvertible<FinancialProjectionsDTO>{
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