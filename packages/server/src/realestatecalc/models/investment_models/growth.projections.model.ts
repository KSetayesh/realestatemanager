import { GrowthProjectionsDTO, ValueRateInput } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";

export class GrowthProjections implements IDTOConvertible<GrowthProjectionsDTO> {

    private annualRentIncreaseRate: ValueRateInput;
    private annualAppreciationRate: ValueRateInput;
    private annualTaxIncreaseRate: ValueRateInput;
    private annualHomeInsuranceIncreaseRate: ValueRateInput;
    private annualHOAFeesIncreaseRate: ValueRateInput;

    constructor(
        annualRentIncreaseRate: ValueRateInput,
        annualAppreciationRate: ValueRateInput,
        annualTaxIncreaseRate: ValueRateInput,
        annualHomeInsuranceIncreaseRate: ValueRateInput,
        annualHOAFeesIncreaseRate: ValueRateInput) {

        this.annualRentIncreaseRate = annualRentIncreaseRate;
        this.annualAppreciationRate = annualAppreciationRate;
        this.annualTaxIncreaseRate = annualTaxIncreaseRate;
        this.annualHomeInsuranceIncreaseRate = annualHomeInsuranceIncreaseRate;
        this.annualHOAFeesIncreaseRate = annualHOAFeesIncreaseRate;
    }

    getAnnualRentIncreaseRate(): number {
        return this.annualRentIncreaseRate.rate;
    }

    getAnnualRentIncreaseValueType(): ValueRateInput {
        return this.annualRentIncreaseRate;
    }

    getAnnualAppreciationRate(): number {
        return this.annualAppreciationRate.rate;
    }

    getAnnualAppreciationValueType(): ValueRateInput {
        return this.annualRentIncreaseRate;
    }

    getAnnualTaxIncreaseRate(): number {
        return this.annualTaxIncreaseRate.rate;
    }

    getAnnualTaxIncreaseValueType(): ValueRateInput {
        return this.annualTaxIncreaseRate;
    }

    getAnnualHomeInsuranceIncreaseRate(): number {
        return this.annualHomeInsuranceIncreaseRate.rate;
    }

    getAnnualHomeInsuranceIncreaseValueType(): ValueRateInput {
        return this.annualHomeInsuranceIncreaseRate;
    }

    getAnnualHOAFeesIncreaseRate(): number {
        return this.annualHOAFeesIncreaseRate.rate;
    }

    getAnnualHOAFeesIncreaseValueType(): ValueRateInput {
        return this.annualHOAFeesIncreaseRate;
    }

    toDTO(): GrowthProjectionsDTO {
        return {
            annualRentIncreaseRate: this.getAnnualRentIncreaseRate(),
            annualAppreciationRate: this.getAnnualAppreciationRate(),
            annualTaxIncreaseRate: this.getAnnualTaxIncreaseRate(),
            annualHomeInsuranceIncreaseRate: this.getAnnualHomeInsuranceIncreaseRate(),
            annualHOAFeesIncreaseRate: this.getAnnualHOAFeesIncreaseRate(),
        };
    }
}