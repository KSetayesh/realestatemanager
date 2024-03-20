import { ValueType } from "@realestatemanager/shared";
import { GrowthProjections } from "../models/investment_models/growth.projections.model";
import { MonthlyHomeInsuranceAmount } from "../models/investment_models/transaction_models/monthly.home.insurance.expenses.model";
import { MonthlyPropertyTaxAmount } from "../models/investment_models/transaction_models/monthly.property.tax.expenses.model";
import { RentalIncome } from "../models/investment_models/transaction_models/rental.income.model";
import { MonthlyHOAFeesAmount } from "../models/investment_models/transaction_models/monthly.hoa.fees.expenses.model";
import { ParkingFeesIncome } from "../models/investment_models/transaction_models/parking.fees.income.model";
import { LaundryServiceIncome } from "../models/investment_models/transaction_models/laundry.service.income.model";
import { StorageUnitFees } from "../models/investment_models/transaction_models/storage.unit.fees.model";
import { OtherAdditionalIncomeStreams } from "../models/investment_models/transaction_models/other.additional.streams.income.model";
import { PropertyManagementExpense } from "../models/investment_models/transaction_models/property.management.expense.model";
import { VacancyExpense } from "../models/investment_models/transaction_models/vacany.expense.model";
import { MaintenanceExpense } from "../models/investment_models/transaction_models/maintenance.expense.model";
import { OtherExpenses } from "../models/investment_models/transaction_models/other.expenses.model";
import { CapitalExpenditureReserveExpenses } from "../models/investment_models/transaction_models/capex.expenses.model";

export class TransactionBuilder {

    private growthProjections: GrowthProjections;

    constructor(growthProjections: GrowthProjections) {
        this.growthProjections = growthProjections;
    }

    createRentalIncomeObj(amount: number): RentalIncome {
        return new RentalIncome(
            amount,
            ValueType.AMOUNT,
            this.growthProjections.getAnnualRentIncreaseRate()
        );
    }

    createParkingFeesObj(amount: number): ParkingFeesIncome {
        return new ParkingFeesIncome(amount);
    }

    createLaundryServiceObj(amount: number): LaundryServiceIncome {
        return new LaundryServiceIncome(amount);
    }

    createStorageUnitFeesObj(amount: number): StorageUnitFees {
        return new StorageUnitFees(amount);
    }

    createOtherAdditionalIncomeStreamsObj(amount: number): OtherAdditionalIncomeStreams {
        return new OtherAdditionalIncomeStreams(amount);
    }

    createMonthlyPropertyTaxObj(amount: number): MonthlyPropertyTaxAmount {
        return new MonthlyPropertyTaxAmount(
            amount,
            ValueType.AMOUNT,
            this.growthProjections.getAnnualTaxIncreaseRate()
        );
    }

    createMonthlyHomeInsuranceAmountObj(amount: number): MonthlyHomeInsuranceAmount {
        return new MonthlyHomeInsuranceAmount(
            amount,
            ValueType.AMOUNT,
            this.growthProjections.getAnnualHomeInsuranceIncreaseRate()
        );
    }

    createMonthlyHOAFeesAmountObj(amount: number): MonthlyHOAFeesAmount {
        return new MonthlyHOAFeesAmount(
            amount,
            ValueType.AMOUNT,
            this.growthProjections.getAnnualHOAFeesIncreaseRate()
        );
    }

    createPropertyManagementRateObj(amount: number, rentalIncomeObj: RentalIncome): PropertyManagementExpense {
        return new PropertyManagementExpense(amount, rentalIncomeObj);
    }

    createVacancyRateObj(amount: number, rentalIncomeObj: RentalIncome): VacancyExpense {
        return new VacancyExpense(amount, rentalIncomeObj);
    }

    createMaintenanceRateObj(amount: number, rentalIncomeObj: RentalIncome): MaintenanceExpense {
        return new MaintenanceExpense(amount, rentalIncomeObj);
    }

    createOtherExpensesRateObj(amount: number, rentalIncomeObj: RentalIncome): OtherExpenses {
        return new OtherExpenses(amount, rentalIncomeObj);
    }

    createCapExReserveRateObj(amount: number, rentalIncomeObj: RentalIncome): CapitalExpenditureReserveExpenses {
        return new CapitalExpenditureReserveExpenses(amount, rentalIncomeObj);
    }

}