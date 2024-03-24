import { ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { Transaction, TransactionDTO } from "./transaction";

export enum TransactionType {
    INITIAL_EXPENSE,
    MORTGAGE_RELATED_EXPENSE,
    RECURRING_EXPENSE,
    INCOME,
    PURCHASE_RELATED,
};

export enum TransactionKey {
    LOAN_AMOUNT = 'Loan Amount',
    PURCHASE_PRICE = 'Purchase Price',
    PROPERTY_TAX = 'Property Tax',
    HOA_FEE = 'Monthly HOA Fee',
    HOME_INSURANCE = 'Monthly Home Insurance',
    RENTAL_INCOME = 'Rental Income',
    PARKING_FEES = 'Parking Fees',
    LAUNDRY_SERVICES = 'Laundry Service',
    STORAGE_UNIT_FEES = 'Storage Unit Fees',
    OTHER_ADDITIONAL_INCOME_STREAMS = 'Other Additional Incomes Streams',
    PROPERTY_MANAGEMENT_EXPENSE = 'Property Management Expense',
    VACANCY_EXPENSE = 'Vacancy Expense',
    MAINTENANCE_EXPENSE = 'Maintenance Expense',
    OTHER_EXPENSES = 'Other Expeneses',
    CAP_EX_RESERVE_EXPENSE = 'Cap Ex Reserve Expense',
    DOWN_PAYMENT = 'Down Payment',
    LEGAL_AND_PROFESSIONAL_FEES = 'Legal And Professional Fees',
    INITIAL_REPAIR_COST = 'Initial Repair Costs',
    CLOSING_COST = 'Closing Costs',
    TRAVELING_COST = 'Traveling Costs',
    OTHER_INITIAL_EXPENSES = 'Other Initial Expenses',
};

export type TransactionBreakdownDTO = {
    totalAmount: number;
    breakdown: Record<TransactionKey, TransactionDTO>;
};

export type TransactionByTypeDTO = {
    [key in TransactionType]?: TransactionBreakdownDTO;
};

export type TransactionRecordDTO = Record<TransactionType, TransactionByTypeDTO>;


export class FinancialTransactionBreakdown {

    private txnMap: Map<TransactionKey, Transaction>;

    constructor(txnMap: Map<TransactionKey, Transaction>) {
        this.txnMap = txnMap;
    }

    // private purchasePrice: Transaction;

    // private monthlyPropertyTaxAmount: Transaction;
    // private monthlyHOAFeesAmount: Transaction;
    // private monthlyHomeInsuranceAmount: Transaction;

    // private rentalIncome: Transaction;
    // private parkingFees: Transaction;
    // private laundryServices: Transaction;
    // private storageUnitFees: Transaction;
    // private otherAdditionalIncomeStreams: Transaction;

    // private propertyManagementRate: Transaction;
    // private vacancyRate: Transaction;
    // private maintenanceRate: Transaction;
    // private otherExpensesRate: Transaction;
    // private capExReserveRate: Transaction;

    // private downPayment: Transaction;
    // private legalAndProfessionalFees: Transaction;
    // private initialRepairCosts: Transaction;
    // private closingCosts: Transaction;
    // private travelingCosts: Transaction;
    // private otherInitialExpenses: Transaction;


    toDTO(numberOfYears: number = 0): TransactionRecordDTO {
        return [
            this.getPurchaseRelatedDTO(numberOfYears),
            this.getIncomesDTO(numberOfYears),
            this.getMortgageRelatedExpensesDTO(numberOfYears),
            this.getRecurringExpensesDTO(numberOfYears),
            this.getInitialExpensesDTO(numberOfYears),
        ];
    }


    getTotalIncomesAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.getTransactionAmount(this.getIncomeTransactions(), numberOfYears);
    }

    getTotalMortgageRelatedExpenses(numberOfYears: number = 0): ValueAmountInput {
        return this.getTransactionAmount(this.getMortgageRelatedExpenseTransactions(), numberOfYears);
    }

    getTotalRecurringExpenses(numberOfYears: number = 0): ValueAmountInput {
        return this.getTransactionAmount(this.getRecurringExpenseTransactions(), numberOfYears);
    }

    getTotalInitialExpenses(numberOfYears: number = 0): ValueAmountInput {
        return this.getTransactionAmount(this.getInititalExpenseTransactions(), numberOfYears);
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

    private getIncomeTransactions(): Transaction[] {
        return this.getGroupOfTransactions(TransactionType.INCOME);
    }

    private getInititalExpenseTransactions(): Transaction[] {
        return this.getGroupOfTransactions(TransactionType.INITIAL_EXPENSE);
    }

    private getRecurringExpenseTransactions(): Transaction[] {
        return this.getGroupOfTransactions(TransactionType.RECURRING_EXPENSE);
    }

    private getMortgageRelatedExpenseTransactions(): Transaction[] {
        return this.getGroupOfTransactions(TransactionType.MORTGAGE_RELATED_EXPENSE);
    }

    private getPurchaseRelatedDTO(numberOfYears: number = 0): TransactionByTypeDTO {
        const txnType: TransactionType = TransactionType.PURCHASE_RELATED;
        const txns: Transaction[] = this.getIncomeTransactions();
        return this.createTransactionTypeDTO(txnType, txns, numberOfYears);
    }

    private getIncomesDTO(numberOfYears: number = 0): TransactionByTypeDTO {
        const txnType: TransactionType = TransactionType.INCOME;
        const txns: Transaction[] = this.getIncomeTransactions();
        return this.createTransactionTypeDTO(txnType, txns, numberOfYears);
    }

    private getMortgageRelatedExpensesDTO(numberOfYears: number = 0): TransactionByTypeDTO {
        const txnType: TransactionType = TransactionType.MORTGAGE_RELATED_EXPENSE;
        const txns: Transaction[] = this.getMortgageRelatedExpenseTransactions();
        return this.createTransactionTypeDTO(txnType, txns, numberOfYears);
    }

    private getRecurringExpensesDTO(numberOfYears: number = 0): TransactionByTypeDTO {
        const txnType: TransactionType = TransactionType.RECURRING_EXPENSE;
        const txns: Transaction[] = this.getRecurringExpenseTransactions();
        return this.createTransactionTypeDTO(txnType, txns, numberOfYears);
    }

    private getInitialExpensesDTO(numberOfYears: number = 0): TransactionByTypeDTO {
        const txnType: TransactionType = TransactionType.INITIAL_EXPENSE;
        const txns: Transaction[] = this.getInititalExpenseTransactions();
        return this.createTransactionTypeDTO(txnType, txns, numberOfYears);
    }

    private createTransactionTypeDTO(txnType: TransactionType, txns: Transaction[], numberOfYears: number = 0): TransactionByTypeDTO {
        const totalInitialExpenses: number = this.getTransactionAmount(txns).amount;
        let result = {
            totalAmount: totalInitialExpenses,
            breakdown: {},
        };
        txns.forEach((txn) => {
            const txnAmount: ValueAmountInput = txn.getAmount(numberOfYears);
            txn.setCumulativeAmount(txnAmount);
            const txnDTO: TransactionDTO = txn.toDTO(numberOfYears);
            const txnKey: TransactionKey = txn.getTransactionKey();
            result.breakdown[txnKey] = txnDTO;
        });

        return {
            [txnType]: result,
        };

    }

    private getTransactionAmount(transactions: Transaction[], numberOfYears: number = 0): ValueAmountInput {
        return {
            type: ValueType.AMOUNT,
            amount: transactions.reduce((total, txn) => total + txn.getAmount(numberOfYears).amount, 0),
        };
    }

    private getGroupOfTransactions(...txnType: TransactionType[]): Transaction[] {
        const txns: Transaction[] = [];
        const txnTypeSet: Set<TransactionType> = new Set(txnType);
        this.txnMap.forEach((txn) => {
            if (txnTypeSet.has(txn.getTransactionType())) {
                txns.push(txn);
            }
        });
        return txns;
    }

    getPurchasePriceTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.PURCHASE_PRICE);
    }

    getPropertyTaxTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.PURCHASE_PRICE);
    }

    getHOAFeesTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.HOA_FEE);
    }

    getHomeInsuranceTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.HOME_INSURANCE);
    }

    getRentalIncomeTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.RENTAL_INCOME);
    }

    getParkingFeesTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.PARKING_FEES);
    }

    getLaundryServicesTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.LAUNDRY_SERVICES);
    }

    getStorageUnitFeesTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.STORAGE_UNIT_FEES);
    }

    getOtherAdditionalIncomesStreamsTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS);
    }

    getPropertyManagementRateTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.PROPERTY_MANAGEMENT_EXPENSE);
    }

    getVacancyRateTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.VACANCY_EXPENSE);
    }

    getMaintenanceRateTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.MAINTENANCE_EXPENSE);
    }

    getOtherExpensesRateTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.OTHER_EXPENSES);
    }

    getCapExReserveRateTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.CAP_EX_RESERVE_EXPENSE);
    }

    getDownPaymentTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.DOWN_PAYMENT);
    }

    getLegalAndProfessionalFeesTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.LEGAL_AND_PROFESSIONAL_FEES);
    }

    getInitialRepairCostsTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.INITIAL_REPAIR_COST);
    }

    getClosingCostsTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.CLOSING_COST);
    }

    getTravelingCostsTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.TRAVELING_COST);
    }

    getOtherInitialExpensesTxn(): Transaction {
        return this.getTransactionByKey(TransactionKey.OTHER_INITIAL_EXPENSES);
    }

    private getTransactionByKey(key: TransactionKey): Transaction {
        const transaction = this.txnMap.get(key);
        if (!transaction) {
            throw new Error(`Transaction with key ${key} not found.`);
        }
        return transaction;
    }

}

