import { TransactionKey, TransactionType, TxnDTO, Utility, ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";
import { Transaction } from "./transaction";

export class RentEstimate extends Transaction {
    private rentEstimate: ValueAmountInput;
    private expectedGrowthRate: ValueRateInput;

    constructor(rentEstimate: ValueAmountInput, expectedGrowthRate: ValueRateInput) {
        super(TransactionKey.RENTAL_INCOME, TransactionType.INCOME_STREAMS);
        this.rentEstimate = rentEstimate;
        this.expectedGrowthRate = expectedGrowthRate;
    }

    getInitialRentalAmount(): number {
        return this.rentEstimate.amount;
    }

    getExpectedGrowthRate(): number {
        return this.expectedGrowthRate.rate;
    }

    getFutureDatedRentalAmount(monthCounter: number): number {
        return this.getFutureDatedAmount(
            this.getInitialRentalAmount(),
            this.expectedGrowthRate.rate,
            monthCounter
        );
    }

    toDTO(monthCounter: number): TxnDTO {
        return {
            key: TransactionKey.RENTAL_INCOME,
            amount: Utility.round(this.getFutureDatedRentalAmount(monthCounter)),
            percentage: -1, // come back to this
            rateOfGrowth: Utility.round(this.getExpectedGrowthRate()),
            cumulatedAmount: -1, // come back to this
        };
    }
}