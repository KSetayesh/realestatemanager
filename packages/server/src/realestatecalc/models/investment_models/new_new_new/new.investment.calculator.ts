import { TransactionDetail } from "./transaction.detail";

export class InvestmentCalculator {

    private txnDetail: TransactionDetail;

    constructor(txnDetail: TransactionDetail) {
        this.txnDetail = txnDetail;
    }

    createInvestmentMetrics() {
        for (let i = 0; i < 30 * 12; i++) {
            let yrData = this.txnDetail.getAmortizationYearData(i);
            console.log(yrData);
        }
        return;
    }
}