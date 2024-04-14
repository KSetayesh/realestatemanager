import { TransactionKey, TransactionType, TxnDTO, Utility, ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";
import { Transaction } from "./transaction";

export class PurchasePrice extends Transaction {
    private initialPurchasePrice: ValueAmountInput;
    private expectedAppreciationRate: ValueRateInput;

    constructor(
        initialPurchasePrice: ValueAmountInput,
        expectedAppreciationRate: ValueRateInput
    ) {
        super(TransactionKey.PURCHASE_PRICE, TransactionType.FINANCING);
        this.initialPurchasePrice = initialPurchasePrice;
        this.expectedAppreciationRate = expectedAppreciationRate;
    }

    protected getFutureDatedAmount(
        principal: number,
        growthRate: number,
        monthCounter: number,
    ): number {
        const getMonthlyAppreciationRate = (growthRate: number): number => {
            // Calculate the equivalent monthly appreciation rate for a 4% annual rate
            const annualAppreciationRate = growthRate / 100;
            return Math.pow(1 + annualAppreciationRate, 1 / 12) - 1;
        };

        if (monthCounter <= 1) {
            return principal;
        }
        return principal * (Math.pow(1 + getMonthlyAppreciationRate(growthRate), monthCounter - 1));
    }

    getInitialPurchasePrice(): number {
        return this.initialPurchasePrice.amount;
    }

    getExpectedAppreciationRate(): number {
        return this.expectedAppreciationRate.rate;
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