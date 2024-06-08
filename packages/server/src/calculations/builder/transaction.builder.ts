import {
    InterestType,
    TransactionKey,
    ValueAmountInput,
    ValueInput,
    ValueRateInput
} from "@realestatemanager/shared";
import { TransactionManager } from "../transaction.manager";
import { GrowthProjections } from "../growth.projections.model";
import { BuilderInterface } from "src/shared/builder.interface";
import { RecurringFixedCost } from "../transaction_models/recurring.fixed.cost";
import { Income } from "../transaction_models/income";
import { InitialCost } from "../transaction_models/initial.cost";
import { RecurringOperationalCost } from "../transaction_models/recurring.operational.cost";
import { PurchasePrice } from "../transaction_models/purchase.price";
import { RentEstimate } from "../transaction_models/rent.estimate";

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

export class TransactionBuilder implements BuilderInterface<TransactionManager> {
    private txnBuilderReq: TransactionBuilderRequest;

    constructor(txnBuilderReq: TransactionBuilderRequest) {
        this.txnBuilderReq = txnBuilderReq;
    }

    build(): TransactionManager {

        const monthlyHOAFeesAmount: RecurringFixedCost = new RecurringFixedCost(
            TransactionKey.HOA_FEE,
            this.txnBuilderReq.monthlyHOAFeesAmount,
            this.txnBuilderReq.growthProjections.annualHOAFeesIncreaseRate,
        );

        const monthlyHomeInsuranceAmount: RecurringFixedCost = new RecurringFixedCost(
            TransactionKey.HOME_INSURANCE,
            this.txnBuilderReq.monthlyHomeInsuranceAmount,
            this.txnBuilderReq.growthProjections.annualHomeInsuranceIncreaseRate,
        );

        const monthlyPropertyTax: RecurringFixedCost = new RecurringFixedCost(
            TransactionKey.PROPERTY_TAX,
            this.txnBuilderReq.monthlyPropertyTax,
            this.txnBuilderReq.growthProjections.annualTaxIncreaseRate,
        );

        const storageUnitFees: Income = new Income(
            TransactionKey.STORAGE_UNIT_FEES,
            this.txnBuilderReq.storageUnitFees,
            this.txnBuilderReq.growthProjections.storageUnitFeesIncreaseRate,
        );

        const parkingFee: Income = new Income(
            TransactionKey.PARKING_FEES,
            this.txnBuilderReq.parkingFees,
            this.txnBuilderReq.growthProjections.parkingFeesIncreaseRate,
        );

        const laundryService: Income = new Income(
            TransactionKey.LAUNDRY_SERVICES,
            this.txnBuilderReq.laundryServices,
            this.txnBuilderReq.growthProjections.laundryServicesIncreaseRate,
        );

        const otherAdditionalIncomeStreams: Income = new Income(
            TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS,
            this.txnBuilderReq.otherAdditionalIncomeStreams,
            this.txnBuilderReq.growthProjections.otherAdditionalIncomeStreamsIncreaseRate,
        );

        const downPayment: InitialCost = this.downPayment;

        const closingCosts: InitialCost = new InitialCost(
            TransactionKey.CLOSING_COST,
            this.txnBuilderReq.closingCosts,
        );

        const initialRepairCosts: InitialCost = new InitialCost(
            TransactionKey.INITIAL_REPAIR_COST,
            this.txnBuilderReq.initialRepairCosts,
        );

        const legalAndProfessionalFees: InitialCost = new InitialCost(
            TransactionKey.LEGAL_AND_PROFESSIONAL_FEES,
            this.txnBuilderReq.legalAndProfessionalFees,
        );

        const travelingCosts: InitialCost = new InitialCost(
            TransactionKey.TRAVELING_COST,
            this.txnBuilderReq.travelingCosts,
        );

        const otherInitialExpenses: InitialCost = new InitialCost(
            TransactionKey.OTHER_INITIAL_EXPENSES,
            this.txnBuilderReq.otherInitialExpenses,
        );

        const capExReserveRate: RecurringOperationalCost = new RecurringOperationalCost(
            TransactionKey.CAP_EX_RESERVE_EXPENSE,
            this.txnBuilderReq.capExReserveRate,
        );

        const maintenanceRate: RecurringOperationalCost = new RecurringOperationalCost(
            TransactionKey.MAINTENANCE_EXPENSE,
            this.txnBuilderReq.maintenanceRate,
        );

        const propertyManagementRate: RecurringOperationalCost = new RecurringOperationalCost(
            TransactionKey.PROPERTY_MANAGEMENT_EXPENSE,
            this.txnBuilderReq.propertyManagementRate,
        );

        const vacancyRate: RecurringOperationalCost = new RecurringOperationalCost(
            TransactionKey.VACANCY_EXPENSE,
            this.txnBuilderReq.vacancyRate,
        );

        const otherExpenseRate: RecurringOperationalCost = new RecurringOperationalCost(
            TransactionKey.OTHER_EXPENSES,
            this.txnBuilderReq.otherExpensesRate,
        );

        const recurringFixedCostMap: Map<TransactionKey, RecurringFixedCost> = new Map();
        const incomeMap: Map<TransactionKey, Income> = new Map();
        const initialExpenseMap: Map<TransactionKey, InitialCost> = new Map();
        const recurringOperationalCostMap: Map<TransactionKey, RecurringOperationalCost> = new Map();

        recurringFixedCostMap.set(monthlyHOAFeesAmount.txnKey, monthlyHOAFeesAmount);
        recurringFixedCostMap.set(monthlyHomeInsuranceAmount.txnKey, monthlyHomeInsuranceAmount);
        recurringFixedCostMap.set(monthlyPropertyTax.txnKey, monthlyPropertyTax);

        incomeMap.set(storageUnitFees.txnKey, storageUnitFees);
        incomeMap.set(parkingFee.txnKey, parkingFee);
        incomeMap.set(laundryService.txnKey, laundryService);
        incomeMap.set(otherAdditionalIncomeStreams.txnKey, otherAdditionalIncomeStreams);

        initialExpenseMap.set(downPayment.txnKey, downPayment);
        initialExpenseMap.set(closingCosts.txnKey, closingCosts);
        initialExpenseMap.set(initialRepairCosts.txnKey, initialRepairCosts);
        initialExpenseMap.set(legalAndProfessionalFees.txnKey, legalAndProfessionalFees);
        initialExpenseMap.set(travelingCosts.txnKey, travelingCosts);
        initialExpenseMap.set(otherInitialExpenses.txnKey, otherInitialExpenses);

        recurringOperationalCostMap.set(capExReserveRate.txnKey, capExReserveRate);
        recurringOperationalCostMap.set(maintenanceRate.txnKey, maintenanceRate);
        recurringOperationalCostMap.set(propertyManagementRate.txnKey, propertyManagementRate);
        recurringOperationalCostMap.set(vacancyRate.txnKey, vacancyRate);
        recurringOperationalCostMap.set(otherExpenseRate.txnKey, otherExpenseRate);

        return new TransactionManager(
            recurringFixedCostMap,
            incomeMap,
            initialExpenseMap,
            recurringOperationalCostMap
        );

    }

    get purchasePrice(): PurchasePrice {
        return new PurchasePrice(
            this.txnBuilderReq.purchasePrice,
            this.txnBuilderReq.growthProjections.annualAppreciationRate,
        );
    }

    get rentEstimate(): RentEstimate {
        return new RentEstimate(
            this.txnBuilderReq.rentEstimate,
            this.txnBuilderReq.growthProjections.annualRentIncreaseRate,
        );
    }

    get downPayment(): InitialCost {
        return new InitialCost(
            TransactionKey.DOWN_PAYMENT,
            this.txnBuilderReq.downPayment,
        );
    }

}

