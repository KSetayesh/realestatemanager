import { InterestType, ValueAmountInput, ValueInput, ValueRateInput } from "@realestatemanager/shared";
import { GrowthProjections } from "../models/investment_models/new_new_new/growth.projections.model";
import { MortgageTransaction, Transaction } from "../models/investment_models/new_new_new/transaction";
import { TransactionKey, TransactionType } from "../models/investment_models/new_new_new/transaction.detail";
import { RecurringExpenseProjectionCalculator } from "../models/investment_models/new_calculators/recurring.expense.projection.calculator";
import { BaseMortgageTransaction, BaseTransaction } from "../models/investment_models/new_new_new/financial.transaction.breakdown";
import { DirectValueCalculator } from "../models/investment_models/new_calculators/direct.value.calculator";
import { AppreciationAndIncomeProjectionCalculator } from "../models/investment_models/new_calculators/appreciation.and.income.projection.calculator";
import { DynamicGrowthCalculator } from "../models/investment_models/new_calculators/dynamic.growth.calculator";
import { MortgageCalculator } from "../models/investment_models/new_calculators/mortgage.calculator";
import { MonthlyAppreciationCalculator } from "../models/investment_models/new_calculators/monthly.appreciation.calculator";


export type TransactionBuilderRequest = {
    growthProjections: GrowthProjections;
    purchasePrice: ValueAmountInput;
    annualInterestRate: ValueRateInput;
    termInYears: number;
    interestType: InterestType;
    pmiRate: ValueRateInput;
    pmiDropoffPoint: number;
    downPayment: ValueInput;
    monthlyPropertyTax: ValueInput;
    monthlyHomeInsuranceAmount: ValueInput;
    monthlyHOAFeesAmount: ValueInput;
    propertyManagementRate: ValueRateInput;
    vacancyRate: ValueRateInput;
    maintenanceRate: ValueRateInput;
    otherExpensesRate: ValueRateInput;
    capExReserveRate: ValueRateInput;
    rentEstimate: ValueAmountInput;
    parkingFees: ValueAmountInput;
    laundryServices: ValueAmountInput;
    storageUnitFees: ValueAmountInput;
    otherAdditionalIncomeStreams: ValueAmountInput;
    legalAndProfessionalFees: ValueInput;
    initialRepairCosts: ValueInput;
    travelingCosts: ValueInput;
    closingCosts: ValueInput;
    otherInitialExpenses: ValueInput;
};

type TransactionsByKey = { [key in TransactionKey]: BaseTransaction }

export class TransactionBuilder {

    private txnBuilderReq: TransactionBuilderRequest;
    private txnMap: Map<TransactionKey, BaseTransaction>;

    constructor(txnBuilderReq: TransactionBuilderRequest) {
        this.txnBuilderReq = txnBuilderReq;
        this.txnMap = new Map();
    }

    build() {
        const downPaymentTxn: BaseTransaction = this.createDownPaymentTxn();
        const listOfTxns: BaseTransaction[] = [
            this.createCapExReserveTxn(),
            this.createPropertyManagementExpenseTxn(),
            this.createVacancyTxn(),
            this.createMaintenanceTxn(),
            this.createOtherExpenseTxn(),
            downPaymentTxn,
            this.createLegalAndProfessionalFeesTxn(),
            this.createInititalRepairCostsTxn(),
            this.createClosingCostsTxn(),
            this.createOtherInititalExpensesTxn(),
            this.createRentalIncomeTxn(),
            this.createParkingFeesTxn(),
            this.createLaundryServiceTxn(),
            this.createStorageUnitFeesTxn(),
            this.createOtherAdditionalIncomeStreamsTxn(),
            this.createPropertyTaxTxn(),
            this.createHOAFeeTxn(),
            this.createHomeInsuranceTxn(),
            this.createHomeAppreciationTxn(),
            this.createMortgageTxn(downPaymentTxn),
        ];
        listOfTxns.forEach(txn => {
            this.txnMap.set(txn.getTransactionKey(), txn);
        });

    }

    private createCapExReserveTxn(): BaseTransaction {
        return this.createOperationalExpenseTxn(
            TransactionKey.CAP_EX_RESERVE_EXPENSE,
            this.txnBuilderReq.capExReserveRate
        );
    }

    private createPropertyManagementExpenseTxn(): BaseTransaction {
        return this.createOperationalExpenseTxn(
            TransactionKey.PROPERTY_MANAGEMENT_EXPENSE,
            this.txnBuilderReq.propertyManagementRate
        );
    }

    private createVacancyTxn(): BaseTransaction {
        return this.createOperationalExpenseTxn(
            TransactionKey.VACANCY_EXPENSE,
            this.txnBuilderReq.vacancyRate
        );
    }

    private createMaintenanceTxn(): BaseTransaction {
        return this.createOperationalExpenseTxn(
            TransactionKey.MAINTENANCE_EXPENSE,
            this.txnBuilderReq.maintenanceRate
        );
    }

    private createOtherExpenseTxn(): BaseTransaction {
        return this.createOperationalExpenseTxn(
            TransactionKey.OTHER_EXPENSES,
            this.txnBuilderReq.otherExpensesRate
        );
    }

    private createOperationalExpenseTxn(txnKey: TransactionKey, amountOrRate: ValueInput): BaseTransaction {
        const initialRentalAmount = this.txnBuilderReq.rentEstimate;
        const rentalGrowthRate = this.txnBuilderReq.growthProjections.getAnnualRentIncreaseRate();
        const txn = new Transaction(
            txnKey,
            amountOrRate,
            TransactionType.OPERATIONAL_RECURRING_EXPENSE,
            this.canBeCumulated,
            this.canBePercentage,
            !this.hasRateOfGrowth
        );
        const calc: RecurringExpenseProjectionCalculator =
            new RecurringExpenseProjectionCalculator(initialRentalAmount, rentalGrowthRate);
        txn.setTransactionCalculator(calc);
        return txn;
    }

    //---------------------------------------------------------------------------------------------------------------------

    private createDownPaymentTxn(): BaseTransaction {
        return this.createInitialExpenseTxn(
            TransactionKey.DOWN_PAYMENT,
            this.txnBuilderReq.downPayment
        );
    }

    private createLegalAndProfessionalFeesTxn(): BaseTransaction {
        return this.createInitialExpenseTxn(
            TransactionKey.LEGAL_AND_PROFESSIONAL_FEES,
            this.txnBuilderReq.legalAndProfessionalFees
        );
    }

    private createInititalRepairCostsTxn(): BaseTransaction {
        return this.createInitialExpenseTxn(
            TransactionKey.INITIAL_REPAIR_COST,
            this.txnBuilderReq.initialRepairCosts
        );
    }

    private createClosingCostsTxn(): BaseTransaction {
        return this.createInitialExpenseTxn(
            TransactionKey.CLOSING_COST,
            this.txnBuilderReq.closingCosts
        );
    }

    private createOtherInititalExpensesTxn(): BaseTransaction {
        return this.createInitialExpenseTxn(
            TransactionKey.OTHER_INITIAL_EXPENSES,
            this.txnBuilderReq.otherInitialExpenses
        );
    }

    private createInitialExpenseTxn(txnKey: TransactionKey, amountOrRate: ValueInput): BaseTransaction {
        const initialPurchasePrice = this.txnBuilderReq.purchasePrice;
        const txn = new Transaction(
            txnKey,
            amountOrRate,
            TransactionType.INITIAL_EXPENSE,
            !this.canBeCumulated,
            this.canBePercentage,
            !this.hasRateOfGrowth
        );
        const calc: DirectValueCalculator =
            new DirectValueCalculator(initialPurchasePrice);
        txn.setTransactionCalculator(calc);
        return txn;
    }

    //---------------------------------------------------------------------------------------------------------------------

    private createRentalIncomeTxn(): BaseTransaction {
        return this.createIncomeStreamTxn(
            TransactionKey.RENTAL_INCOME,
            this.txnBuilderReq.rentEstimate,
            this.txnBuilderReq.growthProjections.getAnnualRentIncreaseRate(),
        );
    }

    private createParkingFeesTxn(): BaseTransaction {
        return this.createIncomeStreamTxn(
            TransactionKey.PARKING_FEES,
            this.txnBuilderReq.parkingFees,
            this.txnBuilderReq.growthProjections.getParkingFeesIncreaseRate(),
        );
    }

    private createLaundryServiceTxn(): BaseTransaction {
        return this.createIncomeStreamTxn(
            TransactionKey.LAUNDRY_SERVICES,
            this.txnBuilderReq.laundryServices,
            this.txnBuilderReq.growthProjections.getLaundryServicesIncreaseRate(),
        );
    }

    private createStorageUnitFeesTxn(): BaseTransaction {
        return this.createIncomeStreamTxn(
            TransactionKey.STORAGE_UNIT_FEES,
            this.txnBuilderReq.storageUnitFees,
            this.txnBuilderReq.growthProjections.getStorageUnitFeesIncreaseRate(),
        );
    }

    private createOtherAdditionalIncomeStreamsTxn(): BaseTransaction {
        return this.createIncomeStreamTxn(
            TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS,
            this.txnBuilderReq.otherAdditionalIncomeStreams,
            this.txnBuilderReq.growthProjections.getOtherAdditionalIncomeStreamsIncreaseRate(),
        );
    }

    private createIncomeStreamTxn(
        txnKey: TransactionKey,
        amountOrRate: ValueInput,
        rateOfGrowth: ValueRateInput): BaseTransaction {

        const initialPurchasePrice = this.txnBuilderReq.purchasePrice;
        const appreciationGrowthRate = this.txnBuilderReq.growthProjections.getAnnualAppreciationRate();
        const txn = new Transaction(
            txnKey,
            amountOrRate,
            TransactionType.INCOME_STREAMS,
            this.canBeCumulated,
            !this.canBePercentage,
            this.hasRateOfGrowth,
            rateOfGrowth,
        );
        const calc: AppreciationAndIncomeProjectionCalculator =
            new AppreciationAndIncomeProjectionCalculator(initialPurchasePrice, appreciationGrowthRate);
        txn.setTransactionCalculator(calc);
        return txn;
    }


    //---------------------------------------------------------------------------------------------------------------------

    private createPropertyTaxTxn(): BaseTransaction {
        return this.createFixedRecurringExpenseTxn(
            TransactionKey.PROPERTY_TAX,
            this.txnBuilderReq.monthlyPropertyTax,
            this.txnBuilderReq.growthProjections.getAnnualTaxIncreaseRate(),
        )
    }

    private createHOAFeeTxn(): BaseTransaction {
        return this.createFixedRecurringExpenseTxn(
            TransactionKey.HOA_FEE,
            this.txnBuilderReq.monthlyPropertyTax,
            this.txnBuilderReq.growthProjections.getAnnualHOAFeesIncreaseRate(),
        )
    }

    private createHomeInsuranceTxn(): BaseTransaction {
        return this.createFixedRecurringExpenseTxn(
            TransactionKey.HOME_INSURANCE,
            this.txnBuilderReq.monthlyPropertyTax,
            this.txnBuilderReq.growthProjections.getAnnualHomeInsuranceIncreaseRate(),
        )
    }

    private createFixedRecurringExpenseTxn(
        txnKey: TransactionKey,
        amountOrRate: ValueInput,
        rateOfGrowth: ValueRateInput
    ): BaseTransaction {
        const initialRentalAmount = this.txnBuilderReq.rentEstimate;
        const rentalGrowthRate = this.txnBuilderReq.growthProjections.getAnnualRentIncreaseRate();
        const txn = new Transaction(
            txnKey,
            amountOrRate,
            TransactionType.FIXED_RECURRING_EXPENSE,
            this.canBeCumulated,
            this.canBePercentage,
            this.hasRateOfGrowth,
            rateOfGrowth,
        );
        const calc: DynamicGrowthCalculator =
            new DynamicGrowthCalculator(initialRentalAmount, rentalGrowthRate);
        txn.setTransactionCalculator(calc);
        return txn;
    }

    //---------------------------------------------------------------------------------------------------------------------

    private createHomeAppreciationTxn(): BaseTransaction {
        return this.createFinancingTxn(
            TransactionKey.PURCHASE_PRICE,
            this.txnBuilderReq.purchasePrice,
            this.txnBuilderReq.growthProjections.getAnnualAppreciationRate(),
        )
    }

    private createFinancingTxn(
        txnKey: TransactionKey,
        amountOrRate: ValueInput,
        rateOfGrowth: ValueRateInput): BaseTransaction {
        const txn = new Transaction(
            txnKey,
            amountOrRate,
            TransactionType.FINANCING,
            !this.canBeCumulated,
            this.canBePercentage,
            this.hasRateOfGrowth,
            rateOfGrowth,
        );
        const calc: MonthlyAppreciationCalculator =
            new MonthlyAppreciationCalculator();
        txn.setTransactionCalculator(calc);
        return txn;
    }

    //---------------------------------------------------------------------------------------------------------------------

    private createMortgageTxn(downPaymentTxn: BaseTransaction): BaseMortgageTransaction {
        const initialPurchasePrice = this.txnBuilderReq.purchasePrice;
        const termInYears = this.txnBuilderReq.termInYears;
        const interestType = this.txnBuilderReq.interestType;
        const annualInterestRate = this.txnBuilderReq.annualInterestRate;

        const txn = new MortgageTransaction(
            TransactionKey.MORTGAGE,
            annualInterestRate,
            TransactionType.MORTGAGE,
            this.canBeCumulated,
            this.canBePercentage,
            !this.hasRateOfGrowth,
        );
        const calc: MortgageCalculator =
            new MortgageCalculator(initialPurchasePrice, downPaymentTxn, termInYears, interestType);
        txn.setTransactionCalculator(calc);
        return txn;
    }

    //---------------------------------------------------------------------------------------------------------------------

    private get canBeCumulated(): boolean {
        return true;
    }

    private get canBePercentage(): boolean {
        return true;
    }

    private get hasRateOfGrowth(): boolean {
        return true;
    }

}