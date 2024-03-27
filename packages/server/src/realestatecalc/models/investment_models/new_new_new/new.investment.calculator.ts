import { AmortizationYearData, TransactionDetail, TransactionKey, TransactionType } from "./transaction.detail";

export type MonthlyDateData = {
    dateAsString: string;
    monthMod12: number;
    yearCounter: number;
};

export class InvestmentCalculator {

    private txnDetail: TransactionDetail;

    constructor(txnDetail: TransactionDetail) {
        this.txnDetail = txnDetail;
    }

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
                monthlyBreakdown: this.txnDetail.getAmortizationYearData(monthCounter),
            };
            ammortizationList.push(yrData);
        }

        let returnData = {
            purchaseData: this.txnDetail.getPurchaseData(),
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
        const yearCounter = this.getYear(monthCounter);
        return {
            dateAsString: dateAsString,
            monthMod12: monthMod12,
            yearCounter: yearCounter,
        }
    }

    private getYear(monthCounter: number): number {
        return Math.floor((monthCounter - 1) / 12) + 1;
    }

}