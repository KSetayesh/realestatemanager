import { Utility, ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { CalcHelper } from "./calc.helper";
import { RentEstimate } from "./rent.estimate";
import { CalculateTxnInterface, TxnDTO } from "./calculate.txn.interface";
import { TransactionKey } from "./calc/calculate";

export class ParkingFee implements CalculateTxnInterface<ValueAmountInput, RentEstimate> {

    private calcHelper: CalcHelper;
    private _baseValue: ValueAmountInput;
    private _rateOfGrowth: ValueRateInput;
    private _txnKey: TransactionKey.PARKING_FEES;
    private _canBeCumulated: boolean = true;

    constructor(parkingFee: ValueAmountInput, expectedGrowthRate: ValueRateInput) {
        this._baseValue = parkingFee;
        this._rateOfGrowth = expectedGrowthRate;
        this.calcHelper = new CalcHelper();
    }

    get baseValue(): ValueAmountInput {
        return this._baseValue;
    }

    get rateOfGrowth(): ValueRateInput {
        return this._rateOfGrowth;
    }

    get txnKey(): TransactionKey {
        return this._txnKey;
    }

    get canBeCumulated(): boolean {
        return this._canBeCumulated;
    }

    getAmount(rentalTxn: RentEstimate, numberOfYears: number = 0): number {
        return this.getParkingFeeIncome(numberOfYears);
    }

    getRate(rentalTxn: RentEstimate, numberOfYears: number = 0): number {
        return this.getParkingFeePercentage(rentalTxn, numberOfYears);
    }

    private getParkingFeeIncome(numberOfYears: number = 0): number {
        return this.calcHelper.getFutureDatedAmount(
            this.baseValue.amount,
            this.rateOfGrowth.rate,
            numberOfYears
        );
    }

    private getParkingFeePercentage(initialRentalEstimate: RentEstimate, numberOfYears: number = 0): number {

        const futureDatedRentalAmount = initialRentalEstimate.getFutureDatedRentalAmount(numberOfYears);

        const laundryServiceAmount: ValueAmountInput = {
            type: ValueType.AMOUNT,
            amount: this.getParkingFeeIncome(numberOfYears),
        };

        return this.calcHelper.getTransactionPercent(laundryServiceAmount, futureDatedRentalAmount);

    }

    toDTO(rentalTxn: RentEstimate, numberOfYears: number = 0, previousTotalAmount: number = 0): TxnDTO {
        const txnAmount = this.getAmount(rentalTxn, numberOfYears);
        const cumulativeAmount = txnAmount + previousTotalAmount;

        return {
            key: this.txnKey,
            amount: Utility.round(txnAmount),
            percentage: Utility.round(this.getRate(rentalTxn, numberOfYears)),
            rateOfGrowth: Utility.round(this.rateOfGrowth.rate),
            ...(this.canBeCumulated && { cumulativeAmount: Utility.round(cumulativeAmount) }),
        };
    }
}