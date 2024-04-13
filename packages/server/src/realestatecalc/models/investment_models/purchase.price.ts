import { TransactionKey, TransactionType, TxnDTO, Utility, ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";
import { Transaction } from "./transaction";

export class PurchasePrice extends Transaction {
    private initialPurchasePrice: ValueAmountInput;
    private expectedAppreciationRate: ValueRateInput;
    private _txnKey: TransactionKey;
    private _txnType: TransactionType;

    constructor(
        initialPurchasePrice: ValueAmountInput,
        expectedAppreciationRate: ValueRateInput
    ) {
        super();
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

    getFutureDatedAmount(
        principal: number,
        growthRate: number,
        monthCounter: number,
    ): number {
        const getMonthlyAppreciationRate = (growthRate: number): number => {
            // Calculate the equivalent monthly appreciation rate for a 4% annual rate
            const annualAppreciationRate = growthRate / 100;
            return Math.pow(1 + annualAppreciationRate, 1 / 12) - 1;
        };

        return principal * (Math.pow(1 + getMonthlyAppreciationRate(growthRate), monthCounter));
    }

    getFutureDatedHomeValue(monthCounter: number): number {
        return this.getFutureDatedAmount(
            this.getInitialPurchasePrice(),
            this.getExpectedAppreciationRate(),
            monthCounter,
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