import { Injectable } from "@nestjs/common";
import {
    HighYeildSavingsResponseDTO, HighYeildSavingsRequest, Utility
} from '@realestatemanager/types';


@Injectable()
export class HighYieldSavingsCalcService {

    calculateFutureValueByMonth(highYeildSavingsRequest: HighYeildSavingsRequest): HighYeildSavingsResponseDTO[] {

        const annualInterestRate = Number(highYeildSavingsRequest.annualInterestRate);
        const years = Number(highYeildSavingsRequest.years);
        const initialDeposit = Number(highYeildSavingsRequest.initialDeposit);
        const monthlyDeposit = Number(highYeildSavingsRequest.monthlyDeposit ?? 0);

        // Convert the annual interest rate from a percentage to a decimal and adjust for monthly compounding
        const monthlyInterestRate = this.getMonthlyInterestRate(annualInterestRate);
        const totalMonths = years * 12;

        // Array to hold the future value at the end of each month
        const futureValueByMonth: HighYeildSavingsResponseDTO[] = [];

        // Initialize the future value with the initial deposit
        let endBalance = initialDeposit;
        let principal = initialDeposit;

        const today = new Date();

        // Get the first day of the next month
        const year = today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear();
        const nextMonth = (today.getMonth() + 1) % 12;

        let accumulatedInterest = 0;

        for (let monthCounter = 1; monthCounter <= totalMonths; monthCounter++) {
            const month = (nextMonth + (monthCounter - 1)) % 12;
            const yearOffset = Math.floor((nextMonth + (monthCounter - 1)) / 12);
            const date: Date = new Date(year + yearOffset, month, 1);
            const dateAsString = date.toLocaleDateString('en-US'); // date.toISOString().split('T')[0];

            const startBalance = endBalance; // The total amount at the start of the month including previous interest
            const startPrincipal = principal; // Principal amount before interest is applied in this month

            // Apply interest to the current balance
            endBalance += endBalance * monthlyInterestRate;

            // Add the monthly deposit for next month's compounding
            if (monthCounter < totalMonths) {
                endBalance += monthlyDeposit;
                principal += monthlyDeposit; // Principal is increased by the monthly deposit
            }

            const interest = endBalance - startBalance - monthlyDeposit;
            accumulatedInterest += interest;

            futureValueByMonth.push({
                date: dateAsString,
                month: ((monthCounter - 1) % 12) + 1,
                year: Math.floor((monthCounter - 1) / 12) + 1,
                startPrincipal: Utility.round(startPrincipal), // Use the correct principal amount at the start of the month
                startBalance: Utility.round(startBalance),
                interest: Utility.round(interest),
                accumulatedInterest: Utility.round(accumulatedInterest),
                endBalance: Utility.round(endBalance),
                endPrincipal: Utility.round(principal), // Principal at the end of the month after the deposit
            });
        }

        return futureValueByMonth;
    }

    private getMonthlyInterestRate(annualInterestRate: number): number {
        return Math.pow(1 + annualInterestRate / 100, 1 / 12) - 1;
    }

}
