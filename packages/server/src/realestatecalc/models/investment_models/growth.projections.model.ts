import { GrowthProjectionsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";

export class GrowthProjections implements IDTOConvertible<GrowthProjectionsDTO> {

    private annualRentIncreaseRate: number;
    private annualAppreciationRate: number;
    private annualTaxIncreaseRate: number;
    private annualHomeInsuranceIncreaseRate: number;
    private annualHOAFeesIncreaseRate: number;

    constructor(
        annualRentIncreaseRate: number,
        annualAppreciationRate: number,
        annualTaxIncreaseRate: number,
        annualHomeInsuranceIncreaseRate: number,
        annualHOAFeesIncreaseRate: number) {

        this.annualRentIncreaseRate = annualRentIncreaseRate;
        this.annualAppreciationRate = annualAppreciationRate;
        this.annualTaxIncreaseRate = annualTaxIncreaseRate;
        this.annualHomeInsuranceIncreaseRate = annualHomeInsuranceIncreaseRate;
        this.annualHOAFeesIncreaseRate = annualHOAFeesIncreaseRate;
    }

    getAnnualRentIncreaseRate(): number {
        return this.annualRentIncreaseRate;
    }

    getAnnualAppreciationRate(): number {
        return this.annualAppreciationRate;
    }

    getAnnualTaxIncreaseRate(): number {
        return this.annualTaxIncreaseRate;
    }

    getAnnualHomeInsuranceIncreaseRate(): number {
        return this.annualHomeInsuranceIncreaseRate;
    }

    getAnnualHOAFeesIncreaseRate(): number {
        return this.annualHOAFeesIncreaseRate;
    }

    toDTO(): GrowthProjectionsDTO {
        return {
            annualRentIncreaseRate: this.annualRentIncreaseRate,
            annualAppreciationRate: this.annualAppreciationRate,
            annualTaxIncreaseRate: this.annualTaxIncreaseRate,
            annualHomeInsuranceIncreaseRate: this.annualHomeInsuranceIncreaseRate,
            annualHOAFeesIncreaseRate: this.annualHOAFeesIncreaseRate,
        };
    }
}