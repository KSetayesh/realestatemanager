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

// export enum TransactionKey {
//     // LOAN_AMOUNT = 'Loan Amount',
//     PURCHASE_PRICE = 'Purchase Price',

//     MORTGAGE = 'Mortgage',
//     // MORTGAGE_INTEREST = 'Mortgage Interest',
//     // MORTGAGE_PRINCIPAL = 'Mortgage Principal',
//     // MORTGAGE_AMOUNT = 'Mortgage Amount',
//     // PMI = 'PMI',

//     PROPERTY_TAX = 'Property Tax',
//     HOA_FEE = 'Monthly HOA Fee',
//     HOME_INSURANCE = 'Monthly Home Insurance',

//     RENTAL_INCOME = 'Rental Income',
//     PARKING_FEES = 'Parking Fees',
//     LAUNDRY_SERVICES = 'Laundry Service',
//     STORAGE_UNIT_FEES = 'Storage Unit Fees',
//     OTHER_ADDITIONAL_INCOME_STREAMS = 'Other Additional Incomes Streams',

//     PROPERTY_MANAGEMENT_EXPENSE = 'Property Management Expense',
//     VACANCY_EXPENSE = 'Vacancy Expense',
//     MAINTENANCE_EXPENSE = 'Maintenance Expense',
//     OTHER_EXPENSES = 'Other Expeneses',
//     CAP_EX_RESERVE_EXPENSE = 'Cap Ex Reserve Expense',

//     DOWN_PAYMENT = 'Down Payment',
//     LEGAL_AND_PROFESSIONAL_FEES = 'Legal And Professional Fees',
//     INITIAL_REPAIR_COST = 'Initial Repair Costs',
//     CLOSING_COST = 'Closing Costs',
//     TRAVELING_COST = 'Traveling Costs',
//     OTHER_INITIAL_EXPENSES = 'Other Initial Expenses',
// };

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



    // private createOperationalExpenseTxn(txnKey: TransactionKey, amountOrRate: ValueInput): BaseTransaction {
    //     const initialRentalAmount = this.txnBuilderReq.rentEstimate;
    //     const rentalGrowthRate = this.txnBuilderReq.growthProjections.getAnnualRentIncreaseRate();
    //     const txn = new Transaction(
    //         txnKey,
    //         amountOrRate,
    //         TransactionType.OPERATIONAL_RECURRING_EXPENSE,
    //         this.canBeCumulated,
    //         this.canBePercentage,
    //         !this.hasRateOfGrowth
    //     );
    //     const calc: RecurringExpenseProjectionCalculator =
    //         new RecurringExpenseProjectionCalculator(initialRentalAmount, rentalGrowthRate);
    //     txn.setTransactionCalculator(calc);
    //     return txn;
    // }

}