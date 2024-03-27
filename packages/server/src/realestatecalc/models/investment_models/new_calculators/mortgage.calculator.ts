import { DefaultInvestmentRates, GrowthFrequency, InterestType, ValueAmountInput, ValueInput, ValueRateInput, ValueType, isValueAmountInput, isValueRateInput } from "@realestatemanager/shared";
import { ValueDependentTransactionCalculator } from "./value.dependent.transaction.calculator";
import { CalculatorType, MortgageCalculatorInterface, TransactionCalculator } from "./transaction.calculator";
import { Injectable } from "@nestjs/common";
import { BaseTransaction } from "../new_new_new/financial.transaction.breakdown";

export interface MortgageCalcRequst {
    loanAmount: number;
    loanTermYears: number;
    interestType: InterestType;
};

@Injectable()
export class MortgageCalculator extends ValueDependentTransactionCalculator implements MortgageCalculatorInterface {

    private downPaymentTxn: BaseTransaction;
    private loanTermYears: number;
    private interestType: InterestType;
    private pmiDropOffRatio: number; // Commonly 78% LTV ratio for PMI drop-off

    // private pmiRate?: number; // Optional PMI rate as a percentage
    // private pmiDropOffRatio: number = 0.78; // Commonly 78% LTV ratio for PMI drop-off

    constructor(
        inititalPurchasePrice: ValueAmountInput,
        downPaymentTxn: BaseTransaction,
        loanTermYears: number,
        interestType: InterestType,
        pmiDropOffRatio: number = DefaultInvestmentRates.PMI_DROP_OFF_POINT) {

        super(inititalPurchasePrice, undefined, GrowthFrequency.MONTHLY);
        this.downPaymentTxn = downPaymentTxn;
        this.loanTermYears = loanTermYears;
        this.interestType = interestType;
        this.pmiDropOffRatio = pmiDropOffRatio;


    }




    getAmount(annualInterestRate: ValueInput, ...args: number[]): ValueAmountInput {
        if (isValueRateInput(annualInterestRate)) {
            const monthlyInterestRate = annualInterestRate.rate / 100 / 12;
            const totalPayments = this.loanTermYears * 12;
            const monthlyPayment = this.getLoanAmount().amount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

            return {
                type: ValueType.AMOUNT,
                amount: monthlyPayment,
            };
        }
        throw new Error('Cannot be amount for MortgageCalculator');
    }

    getRate(annualInterestRate: ValueRateInput): ValueRateInput {
        return annualInterestRate;
    }

    getCalculatorType(): CalculatorType {
        return CalculatorType.MORTGAGE;
    }

    getLoanAmount(): ValueAmountInput {
        return {
            type: ValueType.AMOUNT,
            amount: this.baseValue.amount - this.downPaymentTxn.getAmount().amount,
        }
    }

    getMortgagePlusPMIAmount(
        annualInterestRate: ValueInput,
        pmiValue: ValueInput,
        paymentNumber: number): ValueAmountInput {

        const mortgageAmount: ValueAmountInput = this.getAmount(annualInterestRate);
        let amount = mortgageAmount.amount;
        if (this.hasPMI()) {
            if (isValueAmountInput(pmiValue)) {
                amount += pmiValue.amount;
            }
            else if (isValueRateInput(pmiValue)) {
                amount += this.getPMIAmount(pmiValue, annualInterestRate, paymentNumber).amount;
            }
        }
        return {
            type: ValueType.AMOUNT,
            amount: amount,
        };
    }

    calculateBalanceAfterPayment(annualInterestRate: ValueInput, paymentNumber: number): ValueAmountInput {
        if (isValueRateInput(annualInterestRate)) {
            const monthlyInterestRate = annualInterestRate.rate / 100 / 12;
            const monthlyPayment = this.getAmount(annualInterestRate).amount;
            let balance = this.getLoanAmount().amount;

            for (let i = 1; i <= paymentNumber; i++) {
                const interestForThisMonth = balance * monthlyInterestRate;
                const principalForThisMonth = monthlyPayment - interestForThisMonth;
                balance -= principalForThisMonth;
            }

            return {
                type: ValueType.AMOUNT,
                amount: balance,
            };
        }
        throw new Error('Cannot be amount for MortgageCalculator');
    }

    getPrincipalAmountForPayment(annualInterestRate: ValueInput, paymentNumber: number = 0): ValueAmountInput {
        if (isValueRateInput(annualInterestRate)) {
            const monthlyPayment = this.getAmount(annualInterestRate).amount;
            const interestForThisPayment = this.getInterestAmountForPayment(annualInterestRate, paymentNumber).amount;
            const amountTowardsPrincipal = monthlyPayment - interestForThisPayment;
            return {
                type: ValueType.AMOUNT,
                amount: amountTowardsPrincipal,
            };
        }
        throw new Error('Cannot be amount for MortgageCalculator');
    }

    getInterestAmountForPayment(annualInterestRate: ValueInput, paymentNumber: number = 0): ValueAmountInput {
        if (isValueRateInput(annualInterestRate)) {
            const monthlyInterestRate = annualInterestRate.rate / 100 / 12;
            const balanceBeforePayment = this.calculateBalanceAfterPayment(annualInterestRate, paymentNumber - 1).amount;
            return {
                type: ValueType.AMOUNT,
                amount: balanceBeforePayment * monthlyInterestRate
            };
        }
        throw new Error('Cannot be amount for MortgageCalculator');
    }

    getPercentageOfInterest(annualInterestRate: ValueInput, paymentNumber: number = 0): ValueRateInput {
        if (isValueRateInput(annualInterestRate)) {
            const amountInInterest = this.getAmount(annualInterestRate, paymentNumber).amount;
            const mortgageAmount = this.getAmount(annualInterestRate).amount;
            const percentageOfMortgage = (amountInInterest / mortgageAmount) * 100;
            return {
                type: ValueType.RATE,
                rate: percentageOfMortgage,
            };
        }
        throw new Error('Cannot be amount for MortgageCalculator');
    }

    getPercentageOfPrincipal(annualInterestRate: ValueInput, paymentNumber: number = 0): ValueRateInput {
        if (isValueRateInput(annualInterestRate)) {
            const percentageInInterest = this.getPercentageOfInterest(annualInterestRate, paymentNumber).rate;
            const principalPercentage = 100 - percentageInInterest;
            return {
                type: ValueType.RATE,
                rate: principalPercentage,
            };
        }
        throw new Error('Cannot be amount for MortgageCalculator');
    }

    hasPMI(): boolean {
        return this.downPaymentTxn.getRate().rate < 20;
    }

    getPMIAmount(pmiValue: ValueInput, annualInterestRate: ValueInput, paymentNumber: number = 0): ValueAmountInput {
        if (!this.hasPMI()) {
            return {
                type: ValueType.AMOUNT,
                amount: 0,
            };
        }
        if (isValueRateInput(annualInterestRate)) {
            if (isValueAmountInput(pmiValue)) {
                return pmiValue;
            }
            else if (isValueRateInput(pmiValue)) {
                // Calculate the balance after the given payment number to see if PMI still applies
                const balanceAfterPayment = this.calculateBalanceAfterPayment(annualInterestRate, paymentNumber).amount;
                const ltvAfterPayment = balanceAfterPayment / this.baseValue.amount;

                // If the LTV ratio is less than the drop-off ratio, PMI no longer applies
                if (ltvAfterPayment <= this.pmiDropOffRatio) {
                    return {
                        type: ValueType.AMOUNT,
                        amount: 0,
                    };
                }

                const annualPMI = (this.getLoanAmount().amount * (pmiValue.rate / 100)) / 12; // Monthly PMI amount
                return {
                    type: ValueType.AMOUNT,
                    amount: annualPMI,
                };
            }
            throw new Error('PMI needs to be an amount or rate');

        }
        throw new Error('Cannot be amount for MortgageCalculator');
    }

    getPMIRate(pmiValue: ValueInput): ValueRateInput {
        if (!this.hasPMI()) {
            return {
                type: ValueType.RATE,
                rate: 0,
            };
        }
        if (isValueRateInput(pmiValue)) {
            return pmiValue;
        }
        else if (isValueAmountInput(pmiValue)) {
            return {
                type: ValueType.RATE,
                rate: (pmiValue.amount / this.getLoanAmount().amount) * 100,
            };
        }
        // throw new Error('Cannot be amount for MortgageCalculator');
    }


}
