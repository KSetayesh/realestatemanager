import { Utility, ValueAmountInput, ValueInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { CalculatorType, TransactionCalculator } from "../new_calculators/transaction.calculator";
import { BaseMortgageTransactionDetail, BaseTransactionDetail, TransactionKey, TransactionType } from "./transaction.detail";
import { MortgageCalculator } from "../new_calculators/mortgage.calculator";
import { BaseMortgageTransaction } from "./financial.transaction.breakdown";

export type TransactionDTO = {
    txnKey: TransactionKey;
    txnType: TransactionType;
    amount: number;
    cumulativeAmount: number;
    rate: number;
    projectedGrowthRate: number;
};

export class Transaction<T extends TransactionCalculator> {
    private transactionKey: TransactionKey;
    private amountOrRate: ValueInput;
    private cumulativeAmount: ValueAmountInput;
    private txnType: TransactionType;
    private calculator: T;
    private _canBeCumulated: boolean;
    private _canBePercetage: boolean;
    private _hasRateOfGrowth: boolean;
    private growthRate?: ValueRateInput;

    constructor(
        transactionKey: TransactionKey,
        amountOrRate: ValueInput,
        txnType: TransactionType,
        canBeCumulated: boolean,
        canBePercetage: boolean,
        hasRateOfGrowth: boolean,
        growthRate: ValueRateInput = {
            type: ValueType.RATE,
            rate: 0,
        }
    ) {
        this.transactionKey = transactionKey;
        this.amountOrRate = amountOrRate;
        this.txnType = txnType;
        this.growthRate = growthRate;
        this._canBeCumulated = canBeCumulated;
        this._canBePercetage = canBePercetage;
        this._hasRateOfGrowth = hasRateOfGrowth;
        this.cumulativeAmount = {
            type: ValueType.AMOUNT,
            amount: 0
        };
    }

    protected getCalculator(): T {
        return this.calculator;
    }

    getCalculatorType(): CalculatorType {
        return this.calculator.getCalculatorType();
    }

    setTransactionCalculator(calculator: T) {
        this.calculator = calculator;
    }

    setCumulativeAmount(amount: ValueAmountInput) {
        this.cumulativeAmount.amount += amount.amount;
    }

    getTransactionKey(): TransactionKey {
        return this.transactionKey;
    }

    getTransactionType(): TransactionType {
        return this.txnType;
    }

    getAmount(numberOfYears: number = 0): ValueAmountInput {
        // The implementation of getAmount will depend on the type of calculator currently set.
        // Additional arguments can be passed if needed, based on the calculator's requirement.
        return this.calculator.getAmount(this.amountOrRate, this.growthRate.rate, numberOfYears);
    }

    getRate(numberOfYears: number = 0): ValueRateInput {
        // Similar to getAmount, getRate's behavior will depend on the current calculator strategy.
        // This can handle different calculations based on the calculator being used.
        return this.calculator.getRate(this.amountOrRate, this.growthRate.rate, numberOfYears);
    }

    getProjectedGrowthRate(): ValueRateInput {
        return this.growthRate;
    }

    canBeCumulated(): boolean {
        return this._canBeCumulated;
    }

    canBePercetage(): boolean {
        return this._canBePercetage;
    }

    hasRateOfGrowth(): boolean {
        return this._hasRateOfGrowth;
    }

    getAmountOrRate(): ValueInput {
        return this.amountOrRate;
    }

    isMortgageCalculator(): this is BaseMortgageTransaction {
        // Assuming there's a distinctive property or method in MortgageCalculator,
        // like 'mortgageSpecificMethod'. This is just an illustrative example.
        return this.calculator.getCalculatorType() === CalculatorType.MORTGAGE;
        // return (this.calculator as any).mortgageSpecificMethod !== undefined;
    }

    createBaseTransactionDetail(
        txnList: [],
        numberOfYears: number = 0,
    ): BaseTransactionDetail {

        const txnAmount = this.getAmount(numberOfYears).amount;
        // const txnPercentage = this.getRate(numberOfYears).rate;
        // const rateOfGrowth = this.getProjectedGrowthRate().rate;
        let cumulativeAmount = txnAmount;
        if (txnList.length > 1) {
            const previousIndexData = txnList[txnList.length - 1];
            const previous: BaseTransactionDetail = previousIndexData[this.getTransactionType()][this.getTransactionKey()];
            cumulativeAmount += previous.cumulativeAmount ?? 0;
        }

        const transactionDetail: BaseTransactionDetail = {
            key: this.getTransactionKey(),
            type: this.getTransactionType(),
            amount: Utility.round(txnAmount),
            ...(this.canBePercetage() && { percentage: Utility.round(this.getRate(numberOfYears).rate) }),
            ...(this.canBeCumulated() && { cumulativeAmount: Utility.round(cumulativeAmount) }),
            ...(this.hasRateOfGrowth() && { rateOfGrowth: Utility.round(this.getProjectedGrowthRate().rate) }),
        };
        return transactionDetail;
    }

}

export class MortgageTransaction extends Transaction<MortgageCalculator> {

    private pmiRate: ValueRateInput;

    constructor(
        transactionKey: TransactionKey,
        amountOrRate: ValueInput,
        txnType: TransactionType,
        canBeCumulated: boolean,
        canBePercetage: boolean,
        hasRateOfGrowth: boolean,
        growthRate?: ValueRateInput,
        pmiRate?: ValueRateInput) {

        super(
            transactionKey,
            amountOrRate,
            txnType,
            canBeCumulated,
            canBePercetage,
            hasRateOfGrowth,
            growthRate
        );
        this.pmiRate = pmiRate;
    }

    // Use generics to restrict calculator type
    setTransactionCalculator(calculator: MortgageCalculator) {
        super.setTransactionCalculator(calculator);
    }

    calculateBalanceAfterPayment(paymentNumber: number = 0): ValueAmountInput {
        return this.getCalculator().calculateBalanceAfterPayment(this.getAmountOrRate(), paymentNumber);
    }

    getPrincipalAmountForPayment(paymentNumber: number = 0): ValueAmountInput {
        return this.getCalculator().getPrincipalAmountForPayment(this.getAmountOrRate(), paymentNumber);
    }

    getInterestAmountForPayment(paymentNumber: number = 0): ValueAmountInput {
        return this.getCalculator().getInterestAmountForPayment(this.getAmountOrRate(), paymentNumber);
    }

    getPercentageOfInterest(paymentNumber: number = 0): ValueRateInput {
        return this.getCalculator().getPercentageOfInterest(this.getAmountOrRate(), paymentNumber);
    }

    getPercentageOfPrincipal(paymentNumber: number): ValueRateInput {
        return this.getCalculator().getPercentageOfPrincipal(this.getAmountOrRate(), paymentNumber);
    }

    getPMIAmount(paymentNumber: number): ValueAmountInput {
        return this.getCalculator().getPMIAmount(this.pmiRate, this.getAmountOrRate(), paymentNumber);
    }

    getPMIRate(): ValueRateInput {
        return this.getCalculator().getPMIRate(this.pmiRate);
    }

    hasPMI(): boolean {
        return this.getCalculator().hasPMI();
    }

    getLoanAmount(): ValueAmountInput {
        return this.getCalculator().getLoanAmount();
    }

    createBaseTransactionDetail(
        txnList: [],
        numberOfYears: number = 0,
    ): BaseMortgageTransactionDetail {
        const hasPMI: boolean = this.hasPMI();
        const baseTransactionDetail: BaseTransactionDetail = super.createBaseTransactionDetail(txnList, numberOfYears);
        const mortgageTransactionDetail: BaseMortgageTransactionDetail = {
            ...baseTransactionDetail,
            loanAmount: Utility.round(this.getLoanAmount().amount),
            balanceAfterPayment: Utility.round(this.calculateBalanceAfterPayment(numberOfYears).amount),
            principalAmountForPayment: Utility.round(this.getPrincipalAmountForPayment(numberOfYears).amount),
            interestAmountForPayment: Utility.round(this.getInterestAmountForPayment(numberOfYears).amount),
            percentageOfInterest: Utility.round(this.getPercentageOfInterest(numberOfYears).rate),
            percentageOfPrincipal: Utility.round(this.getPercentageOfPrincipal(numberOfYears).rate),
            hasPMI: hasPMI,
            ...(hasPMI && { pmiAmount: Utility.round(this.getPMIAmount(numberOfYears).amount) }),
            ...(hasPMI && { pmiRate: Utility.round(this.getPMIRate().rate) }),
        };
        return mortgageTransactionDetail;

    }


}