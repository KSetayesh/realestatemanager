import { TaxImplicationsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export class TaxImplications implements IDTOConvertible<TaxImplicationsDTO> {

    private depreciation: number;
    private mortgageInterest: number;
    private operatingExpenses: number;
    private propertyTaxes: number;

    constructor(depreciation: number, mortgageInterest: number, operatingExpenses: number, propertyTaxes: number) {
        this.depreciation = depreciation;
        this.mortgageInterest = mortgageInterest;
        this.operatingExpenses = operatingExpenses;
        this.propertyTaxes = propertyTaxes;
    }

    toDTO(): TaxImplicationsDTO {
        return {
            depreciation: this.depreciation,
            taxDeductions: {
                mortgageInterest: this.mortgageInterest,
                operatingExpenses: this.operatingExpenses,
                propertyTaxes: this.propertyTaxes,
            },
        };
    }

}