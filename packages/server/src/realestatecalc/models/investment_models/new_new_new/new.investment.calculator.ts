import { TransactionDetail } from "./transaction.detail";

export class InvestmentCalculator {

    private txnDetail: TransactionDetail;

    constructor(txnDetail: TransactionDetail) {
        this.txnDetail = txnDetail;
    }

    createInvestmentMetrics() {
        return;
    }
}