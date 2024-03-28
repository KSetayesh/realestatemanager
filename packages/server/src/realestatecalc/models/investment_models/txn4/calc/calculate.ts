import { Utility } from "@realestatemanager/shared";
import { CapExReserveRate } from "../cap.ex.reserve.rate";
import { ClosingCosts } from "../closing.costs";
import { InititalRepairCosts } from "../initital.repair.costs";
import { LaundryService } from "../laundry.service";
import { LegalAndProfessionalFee } from "../legal.and.professional.fees";
import { MaintenanceRate } from "../maintenance.rate";
import { MonthlyHOAFeesAmount } from "../monthly.hoa.amount";
import { MonthlyHomeInsuranceAmount } from "../monthly.home.insurance.amount";
import { MonthlyPropertyTax } from "../monthly.property.tax";
import { OtherAdditionalIncomeStreams } from "../other.additional.income.streams";
import { OtherExpenseRate } from "../other.expense.rate";
import { OtherInitialExpenses } from "../other.initital.expenses";
import { ParkingFee } from "../parking.fee";
import { PropertyManagementRate } from "../property.management.rate";
import { PurchasePrice } from "../purchase.price";
import { RentEstimate } from "../rent.estimate";
import { StorageUnitFees } from "../storage.unit.fees";
import { TravelingCosts } from "../traveling.costs";
import { VacancyRate } from "../vacancy.rate";
import { DownPayment } from "../downpayment";
import { TxnDTO } from "../calculate.txn.interface";

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
    private monthlyHOAFeesAmount: MonthlyHOAFeesAmount;
    private monthlyHomeInsuranceAmount: MonthlyHomeInsuranceAmount;
    private monthlyPropertyTax: MonthlyPropertyTax;

    // Income Streams
    private rentEstimate: RentEstimate;
    private storageUnitFees: StorageUnitFees;
    private parkingFee: ParkingFee;
    private laundryService: LaundryService;
    private otherAdditionalIncomeStreams: OtherAdditionalIncomeStreams;

    // Initial Expenses
    private downPayment: DownPayment;
    private closingCosts: ClosingCosts;
    private initialRepairCosts: InititalRepairCosts;
    private legalAndProfessionalFees: LegalAndProfessionalFee;
    private travelingCosts: TravelingCosts;
    private otherInitialExpenses: OtherInitialExpenses;

    // Recurring Operational Expenses
    private capExReserveRate: CapExReserveRate;
    private maintenanceRate: MaintenanceRate;
    private otherExpenseRate: OtherExpenseRate;
    private propertyManagementRate: PropertyManagementRate;
    private vacancyRate: VacancyRate;

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
                    [TransactionKey.PROPERTY_MANAGEMENT_EXPENSE]: this.getPropertyManagementRateDTO(yearCounter, 0),
                    [TransactionKey.VACANCY_EXPENSE]: this.getVacancyRateDTO(yearCounter, 0),
                    [TransactionKey.MAINTENANCE_EXPENSE]: this.getMaintenanceRateDTO(yearCounter, 0),
                    [TransactionKey.OTHER_EXPENSES]: this.getOtherExpenseRateDTO(yearCounter, 0),
                    [TransactionKey.CAP_EX_RESERVE_EXPENSE]: this.getCapExReserveRateDTO(yearCounter, 0),
                },
            },
            [TransactionType.INCOME_STREAMS]: {
                type: TransactionType.INCOME_STREAMS,
                totalAmount: 0,
                breakdown: {
                    [TransactionKey.RENTAL_INCOME]: this.getRentEstimateDTO().toDTO(), // come back to this
                    [TransactionKey.PARKING_FEES]: this.getParkingFeeDTO(yearCounter, 0),
                    [TransactionKey.LAUNDRY_SERVICES]: this.getLaundryServiceDTO(yearCounter, 0),
                    [TransactionKey.STORAGE_UNIT_FEES]: this.getStorageUnitFeesDTO(yearCounter, 0),
                    [TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS]: this.getOtherAdditionalIncomeStreamsDTO(yearCounter, 0),
                },
            },
            [TransactionType.FIXED_RECURRING_EXPENSE]: {
                type: TransactionType.FIXED_RECURRING_EXPENSE,
                totalAmount: 0,
                breakdown: {
                    [TransactionKey.PROPERTY_TAX]: this.getMonthlyPropertyTaxDTO(yearCounter, 0),
                    [TransactionKey.HOA_FEE]: this.getMonthlyHOAFeesAmountDTO(yearCounter, 0),
                    [TransactionKey.HOME_INSURANCE]: this.getMonthlyHomeInsuranceAmountDTO(yearCounter, 0),
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
    private getMonthlyHOAFeesAmountDTO(numberOfYears: number, previousTotalAmount: number): TxnDTO {
        return this.monthlyHOAFeesAmount.toDTO(this.rentEstimate, numberOfYears, previousTotalAmount);
    }

    private getMonthlyHomeInsuranceAmountDTO(numberOfYears: number, previousTotalAmount: number): TxnDTO {
        return this.monthlyHomeInsuranceAmount.toDTO(this.rentEstimate, numberOfYears, previousTotalAmount);
    }

    private getMonthlyPropertyTaxDTO(numberOfYears: number, previousTotalAmount: number): TxnDTO {
        return this.monthlyPropertyTax.toDTO(this.rentEstimate, numberOfYears, previousTotalAmount);
    }

    // Income Streams

    // come back this
    private getRentEstimateDTO(): any {
        return this.rentEstimate.toDTO();
    }

    private getStorageUnitFeesDTO(numberOfYears: number, previousTotalAmount: number): TxnDTO {
        return this.storageUnitFees.toDTO(this.rentEstimate, numberOfYears, previousTotalAmount);
    }

    private getParkingFeeDTO(numberOfYears: number, previousTotalAmount: number): TxnDTO {
        return this.parkingFee.toDTO(this.rentEstimate, numberOfYears, previousTotalAmount);
    }

    private getLaundryServiceDTO(numberOfYears: number, previousTotalAmount: number): TxnDTO {
        return this.laundryService.toDTO(this.rentEstimate, numberOfYears, previousTotalAmount);
    }

    private getOtherAdditionalIncomeStreamsDTO(numberOfYears: number, previousTotalAmount: number): TxnDTO {
        return this.otherAdditionalIncomeStreams.toDTO(this.rentEstimate, numberOfYears, previousTotalAmount);
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
    private getCapExReserveRateDTO(numberOfYears: number, previousTotalAmount: number): TxnDTO {
        return this.capExReserveRate.toDTO(this.rentEstimate, numberOfYears, previousTotalAmount);
    }

    private getMaintenanceRateDTO(numberOfYears: number, previousTotalAmount: number): TxnDTO {
        return this.maintenanceRate.toDTO(this.rentEstimate, numberOfYears, previousTotalAmount);
    }

    private getOtherExpenseRateDTO(numberOfYears: number, previousTotalAmount: number): TxnDTO {
        return this.otherExpenseRate.toDTO(this.rentEstimate, numberOfYears, previousTotalAmount);
    }

    private getPropertyManagementRateDTO(numberOfYears: number, previousTotalAmount: number): TxnDTO {
        return this.propertyManagementRate.toDTO(this.rentEstimate, numberOfYears, previousTotalAmount);
    }

    private getVacancyRateDTO(numberOfYears: number, previousTotalAmount: number): TxnDTO {
        return this.vacancyRate.toDTO(this.rentEstimate, numberOfYears, previousTotalAmount);
    }

}