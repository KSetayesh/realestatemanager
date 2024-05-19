import { GrowthProjectionsResponseDTO, ValueRateInput } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";

export class GrowthProjections implements IDTOConvertible<GrowthProjectionsResponseDTO> {

    // Expenses
    private _annualAppreciationRate: ValueRateInput;
    private _annualTaxIncreaseRate: ValueRateInput;
    private _annualHomeInsuranceIncreaseRate: ValueRateInput;
    private _annualHOAFeesIncreaseRate: ValueRateInput;

    // Incomes
    private _annualRentIncreaseRate: ValueRateInput;
    private _parkingFeesIncreaseRate: ValueRateInput;
    private _laundryServicesIncreaseRate: ValueRateInput;
    private _storageUnitFeesIncreaseRate: ValueRateInput;
    private _otherAdditionalIncomeStreamsIncreaseRate: ValueRateInput;

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

        this._annualAppreciationRate = annualAppreciationRate;
        this._annualTaxIncreaseRate = annualTaxIncreaseRate;
        this._annualHomeInsuranceIncreaseRate = annualHomeInsuranceIncreaseRate;
        this._annualHOAFeesIncreaseRate = annualHOAFeesIncreaseRate;
        this._annualRentIncreaseRate = annualRentIncreaseRate;
        this._parkingFeesIncreaseRate = parkingFeesIncreaseRate;
        this._laundryServicesIncreaseRate = laundryServicesIncreaseRate;
        this._storageUnitFeesIncreaseRate = storageUnitFeesIncreaseRate;
        this._otherAdditionalIncomeStreamsIncreaseRate = otherAdditionalIncomeStreamsIncreaseRate;
    }

    // Getter functions for expenses
    get annualAppreciationRate(): ValueRateInput {
        return this._annualAppreciationRate;
    }

    get annualTaxIncreaseRate(): ValueRateInput {
        return this._annualTaxIncreaseRate;
    }

    get annualHomeInsuranceIncreaseRate(): ValueRateInput {
        return this._annualHomeInsuranceIncreaseRate;
    }

    get annualHOAFeesIncreaseRate(): ValueRateInput {
        return this._annualHOAFeesIncreaseRate;
    }

    // Getter functions for incomes
    get annualRentIncreaseRate(): ValueRateInput {
        return this._annualRentIncreaseRate;
    }

    get parkingFeesIncreaseRate(): ValueRateInput {
        return this._parkingFeesIncreaseRate;
    }

    get laundryServicesIncreaseRate(): ValueRateInput {
        return this._laundryServicesIncreaseRate;
    }

    get storageUnitFeesIncreaseRate(): ValueRateInput {
        return this._storageUnitFeesIncreaseRate;
    }

    get otherAdditionalIncomeStreamsIncreaseRate(): ValueRateInput {
        return this._otherAdditionalIncomeStreamsIncreaseRate;
    }


    toDTO(): GrowthProjectionsResponseDTO {
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