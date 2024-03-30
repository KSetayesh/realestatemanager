import { Utility, ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";
import { CalcHelper } from "./calc.helper";
import { TxnDTO } from "./calculate.txn.interface";
import { TransactionKey, TransactionType } from "./calc/calculate";

export class PurchasePrice {
    private calcHelper: CalcHelper;
    private initialPurchasePrice: ValueAmountInput;
    private expectedAppreciationRate: ValueRateInput;
    private _txnKey: TransactionKey;
    private _txnType: TransactionType;

    constructor(
        initialPurchasePrice: ValueAmountInput,
        expectedAppreciationRate: ValueRateInput
    ) {
        this.calcHelper = new CalcHelper();
        this._txnKey = TransactionKey.PURCHASE_PRICE;
        this._txnType = TransactionType.FINANCING;
        this.initialPurchasePrice = initialPurchasePrice;
        this.expectedAppreciationRate = expectedAppreciationRate;
    }

    get txnKey(): TransactionKey {
        return this._txnKey;
    }

    get txnType(): TransactionType {
        return this._txnType;
    }

    getInitialPurchasePrice(): number {
        return this.initialPurchasePrice.amount;
    }

    getExpectedAppreciationRate(): number {
        return this.expectedAppreciationRate.rate;
    }

    getFutureDatedHomeValue(numberOfYears: number = 0): number {
        const getMonthlyAppreciationRate = (growthRate: number): number => {
            // Calculate the equivalent monthly appreciation rate for a 4% annual rate
            const annualAppreciationRate = growthRate / 100;
            return Math.pow(1 + annualAppreciationRate, 1 / 12) - 1;
        };

        return this.calcHelper.getFutureDatedAmount(
            this.getInitialPurchasePrice(),
            getMonthlyAppreciationRate(this.getExpectedAppreciationRate()),
            numberOfYears
        );

    }

    toDTO(yearCounter: number = 0): TxnDTO {
        return {
            key: TransactionKey.PURCHASE_PRICE,
            amount: Utility.round(this.getFutureDatedHomeValue(yearCounter)),
            percentage: -1, // come back to this
            rateOfGrowth: Utility.round(this.getExpectedAppreciationRate()),
        };
    }
}