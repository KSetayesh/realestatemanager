import { PurchasePrice } from "../purchase.price";
import { RentEstimate } from "../rent.estimate";
import { TxnDTO } from "../calculate.txn.interface";
import { RecurringFixedCost } from "../recurring.fixed.cost";
import { Income } from "../income";
import { InitialCost } from "../initial.cost";
import { RecurringOperationalCost } from "../recurring.operational.cost";

export enum TransactionType {
    INITIAL_EXPENSE = 'Initial Expense',
    FIXED_RECURRING_EXPENSE = 'Fixed Recurring Expense',
    OPERATIONAL_RECURRING_EXPENSE = 'Operational Recurring Expense',
    INCOME_STREAMS = 'Income Streams',
    FINANCING = 'Financing',
    MORTGAGE = 'Mortgage',
};

export enum TransactionKey {
    // LOAN_AMOUNT = 'Loan Amount',
    PURCHASE_PRICE = 'Purchase Price',

    MORTGAGE = 'Mortgage',
    // MORTGAGE_INTEREST = 'Mortgage Interest',
    // MORTGAGE_PRINCIPAL = 'Mortgage Principal',
    // MORTGAGE_AMOUNT = 'Mortgage Amount',
    // PMI = 'PMI',

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

export class Calculate {

    // Financing
    private purchasePrice: PurchasePrice;

    // Fixed Recurring Expenses
    private monthlyHOAFeesAmount: RecurringFixedCost;
    private monthlyHomeInsuranceAmount: RecurringFixedCost;
    private monthlyPropertyTax: RecurringFixedCost;

    // Income Streams
    private rentEstimate: RentEstimate;
    private storageUnitFees: Income;
    private parkingFee: Income;
    private laundryService: Income;
    private otherAdditionalIncomeStreams: Income;

    // Initial Expenses
    private downPayment: InitialCost;
    private closingCosts: InitialCost;
    private initialRepairCosts: InitialCost;
    private legalAndProfessionalFees: InitialCost;
    private travelingCosts: InitialCost;
    private otherInitialExpenses: InitialCost;

    // Recurring Operational Expenses
    private capExReserveRate: RecurringOperationalCost;
    private maintenanceRate: RecurringOperationalCost;
    private otherExpenseRate: RecurringOperationalCost;
    private propertyManagementRate: RecurringOperationalCost;
    private vacancyRate: RecurringOperationalCost;

    build(monthCounter: number = 0) {
        const initialValues = this.getInitialValues();
        const ammortizationYearData = this.getAmortizationYearData(monthCounter);
    }

    private getInitialValues() {
        return {
            [TransactionType.FINANCING]: {
                type: TransactionType.FINANCING,
                totalAmount: 0,
                breakdown: {
                    [TransactionKey.PURCHASE_PRICE]: this.purchasePrice.getInitialPurchasePrice(),
                },
            },
            [TransactionType.MORTGAGE]: {
                type: TransactionType.MORTGAGE,
                totalAmount: 0,
                breakdown: {
                    [TransactionKey.MORTGAGE]: {},
                },
            },
            [TransactionType.INITIAL_EXPENSE]: {
                type: TransactionType.INITIAL_EXPENSE,
                totalAmount: 0,
                breakdown: {
                    [TransactionKey.DOWN_PAYMENT]: this.getDownPaymentDTO(),
                    [TransactionKey.LEGAL_AND_PROFESSIONAL_FEES]: this.getLegalAndProfessionalFeesDTO(),
                    [TransactionKey.INITIAL_REPAIR_COST]: this.getInitialRepairCostsDTO(),
                    [TransactionKey.CLOSING_COST]: this.getClosingCostsDTO(),
                    [TransactionKey.TRAVELING_COST]: this.getTravelingCostsDTO(),
                    [TransactionKey.OTHER_INITIAL_EXPENSES]: this.getOtherInitialExpensesDTO(),
                },
            },
        };
    }

    getAmortizationYearData(monthCounter: number): any { //AmortizationYearData {
        const yearCounter = this.getYear(monthCounter);
        return {
            [TransactionType.FINANCING]: {
                type: TransactionType.FINANCING,
                totalAmount: 0,
                breakdown: {
                    [TransactionKey.PURCHASE_PRICE]: this.purchasePrice.toDTO(), //come back to this
                },
            },
            [TransactionType.OPERATIONAL_RECURRING_EXPENSE]: {
                type: TransactionType.OPERATIONAL_RECURRING_EXPENSE,
                totalAmount: 0,
                breakdown: {
                    [TransactionKey.PROPERTY_MANAGEMENT_EXPENSE]: this.getPropertyManagementRateDTO(yearCounter),
                    [TransactionKey.VACANCY_EXPENSE]: this.getVacancyRateDTO(yearCounter),
                    [TransactionKey.MAINTENANCE_EXPENSE]: this.getMaintenanceRateDTO(yearCounter),
                    [TransactionKey.OTHER_EXPENSES]: this.getOtherExpenseRateDTO(yearCounter),
                    [TransactionKey.CAP_EX_RESERVE_EXPENSE]: this.getCapExReserveRateDTO(yearCounter),
                },
            },
            [TransactionType.INCOME_STREAMS]: {
                type: TransactionType.INCOME_STREAMS,
                totalAmount: 0,
                breakdown: {
                    [TransactionKey.RENTAL_INCOME]: this.getRentEstimateDTO().toDTO(), // come back to this
                    [TransactionKey.PARKING_FEES]: this.getParkingFeeDTO(yearCounter),
                    [TransactionKey.LAUNDRY_SERVICES]: this.getLaundryServiceDTO(yearCounter),
                    [TransactionKey.STORAGE_UNIT_FEES]: this.getStorageUnitFeesDTO(yearCounter),
                    [TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS]: this.getOtherAdditionalIncomeStreamsDTO(yearCounter),
                },
            },
            [TransactionType.FIXED_RECURRING_EXPENSE]: {
                type: TransactionType.FIXED_RECURRING_EXPENSE,
                totalAmount: 0,
                breakdown: {
                    [TransactionKey.PROPERTY_TAX]: this.getMonthlyPropertyTaxDTO(yearCounter),
                    [TransactionKey.HOA_FEE]: this.getMonthlyHOAFeesAmountDTO(yearCounter),
                    [TransactionKey.HOME_INSURANCE]: this.getMonthlyHomeInsuranceAmountDTO(yearCounter),
                },
            },
            [TransactionType.MORTGAGE]: {
                type: TransactionType.MORTGAGE,
                totalAmount: 0,
                breakdown: {
                    [TransactionKey.MORTGAGE]: {},
                },
            },
        };

    }

    private getYear(monthCounter: number): number {
        return Math.floor((monthCounter - 1) / 12) + 1;
    }

    // Fixed Recurring Expenses
    private getMonthlyHOAFeesAmountDTO(numberOfYears: number): TxnDTO {
        return this.monthlyHOAFeesAmount.toDTO(this.rentEstimate, numberOfYears);
    }

    private getMonthlyHomeInsuranceAmountDTO(numberOfYears: number): TxnDTO {
        return this.monthlyHomeInsuranceAmount.toDTO(this.rentEstimate, numberOfYears);
    }

    private getMonthlyPropertyTaxDTO(numberOfYears: number): TxnDTO {
        return this.monthlyPropertyTax.toDTO(this.rentEstimate, numberOfYears);
    }

    // Income Streams

    // come back this
    private getRentEstimateDTO(): any {
        return this.rentEstimate.toDTO();
    }

    private getStorageUnitFeesDTO(numberOfYears: number): TxnDTO {
        return this.storageUnitFees.toDTO(this.rentEstimate, numberOfYears);
    }

    private getParkingFeeDTO(numberOfYears: number): TxnDTO {
        return this.parkingFee.toDTO(this.rentEstimate, numberOfYears);
    }

    private getLaundryServiceDTO(numberOfYears: number): TxnDTO {
        return this.laundryService.toDTO(this.rentEstimate, numberOfYears);
    }

    private getOtherAdditionalIncomeStreamsDTO(numberOfYears: number): TxnDTO {
        return this.otherAdditionalIncomeStreams.toDTO(this.rentEstimate, numberOfYears);
    }

    // Initial Expenses
    private getDownPaymentDTO(): TxnDTO {
        return this.downPayment.toDTO(this.purchasePrice);
    }

    private getClosingCostsDTO(): TxnDTO {
        return this.closingCosts.toDTO(this.purchasePrice);
    }

    private getInitialRepairCostsDTO(): TxnDTO {
        return this.initialRepairCosts.toDTO(this.purchasePrice);
    }

    private getLegalAndProfessionalFeesDTO(): TxnDTO {
        return this.legalAndProfessionalFees.toDTO(this.purchasePrice);
    }

    private getTravelingCostsDTO(): TxnDTO {
        return this.travelingCosts.toDTO(this.purchasePrice);
    }

    private getOtherInitialExpensesDTO(): TxnDTO {
        return this.otherInitialExpenses.toDTO(this.purchasePrice);
    }

    // Recurring Operational Expenses
    private getCapExReserveRateDTO(numberOfYears: number): TxnDTO {
        return this.capExReserveRate.toDTO(this.rentEstimate, numberOfYears);
    }

    private getMaintenanceRateDTO(numberOfYears: number): TxnDTO {
        return this.maintenanceRate.toDTO(this.rentEstimate, numberOfYears);
    }

    private getOtherExpenseRateDTO(numberOfYears: number): TxnDTO {
        return this.otherExpenseRate.toDTO(this.rentEstimate, numberOfYears);
    }

    private getPropertyManagementRateDTO(numberOfYears: number): TxnDTO {
        return this.propertyManagementRate.toDTO(this.rentEstimate, numberOfYears);
    }

    private getVacancyRateDTO(numberOfYears: number): TxnDTO {
        return this.vacancyRate.toDTO(this.rentEstimate, numberOfYears);
    }

}