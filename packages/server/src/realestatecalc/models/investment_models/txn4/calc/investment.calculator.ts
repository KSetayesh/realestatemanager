import { getYear } from "src/shared/Constants";
import { Calculate } from "./calculate";

export type MonthlyDateData = {
    dateAsString: string;
    monthMod12: number;
    yearCounter: number;
};

export class InvestmentCalculator {

    private calculate: Calculate;

    constructor(calculate: Calculate) {
        this.calculate = calculate;
    }

    // createInvestmentMetrics(): any {

    //     return this.calculate.createInvestmentMetrics();
    // }


    createInvestmentMetrics(): any {
        let ammortizationList: any[] = [];

        const totalPayments = 12 * 30;
        const today = new Date();
        const year = today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear();
        const nextMonth = (today.getMonth() + 1) % 12;


        for (let monthCounter = 1; monthCounter <= totalPayments; monthCounter++) {
            const monthlyDateData: MonthlyDateData = this.getDateData(year, nextMonth, monthCounter);

            let yrData = {
                yearCounter: monthlyDateData.yearCounter,
                month: monthlyDateData.monthMod12,
                date: monthlyDateData.dateAsString,
                monthlyBreakdown: this.calculate.createInvestmentMetrics(monthCounter),
            };
            ammortizationList.push(yrData);
        }

        let returnData = {
            initialValues: this.calculate.getInitialValues(),
            ammortizationList: ammortizationList
        }

        return returnData;
    }

    private getDateData(year: number, nextMonth: number, monthCounter: number): MonthlyDateData {
        const month = (nextMonth + (monthCounter - 1)) % 12;
        const yearOffset = Math.floor((nextMonth + (monthCounter - 1)) / 12);
        const date: Date = new Date(year + yearOffset, month, 1);
        const dateAsString = date.toLocaleDateString('en-US'); // date.toISOString().split('T')[0];
        const monthMod12 = ((monthCounter - 1) % 12) + 1;
        const yearCounter = getYear(monthCounter);
        return {
            dateAsString: dateAsString,
            monthMod12: monthMod12,
            yearCounter: yearCounter,
        }
    }



}