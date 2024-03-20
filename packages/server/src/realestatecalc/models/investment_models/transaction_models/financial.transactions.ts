import { AdditionalIncomeStreamsDTO, ExpensesDTO, FixedMonthlyExpensesDTO, IncomesDTO, RecurringExpensesDTO, TransactionsDTO, Utility } from "@realestatemanager/shared";
import { Transaction } from "./transaction.model";
import { ParkingFeesIncome } from "./parking.fees.income.model";
import { OtherAdditionalIncomeStreams } from "./other.additional.streams.income.model";
import { StorageUnitFees } from "./storage.unit.fees.model";
import { LaundryServiceIncome } from "./laundry.service.income.model";
import { CapitalExpenditureReserveExpenses } from "./capex.expenses.model";
import { OtherExpenses } from "./other.expenses.model";
import { MaintenanceExpense } from "./maintenance.expense.model";
import { VacancyExpense } from "./vacany.expense.model";
import { PropertyManagementExpense } from "./property.management.expense.model";
import { MonthlyPropertyTaxAmount } from "./monthly.property.tax.expenses.model";
import { MonthlyHomeInsuranceAmount } from "./monthly.home.insurance.expenses.model";
import { MonthlyHOAFeesAmount } from "./monthly.hoa.fees.expenses.model";
import { IDTOConvertible } from "../../idtoconvertible.model";

export class FinancialTransactions implements IDTOConvertible<TransactionsDTO>{
    // Map each transaction type to its corresponding Transaction object.
    private transactions: Map<string, Transaction>;

    constructor(transactions: Transaction[]) {
        this.transactions = new Map<string, Transaction>();
        // Populate the transactions Map from the input array
        transactions.forEach(txn => {
            this.transactions.set(txn.getType(), txn);
        });
    }

    getTotalExpenses(numberOfYears: number = 0): number {
        return this.sumTransactions(txn => txn.isExpense(), numberOfYears);
    }

    getTotalIncomes(numberOfYears: number = 0): number {
        return this.sumTransactions(txn => !txn.isExpense(), numberOfYears);
    }

    getTotalRecurringExpenses(numberOfYears: number = 0): number {
        return this.sumTransactions(txn => txn.isRecurringExpense(), numberOfYears);
    }

    getTotalFixedExpenses(numberOfYears: number = 0): number {
        return this.sumTransactions(txn => txn.isFixedExpense(), numberOfYears);
    }

    getTotalAdditionalIncomes(numberOfYears: number = 0): number {
        return this.sumTransactions(txn => txn.isAdditionalIncome(), numberOfYears);
    }

    getRentalIncome(numberOfYears: number = 0): number {
        return this.sumTransactions(txn => txn.isRentalIncome(), numberOfYears);
    }

    toDTO(): TransactionsDTO {
        return {
            incomes: this.getIncomesDTO(),
            expenses: this.getExpensesDTO(),
        }
    }

    private getIncomesDTO(numberOfYears: number = 0): IncomesDTO {
        return {
            rentalIncome: Utility.round(this.getRentalIncome()),
            additionalIncomeStreams: this.getAdditionalIncomeStreamsDTO(numberOfYears),
        };
    }

    private getExpensesDTO(numberOfYears: number = 0): ExpensesDTO {
        return {
            fixedMonthlyExpenses: this.getFixedMonthlyExpensesDTO(numberOfYears),
            recurringExpenses: this.getRecurringExpensesDTO(),
        };
    }

    private getAdditionalIncomeStreamsDTO(numberOfYears: number = 0): AdditionalIncomeStreamsDTO {
        const parkingFeesIncome: ParkingFeesIncome = this.getParkingFeesIncome();
        const laundryServices: ParkingFeesIncome = this.getLaundryServices();
        const storageUnitFees: StorageUnitFees = this.getStorageUnitFees();
        const otherAdditionalIncomeStreams: OtherAdditionalIncomeStreams = this.getOtherAdditionalIncomeStreams();

        return {
            parkingFees: Utility.round(parkingFeesIncome.getProjectedAmount(numberOfYears)),
            laundryServices: Utility.round(laundryServices.getProjectedAmount(numberOfYears)),
            storageUnitFees: Utility.round(storageUnitFees.getProjectedAmount(numberOfYears)),
            otherAdditionalIncomeStreams: Utility.round(otherAdditionalIncomeStreams.getProjectedAmount(numberOfYears)),
        }
    }

    private getRecurringExpensesDTO(): RecurringExpensesDTO {
        const propertyManagementExpense: PropertyManagementExpense = this.getPropertyManagementExpense();
        const vacancyExpense: VacancyExpense = this.getVacancyExpense();
        const maintenanceExpense: MaintenanceExpense = this.getMaintenanceExpense();
        const otherExpenses: OtherExpenses = this.getOtherExpenses();
        const capExResrve: CapitalExpenditureReserveExpenses = this.getCapitalExpenditureReserveExpenses();

        return {
            propertyManagementRate: propertyManagementExpense.getRate(),
            vacancyRate: vacancyExpense.getRate(),
            maintenanceRate: maintenanceExpense.getRate(),
            otherExpensesRate: otherExpenses.getRate(),
            capExReserveRate: capExResrve.getRate(),
        };
    }

    private getFixedMonthlyExpensesDTO(numberOfYears: number = 0): FixedMonthlyExpensesDTO {
        const monthlyPropertyTaxAmount: MonthlyPropertyTaxAmount = this.getMonthlyPropertyTaxAmount();
        const monthlyHomeInsuranceAmount: MonthlyHomeInsuranceAmount = this.getMonthlyHomeInsuranceAmount();
        const monthlyHOAFeesAmount: MonthlyHOAFeesAmount = this.getMonthlyHOAFeesAmount();

        return {
            monthlyPropertyTax: monthlyPropertyTaxAmount.getProjectedAmount(numberOfYears),
            monthlyHomeInsuranceAmount: monthlyHomeInsuranceAmount.getProjectedAmount(numberOfYears),
            monthlyHOAFeesAmount: monthlyHOAFeesAmount.getProjectedAmount(numberOfYears),
        };
    }

    private getMonthlyPropertyTaxAmount(): MonthlyPropertyTaxAmount {
        return this.transactions.get(MonthlyPropertyTaxAmount.name);
    }

    private getMonthlyHomeInsuranceAmount(): MonthlyHomeInsuranceAmount {
        return this.transactions.get(MonthlyHomeInsuranceAmount.name);
    }

    private getMonthlyHOAFeesAmount(): MonthlyHOAFeesAmount {
        return this.transactions.get(MonthlyHOAFeesAmount.name);
    }

    private getPropertyManagementExpense(): PropertyManagementExpense {
        return this.transactions.get(PropertyManagementExpense.name) as PropertyManagementExpense;
    }

    private getVacancyExpense(): VacancyExpense {
        return this.transactions.get(VacancyExpense.name) as VacancyExpense;
    }

    private getMaintenanceExpense(): MaintenanceExpense {
        return this.transactions.get(MaintenanceExpense.name) as MaintenanceExpense;
    }

    private getOtherExpenses(): OtherExpenses {
        return this.transactions.get(OtherExpenses.name) as OtherExpenses;
    }

    private getCapitalExpenditureReserveExpenses(): CapitalExpenditureReserveExpenses {
        return this.transactions.get(CapitalExpenditureReserveExpenses.name) as CapitalExpenditureReserveExpenses;
    }

    private getParkingFeesIncome(): ParkingFeesIncome {
        return this.transactions.get(ParkingFeesIncome.name);
    }

    private getLaundryServices(): LaundryServiceIncome {
        return this.transactions.get(LaundryServiceIncome.name);
    }

    private getStorageUnitFees(): StorageUnitFees {
        return this.transactions.get(StorageUnitFees.name);
    }

    private getOtherAdditionalIncomeStreams(): OtherAdditionalIncomeStreams {
        return this.transactions.get(OtherAdditionalIncomeStreams.name);
    }

    private sumTransactions(callBack: (txn: Transaction) => boolean, numberOfYears: number = 0) {
        let sum = 0;
        // Iterate over each entry in the transactions map
        this.transactions.forEach(txn => {
            sum += callBack(txn) ? txn.getProjectedAmount(numberOfYears) : 0;
        });
        return sum;
    }

}
