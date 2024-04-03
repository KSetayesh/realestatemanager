import { TransactionKey, TransactionType, TxnDTO, Utility, ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";
import { CalcHelper } from "./calc.helper";
import { getYear } from "src/shared/Constants";

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

    getFutureDatedHomeValue(monthCounter: number): number {
        const getMonthlyAppreciationRate = (growthRate: number): number => {
            // Calculate the equivalent monthly appreciation rate for a 4% annual rate
            const annualAppreciationRate = growthRate / 100;
            return Math.pow(1 + annualAppreciationRate, 1 / 12) - 1;
        };

        return this.calcHelper.getFutureDatedAmount(
            this.getInitialPurchasePrice(),
            getMonthlyAppreciationRate(this.getExpectedAppreciationRate()),
            getYear(monthCounter),
        );

    }

    toDTO(monthCounter: number): TxnDTO {
        return {
            key: TransactionKey.PURCHASE_PRICE,
            amount: Utility.round(this.getFutureDatedHomeValue(monthCounter)),
            percentage: -1, // come back to this
            rateOfGrowth: Utility.round(this.getExpectedAppreciationRate()),
        };
    }
}