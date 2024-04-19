import { Injectable } from "@nestjs/common";
import { InitialCost } from "./initial.cost";
import {
    DefaultInvestmentRates,
    InterestType,
    MortgageTxnDTO,
    TransactionKey,
    TransactionType,
    Utility,
    ValueInput,
    ValueRateInput,
    isValueAmountInput,
    isValueRateInput
} from "@realestatemanager/shared";
import { PurchasePrice } from "./purchase.price";
import { Transaction } from "./transaction";


@Injectable()
export class MortgageCalculator extends Transaction { //implements MortgageCalculateTxnInterface {

    private purchasePrice: PurchasePrice;
    private downPaymentTxn: InitialCost;
    private interestType: InterestType;
    private annualInterestRate: ValueRateInput;
    private pmiDropOffRatio: number; // Commonly 78% LTV ratio for PMI drop-off
    private pmiValue: ValueInput;
    private mortgageAmount: number;
    private _loanTermYears: number;
    // private pmiRate?: number; // Optional PMI rate as a percentage
    // private pmiDropOffRatio: number = 0.78; // Commonly 78% LTV ratio for PMI drop-off

    constructor(
        purchasePrice: PurchasePrice,
        downPaymentTxn: InitialCost,
        loanTermYears: number,
        interestType: InterestType,
        annualInterestRate: ValueRateInput,
        pmiDropOffRatio: number = DefaultInvestmentRates.PMI_DROP_OFF_POINT,
        pmiValue: ValueInput) {

        super(TransactionKey.MORTGAGE, TransactionType.MORTGAGE);
        this.purchasePrice = purchasePrice;
        this.downPaymentTxn = downPaymentTxn;
        this._loanTermYears = loanTermYears;
        this.interestType = interestType;
        this.annualInterestRate = annualInterestRate;
        this.pmiDropOffRatio = pmiDropOffRatio;
        this.pmiValue = pmiValue;

        const calculateMortgage = (): number => {
            if (isValueRateInput(this.annualInterestRate)) {
                const monthlyInterestRate = this.annualInterestRate.rate / 100 / 12;
                const totalPayments = this.loanTermYears * 12;
                const loanAmount = this.getLoanAmount();
                const monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

                return monthlyPayment;
            }
            throw new Error('Cannot be amount for MortgageCalculator');
        };
        this.mortgageAmount = calculateMortgage();

    }

    get loanTermYears(): number {
        return this._loanTermYears;
    }

    get numberOfPayments(): number {
        return this.loanTermYears * 12;
    }

    getAmount(paymentNumber: number): number {
        // return this.mortgageAmount;
        let mortgageAmount = this.getMortgageAmount();
        if (this.hasPMI()) {
            if (isValueAmountInput(this.pmiValue)) {
                mortgageAmount += this.pmiValue.amount;
            }
            else if (isValueRateInput(this.pmiValue)) {
                mortgageAmount += this.getPMIAmount(paymentNumber);
            }
        }
        return mortgageAmount;
    }

    getRate(): number {
        return this.annualInterestRate.rate;
    }

    getMortgageAmount(): number {
        return this.mortgageAmount;
    }

    getLoanAmount(): number {
        return this.purchasePrice.getInitialPurchasePrice() - this.downPaymentTxn.getAmount(this.purchasePrice);
    }

    calculateBalanceAfterPayment(paymentNumber: number): number {
        if (isValueRateInput(this.annualInterestRate)) {
            const monthlyInterestRate = this.annualInterestRate.rate / 100 / 12;
            const monthlyPayment = this.getMortgageAmount();
            let balance = this.getLoanAmount();

            for (let i = 1; i <= paymentNumber; i++) {
                const interestForThisMonth = balance * monthlyInterestRate;
                const principalForThisMonth = monthlyPayment - interestForThisMonth;
                balance -= principalForThisMonth;
            }

            return balance;
        }
        throw new Error('Cannot be amount for MortgageCalculator');
    }

    getPrincipalAmountForPayment(paymentNumber: number): number {
        if (isValueRateInput(this.annualInterestRate)) {
            const monthlyPayment = this.getMortgageAmount();
            const interestForThisPayment = this.getInterestAmountForPayment(paymentNumber);
            const amountTowardsPrincipal = monthlyPayment - interestForThisPayment;
            return amountTowardsPrincipal;
        }
        throw new Error('Cannot be amount for MortgageCalculator');
    }

    getTotalInterestPaid(paymentNumber: number): number {
        let total = 0;
        for (let i = 1; i <= paymentNumber; i++) {
            total += this.getInterestAmountForPayment(i);
        }
        return total;
    }

    getTotalPrincipalPaid(paymentNumber: number): number {
        let total = 0;
        for (let i = 1; i <= paymentNumber; i++) {
            total += this.getPrincipalAmountForPayment(i);
        }
        return total;
    }

    getInterestAmountForPayment(paymentNumber: number): number {
        if (isValueRateInput(this.annualInterestRate)) {
            const monthlyInterestRate = this.annualInterestRate.rate / 100 / 12;
            const balanceBeforePayment = this.calculateBalanceAfterPayment(paymentNumber - 1);
            return balanceBeforePayment * monthlyInterestRate;
        }
        throw new Error('Cannot be amount for MortgageCalculator');
    }

    getPercentageOfInterest(paymentNumber: number): number {
        if (isValueRateInput(this.annualInterestRate)) {
            //const amountInInterest = this.getAmount();
            let amountInInterest = this.getInterestAmountForPayment(paymentNumber);
            const percentageOfMortgage = (amountInInterest / this.getMortgageAmount()) * 100;
            return percentageOfMortgage;
        }
        throw new Error('Cannot be amount for MortgageCalculator');
    }

    getPercentageOfPrincipal(paymentNumber: number): number {
        if (isValueRateInput(this.annualInterestRate)) {
            const percentageInInterest = this.getPercentageOfInterest(paymentNumber);
            const principalPercentage = 100 - percentageInInterest;
            return principalPercentage;
        }
        throw new Error('Cannot be amount for MortgageCalculator');
    }

    hasPMI(): boolean {
        return this.downPaymentTxn.getRate(this.purchasePrice) < 20;
    }

    getPMIAmount(paymentNumber: number): number {
        if (!this.hasPMI()) {
            return 0;
        }
        if (isValueRateInput(this.annualInterestRate)) {
            // Calculate the balance after the given payment number to see if PMI still applies
            const balanceAfterPayment = this.calculateBalanceAfterPayment(paymentNumber);
            const ltvAfterPayment = balanceAfterPayment / this.purchasePrice.getInitialPurchasePrice();
            // If the LTV ratio is less than the drop-off ratio, PMI no longer applies
            if (ltvAfterPayment <= this.pmiDropOffRatio) {
                return 0;
            }
            if (isValueAmountInput(this.pmiValue)) {
                return this.pmiValue.amount;
            }
            else if (isValueRateInput(this.pmiValue)) {
                const annualPMI = (this.getLoanAmount() * (this.pmiValue.rate / 100)) / 12; // Monthly PMI amount
                return annualPMI;
            }
            throw new Error('PMI needs to be an amount or rate');
        }
        throw new Error('Cannot be amount for MortgageCalculator');
    }

    getPMIRate(): number {
        if (!this.hasPMI()) {
            return 0;
        }
        if (isValueRateInput(this.pmiValue)) {
            return this.pmiValue.rate;
        }
        else if (isValueAmountInput(this.pmiValue)) {
            return (this.pmiValue.amount / this.getLoanAmount()) * 100;
        }
        // throw new Error('Cannot be amount for MortgageCalculator');
    }

    toDTO(monthCounter: number): MortgageTxnDTO {
        return {
            key: TransactionKey.MORTGAGE,
            amount: Utility.round(this.getAmount(monthCounter)),
            percentage: Utility.round(this.getRate()),
            interestType: this.interestType,
            termLength: this.loanTermYears,
            mortgageAmount: Utility.round(this.getMortgageAmount()),
            loanAmount: Utility.round(this.getLoanAmount()),
            balanceAfterPayment: Utility.round(this.calculateBalanceAfterPayment(monthCounter)),
            principalAmountForPayment: Utility.round(this.getPrincipalAmountForPayment(monthCounter)),
            interestAmountForPayment: Utility.round(this.getInterestAmountForPayment(monthCounter)),
            totalInterestPaid: Utility.round(this.getTotalInterestPaid(monthCounter)),
            totalPrincipalPaid: Utility.round(this.getTotalPrincipalPaid(monthCounter)),
            percentageOfInterest: Utility.round(this.getPercentageOfInterest(monthCounter)),
            percentageOfPrincipal: Utility.round(this.getPercentageOfPrincipal(monthCounter)),
            hasPMI: this.hasPMI(),
            pmiAmount: Utility.round(this.getPMIAmount(monthCounter)),
            pmiRate: Utility.round(this.getPMIRate()),
            pmiDropOffPoint: this.pmiDropOffRatio,
        };
    }


}
