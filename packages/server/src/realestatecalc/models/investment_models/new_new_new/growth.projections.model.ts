import { GrowthProjectionsDTO, ValueRateInput } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";

export class GrowthProjections implements IDTOConvertible<GrowthProjectionsDTO> {

    // Expenses
    private annualAppreciationRate: ValueRateInput;
    private annualTaxIncreaseRate: ValueRateInput;
    private annualHomeInsuranceIncreaseRate: ValueRateInput;
    private annualHOAFeesIncreaseRate: ValueRateInput;

    // Incomes
    private annualRentIncreaseRate: ValueRateInput;
    private parkingFeesIncreaseRate: ValueRateInput; // ValueAmountInput; // Income from parking facilities, if available.
    private laundryServicesIncreaseRate: ValueRateInput; //ValueAmountInput; // Income from on-site laundry services.
    private storageUnitFeesIncreaseRate: ValueRateInput; //ValueAmountInput; // Income from storage units, if available.
    private otherAdditionalIncomeStreamsIncreaseRate: ValueRateInput;//ValueAmountInput; // Any other sources of income not covered above.

    constructor(
        annualAppreciationRate: ValueRateInput,
        annualTaxIncreaseRate: ValueRateInput,
        annualHomeInsuranceIncreaseRate: ValueRateInput,
        annualHOAFeesIncreaseRate: ValueRateInput,
        annualRentIncreaseRate: ValueRateInput,
        parkingFeesIncreaseRate: ValueRateInput,
        laundryServicesIncreaseRate: ValueRateInput,
        storageUnitFeesIncreaseRate: ValueRateInput,
        otherAdditionalIncomeStreamsIncreaseRate: ValueRateInput) {

        this.annualAppreciationRate = annualAppreciationRate;
        this.annualTaxIncreaseRate = annualTaxIncreaseRate;
        this.annualHomeInsuranceIncreaseRate = annualHomeInsuranceIncreaseRate;
        this.annualHOAFeesIncreaseRate = annualHOAFeesIncreaseRate;
        this.annualRentIncreaseRate = annualRentIncreaseRate;
        this.parkingFeesIncreaseRate = parkingFeesIncreaseRate;
        this.laundryServicesIncreaseRate = laundryServicesIncreaseRate;
        this.storageUnitFeesIncreaseRate = storageUnitFeesIncreaseRate;
        this.otherAdditionalIncomeStreamsIncreaseRate = otherAdditionalIncomeStreamsIncreaseRate;
    }

    // Getter functions for expenses
    getAnnualAppreciationRate(): ValueRateInput {
        return this.annualAppreciationRate;
    }

    getAnnualTaxIncreaseRate(): ValueRateInput {
        return this.annualTaxIncreaseRate;
    }

    getAnnualHomeInsuranceIncreaseRate(): ValueRateInput {
        return this.annualHomeInsuranceIncreaseRate;
    }

    getAnnualHOAFeesIncreaseRate(): ValueRateInput {
        return this.annualHOAFeesIncreaseRate;
    }

    // Getter functions for incomes
    getAnnualRentIncreaseRate(): ValueRateInput {
        return this.annualRentIncreaseRate;
    }

    getParkingFeesIncreaseRate(): ValueRateInput {
        return this.parkingFeesIncreaseRate;
    }

    getLaundryServicesIncreaseRate(): ValueRateInput {
        return this.laundryServicesIncreaseRate;
    }

    getStorageUnitFeesIncreaseRate(): ValueRateInput {
        return this.storageUnitFeesIncreaseRate;
    }

    getOtherAdditionalIncomeStreamsIncreaseRate(): ValueRateInput {
        return this.otherAdditionalIncomeStreamsIncreaseRate;
    }


    toDTO(): GrowthProjectionsDTO {
        return {
            annualAppreciationRate: this.annualAppreciationRate.rate,
            annualTaxIncreaseRate: this.annualTaxIncreaseRate.rate,
            annualHomeInsuranceIncreaseRate: this.annualHomeInsuranceIncreaseRate.rate,
            annualHOAFeesIncreaseRate: this.annualHOAFeesIncreaseRate.rate,
            annualRentIncreaseRate: this.annualRentIncreaseRate.rate,
            parkingFeesIncreaseRate: this.parkingFeesIncreaseRate.rate,
            laundryServicesIncreaseRate: this.laundryServicesIncreaseRate.rate,
            storageUnitFeesIncreaseRate: this.storageUnitFeesIncreaseRate.rate,
            otherAdditionalIncomeStreamsIncreaseRate: this.otherAdditionalIncomeStreamsIncreaseRate.rate,
        };
    }

}