import { ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { Transaction, TransactionDTO } from "./transaction";
import { TransactionKey, TransactionType } from "./transaction.detail";
import { TransactionCalculator } from "../new_calculators/transaction.calculator";
import { MortgageCalculator } from "../new_calculators/mortgage.calculator";

export type TransactionBreakdownDTO = {
    totalAmount: number;
    breakdown: Record<TransactionKey, TransactionDTO>;
};

export type TransactionByTypeDTO = {
    [key in TransactionType]?: TransactionBreakdownDTO;
};

export type TransactionRecordDTO = Record<TransactionType, TransactionByTypeDTO>;

export type BaseTransaction = Transaction<TransactionCalculator>;

export type BaseMortgageTransaction = Transaction<MortgageCalculator>;

export class TransactionBreakdown<T extends TransactionCalculator> {

    protected txnMap: Map<TransactionKey, Transaction<T>>;

    constructor(txnMap: Map<TransactionKey, Transaction<T>>) {
        this.txnMap = txnMap;
    }

    //Come back to this function
    getTotalFinancingAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.getTransactionAmount(this.getFinancingTransactions(), numberOfYears);
    }

    getTotalIncomesAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.getTransactionAmount(this.getIncomeTransactions(), numberOfYears);
    }

    getTotalFixedRecurringExpenses(numberOfYears: number = 0): ValueAmountInput {
        return this.getTransactionAmount(this.getMortgageRelatedExpenseTransactions(), numberOfYears);
    }

    getTotalOperationalRecurringExpenses(numberOfYears: number = 0): ValueAmountInput {
        return this.getTransactionAmount(this.getRecurringExpenseTransactions(), numberOfYears);
    }

    getTotalInitialExpenses(): ValueAmountInput {
        return this.getTransactionAmount(this.getInititalExpenseTransactions());
    }

    getLoanAmount(): ValueAmountInput {
        return {
            type: ValueType.AMOUNT,
            amount: this.getPurchasePrice().amount * (this.getDownPaymentRate().rate / 100),
        }
    }

    getPurchasePrice(): ValueAmountInput {
        return this.getPurchasePriceTxn().getAmount();
    }

    getFutureDatedPrice(numberOfYears: number = 0): ValueAmountInput {
        return this.getPurchasePriceTxn().getAmount(numberOfYears);
    }

    getMonthlyPropertyTaxAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.getPropertyTaxTxn().getAmount(numberOfYears);
    }

    // Do we need numberOfYears ?
    getMonthlyPropertyTaxRate(numberOfYears: number = 0): ValueRateInput {
        return this.getPropertyTaxTxn().getRate(numberOfYears);
    }

    getHOAFeesAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.getHOAFeesTxn().getAmount(numberOfYears);
    }

    // Do we need numberOfYears ?
    getHOAFeesRate(numberOfYears: number = 0): ValueRateInput {
        return this.getHOAFeesTxn().getRate(numberOfYears);
    }

    getHomeInsuranceAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.getHomeInsuranceTxn().getAmount(numberOfYears);
    }

    // Do we need numberOfYears ?
    getHomeInsuranceRate(numberOfYears: number = 0): ValueRateInput {
        return this.getHomeInsuranceTxn().getRate(numberOfYears);
    }

    getRentalIncomeAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.getRentalIncomeTxn().getAmount(numberOfYears);
    }

    getParkingFeesAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.getParkingFeesTxn().getAmount(numberOfYears);
    }

    getLaundryServicesAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.getLaundryServicesTxn().getAmount(numberOfYears);
    }

    getStorageUnitFeesAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.getStorageUnitFeesTxn().getAmount(numberOfYears);
    }

    getOtherAdditionalIncomesStreamsAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.getOtherAdditionalIncomesStreamsTxn().getAmount(numberOfYears);
    }

    getPropertyManagementAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.getPropertyManagementRateTxn().getAmount(numberOfYears);
    }

    // Do not need numberOfYears
    getPropertyManagementRate(): ValueRateInput {
        return this.getPropertyManagementRateTxn().getRate();
    }

    getVacancyAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.getVacancyRateTxn().getAmount(numberOfYears);
    }

    // Do not need numberOfYears
    getVacancyRate(): ValueRateInput {
        return this.getVacancyRateTxn().getRate();
    }

    getMaintenanceAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.getMaintenanceRateTxn().getAmount(numberOfYears);
    }

    // Do not need numberOfYears
    getMaintenanceRate(): ValueRateInput {
        return this.getMaintenanceRateTxn().getRate();
    }

    getOtherExpensesAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.getOtherExpensesRateTxn().getAmount(numberOfYears);
    }

    // Do not need numberOfYears
    getOtherExpensesRate(): ValueRateInput {
        return this.getOtherExpensesRateTxn().getRate();
    }

    getCapExReserveAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.getCapExReserveRateTxn().getAmount(numberOfYears);
    }

    // Do not need numberOfYears
    getCapExReserveRate(): ValueRateInput {
        return this.getCapExReserveRateTxn().getRate();
    }

    // Do not need numberOfYears
    getDownPaymentAmount(): ValueAmountInput {
        return this.getDownPaymentTxn().getAmount();
    }

    // Do not need numberOfYears
    getDownPaymentRate(): ValueRateInput {
        return this.getDownPaymentTxn().getRate();
    }

    // Do not need numberOfYears
    getLegalAndProfessionalFeesAmount(): ValueAmountInput {
        return this.getLegalAndProfessionalFeesTxn().getAmount();
    }

    // Do not need numberOfYears
    getLegalAndProfessionalFeesRate(): ValueRateInput {
        return this.getLegalAndProfessionalFeesTxn().getRate();
    }

    // Do not need numberOfYears
    getInitialRepairAmount(): ValueAmountInput {
        return this.getInitialRepairCostsTxn().getAmount();
    }

    // Do not need numberOfYears
    getInitialRepairRate(): ValueRateInput {
        return this.getInitialRepairCostsTxn().getRate();
    }

    // Do not need numberOfYears
    getClosingCostsAmount(): ValueAmountInput {
        return this.getClosingCostsTxn().getAmount();
    }

    // Do not need numberOfYears
    getClosingCostsRate(): ValueRateInput {
        return this.getClosingCostsTxn().getRate();
    }

    // Do not need numberOfYears
    getTravelingCostsAmount(): ValueAmountInput {
        return this.getTravelingCostsTxn().getAmount();
    }

    // Do not need numberOfYears
    getTravelingCostsRate(): ValueRateInput {
        return this.getTravelingCostsTxn().getRate();
    }

    // Do not need numberOfYears
    getOtherInitialExpensesAmount(): ValueAmountInput {
        return this.getOtherInitialExpensesTxn().getAmount();
    }

    // Do not need numberOfYears
    getOtherInitialExpensesRate(): ValueRateInput {
        return this.getOtherInitialExpensesTxn().getRate();
    }

    //------------------------------------------------------------------------------------------------

    getPurchasePriceTxn(): Transaction<TransactionCalculator> {
        return this.getTransactionByKey(TransactionKey.PURCHASE_PRICE);
    }

    getPropertyTaxTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.PROPERTY_TAX);
    }

    getHOAFeesTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.HOA_FEE);
    }

    getHomeInsuranceTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.HOME_INSURANCE);
    }

    getRentalIncomeTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.RENTAL_INCOME);
    }

    getParkingFeesTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.PARKING_FEES);
    }

    getLaundryServicesTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.LAUNDRY_SERVICES);
    }

    getStorageUnitFeesTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.STORAGE_UNIT_FEES);
    }

    getOtherAdditionalIncomesStreamsTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS);
    }

    getPropertyManagementRateTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.PROPERTY_MANAGEMENT_EXPENSE);
    }

    getVacancyRateTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.VACANCY_EXPENSE);
    }

    getMaintenanceRateTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.MAINTENANCE_EXPENSE);
    }

    getOtherExpensesRateTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.OTHER_EXPENSES);
    }

    getCapExReserveRateTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.CAP_EX_RESERVE_EXPENSE);
    }

    getDownPaymentTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.DOWN_PAYMENT);
    }

    getLoanTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.LOAN_AMOUNT);
    }

    getLegalAndProfessionalFeesTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.LEGAL_AND_PROFESSIONAL_FEES);
    }

    getInitialRepairCostsTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.INITIAL_REPAIR_COST);
    }

    getClosingCostsTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.CLOSING_COST);
    }

    getTravelingCostsTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.TRAVELING_COST);
    }

    getOtherInitialExpensesTxn(): BaseTransaction {
        return this.getTransactionByKey(TransactionKey.OTHER_INITIAL_EXPENSES);
    }

    // getMortgageAmountTxn(): Transaction<MortgageCalculator> {
    //     return this.getTransactionByKey(TransactionKey.MORTGAGE_AMOUNT);
    // }

    // getMortgageInterestTxn(): Transaction<MortgageCalculator> {
    //     return this.getTransactionByKey(TransactionKey.MORTGAGE_INTEREST);
    // }

    // getMortgagePrincipalTxn(): Transaction<MortgageCalculator> {
    //     return this.getTransactionByKey(TransactionKey.MORTGAGE_PRINCIPAL);
    // }

    // getPMITxn(): Transaction<MortgageCalculator> {
    //     return this.getTransactionByKey(TransactionKey.PMI);
    // }

    //------------------------------------------------------------------------------------------------

    // Try and get rid off this, also needs the calculator set
    // private createLoanTransaction() {
    //     const loanTxn: Transaction = new Transaction(
    //         TransactionKey.LOAN_AMOUNT,
    //         this.getLoanAmount(),
    //         new DirectValueCalculator(this.getPurchasePrice()),
    //         TransactionType.FINANCING,
    //         false,
    //         true,
    //         false,
    //     );
    //     this.txnMap.set(TransactionKey.LOAN_AMOUNT, loanTxn);
    // }

    private getIncomeTransactions(): BaseTransaction[] {
        return this.getGroupOfTransactions(TransactionType.INCOME_STREAMS);
    }

    private getInititalExpenseTransactions(): BaseTransaction[] {
        return this.getGroupOfTransactions(TransactionType.INITIAL_EXPENSE);
    }

    private getRecurringExpenseTransactions(): BaseTransaction[] {
        return this.getGroupOfTransactions(TransactionType.OPERATIONAL_RECURRING_EXPENSE);
    }

    private getMortgageRelatedExpenseTransactions(): BaseTransaction[] {
        return this.getGroupOfTransactions(TransactionType.FIXED_RECURRING_EXPENSE);
    }

    private getFinancingTransactions(): BaseTransaction[] {
        return this.getGroupOfTransactions(TransactionType.FINANCING);
    }

    // private getMortgageTransactions(): Transaction<MortgageCalculator>[] {
    //     return this.getGroupOfTransactions(TransactionType.MORTGAGE);
    // }

    private getTransactionAmount(transactions: BaseTransaction[], numberOfYears: number = 0): ValueAmountInput {
        return {
            type: ValueType.AMOUNT,
            amount: transactions.reduce((total, txn) => total + txn.getAmount(numberOfYears).amount, 0),
        };
    }

    protected getGroupOfTransactions(...txnType: TransactionType[]): Transaction<T>[] {
        const txns: Transaction<T>[] = [];
        const txnTypeSet: Set<TransactionType> = new Set(txnType);
        this.txnMap.forEach((txn) => {
            if (txnTypeSet.has(txn.getTransactionType())) {
                txns.push(txn);
            }
        });
        return txns;
    }

    protected getTransactionByKey(key: TransactionKey): Transaction<T> {
        const transaction = this.txnMap.get(key);
        if (!transaction) {
            throw new Error(`Transaction with key ${key} not found.`);
        }
        return transaction;
    }

}


export class MortgageTransactionBreakdown extends TransactionBreakdown<MortgageCalculator> {

    constructor(txnMap: Map<TransactionKey, BaseMortgageTransaction>) {
        super(txnMap);
    }

    getMortgageAmountTxn(): BaseMortgageTransaction {
        return this.getTransactionByKey(TransactionKey.MORTGAGE_AMOUNT);
    }

    getMortgageInterestTxn(): BaseMortgageTransaction {
        return this.getTransactionByKey(TransactionKey.MORTGAGE_INTEREST);
    }

    getMortgagePrincipalTxn(): BaseMortgageTransaction {
        return this.getTransactionByKey(TransactionKey.MORTGAGE_PRINCIPAL);
    }

    getPMITxn(): BaseMortgageTransaction {
        return this.getTransactionByKey(TransactionKey.PMI);
    }

}
