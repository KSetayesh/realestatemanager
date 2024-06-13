import { IDTOConvertible, TaxImplicationsResponseDTO } from "@realestatemanager/types";

export class TaxImplications implements IDTOConvertible<TaxImplicationsResponseDTO> {

    private depreciation: number;
    private mortgageInterest: number;
    private operatingExpenses: number;
    private propertyTaxes?: number;

    constructor(depreciation: number, mortgageInterest: number, operatingExpenses: number, propertyTaxes?: number) {
        this.depreciation = depreciation;
        this.mortgageInterest = mortgageInterest;
        this.operatingExpenses = operatingExpenses;
        this.propertyTaxes = propertyTaxes;
    }

    toDTO(): TaxImplicationsResponseDTO {
        return {
            depreciation: this.depreciation,
            mortgageInterest: this.mortgageInterest,
            operatingExpenses: this.operatingExpenses,
            propertyTaxes: this.propertyTaxes,
        }
    }

}