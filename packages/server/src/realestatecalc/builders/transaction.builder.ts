import { InterestType, ValueAmountInput, ValueInput, ValueRateInput } from "@realestatemanager/shared";
import { GrowthProjections } from "../models/investment_models/new_new_new/growth.projections.model";
import { PurchasePrice } from "../models/investment_models/txn4/purchase.price";
import { RentEstimate } from "../models/investment_models/txn4/rent.estimate";
import { RecurringFixedCost } from "../models/investment_models/txn4/recurring.fixed.cost";
import { Income } from "../models/investment_models/txn4/income";
import { InitialCost } from "../models/investment_models/txn4/initial.cost";
import { RecurringOperationalCost } from "../models/investment_models/txn4/recurring.operational.cost";
import { TransactionManager } from "../models/investment_models/txn4/calc/transaction.manager";
import { MortgageCalculator } from "../models/investment_models/txn4/mortgage.calc";
import { TransactionKey } from "../models/investment_models/txn4/calc/investment.calculator";

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

export class TransactionBuilder {
    private txnBuilderReq: TransactionBuilderRequest;

    constructor(txnBuilderReq: TransactionBuilderRequest) {
        this.txnBuilderReq = txnBuilderReq;
    }

    build(): TransactionManager {
        // const purchasePrice: PurchasePrice = new PurchasePrice(
        //     this.txnBuilderReq.purchasePrice,
        //     this.txnBuilderReq.growthProjections.getAnnualAppreciationRate(),
        // );

        // const rentEstimate: RentEstimate = new RentEstimate(
        //     this.txnBuilderReq.rentEstimate,
        //     this.txnBuilderReq.growthProjections.getAnnualRentIncreaseRate(),
        // );

        const monthlyHOAFeesAmount: RecurringFixedCost = new RecurringFixedCost(
            TransactionKey.HOA_FEE,
            this.txnBuilderReq.monthlyHOAFeesAmount,
            this.txnBuilderReq.growthProjections.getAnnualHOAFeesIncreaseRate()
        );

        const monthlyHomeInsuranceAmount: RecurringFixedCost = new RecurringFixedCost(
            TransactionKey.HOME_INSURANCE,
            this.txnBuilderReq.monthlyHomeInsuranceAmount,
            this.txnBuilderReq.growthProjections.getAnnualHomeInsuranceIncreaseRate()
        );

        const monthlyPropertyTax: RecurringFixedCost = new RecurringFixedCost(
            TransactionKey.PROPERTY_TAX,
            this.txnBuilderReq.monthlyPropertyTax,
            this.txnBuilderReq.growthProjections.getAnnualTaxIncreaseRate()
        );

        const storageUnitFees: Income = new Income(
            TransactionKey.STORAGE_UNIT_FEES,
            this.txnBuilderReq.storageUnitFees,
            this.txnBuilderReq.growthProjections.getStorageUnitFeesIncreaseRate(),
        );

        const parkingFee: Income = new Income(
            TransactionKey.PARKING_FEES,
            this.txnBuilderReq.parkingFees,
            this.txnBuilderReq.growthProjections.getParkingFeesIncreaseRate(),
        );

        const laundryService: Income = new Income(
            TransactionKey.LAUNDRY_SERVICES,
            this.txnBuilderReq.laundryServices,
            this.txnBuilderReq.growthProjections.getLaundryServicesIncreaseRate(),
        );

        const otherAdditionalIncomeStreams: Income = new Income(
            TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS,
            this.txnBuilderReq.otherAdditionalIncomeStreams,
            this.txnBuilderReq.growthProjections.getOtherAdditionalIncomeStreamsIncreaseRate(),
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
            this.txnBuilderReq.growthProjections.getAnnualAppreciationRate(),
        );
    }

    get rentEstimate(): RentEstimate {
        return new RentEstimate(
            this.txnBuilderReq.rentEstimate,
            this.txnBuilderReq.growthProjections.getAnnualRentIncreaseRate(),
        );
    }

    get downPayment(): InitialCost {
        return new InitialCost(
            TransactionKey.DOWN_PAYMENT,
            this.txnBuilderReq.downPayment,
        );
    }

}


// export class TransactionBuilder {

//     private txnBuilderReq: TransactionBuilderRequest;

//     constructor(txnBuilderReq: TransactionBuilderRequest) {
//         this.txnBuilderReq = txnBuilderReq;
//     }

//     build(): Map<TransactionKey, BaseTransaction> {

//         const txnMap: Map<TransactionKey, BaseTransaction> = new Map();

//         const downPaymentTxn: BaseTransaction = this.createDownPaymentTxn();

//         const listOfTxns: BaseTransaction[] = [
//             this.createCapExReserveTxn(),
//             this.createPropertyManagementExpenseTxn(),
//             this.createVacancyTxn(),
//             this.createMaintenanceTxn(),
//             this.createOtherExpenseTxn(),
//             downPaymentTxn,
//             this.createLegalAndProfessionalFeesTxn(),
//             this.createInititalRepairCostsTxn(),
//             this.createClosingCostsTxn(),
//             this.createOtherInititalExpensesTxn(),
//             this.createRentalIncomeTxn(),
//             this.createParkingFeesTxn(),
//             this.createLaundryServiceTxn(),
//             this.createStorageUnitFeesTxn(),
//             this.createOtherAdditionalIncomeStreamsTxn(),
//             this.createPropertyTaxTxn(),
//             this.createHOAFeeTxn(),
//             this.createHomeInsuranceTxn(),
//             this.createHomeAppreciationTxn(),
//             this.createMortgageTxn(downPaymentTxn),
//         ];

//         listOfTxns.forEach(txn => {
//             txnMap.set(txn.getTransactionKey(), txn);
//         });

//         return txnMap;

//     }

//     private createCapExReserveTxn(): BaseTransaction {
//         return this.createOperationalExpenseTxn(
//             TransactionKey.CAP_EX_RESERVE_EXPENSE,
//             this.txnBuilderReq.capExReserveRate
//         );
//     }

//     private createPropertyManagementExpenseTxn(): BaseTransaction {
//         return this.createOperationalExpenseTxn(
//             TransactionKey.PROPERTY_MANAGEMENT_EXPENSE,
//             this.txnBuilderReq.propertyManagementRate
//         );
//     }

//     private createVacancyTxn(): BaseTransaction {
//         return this.createOperationalExpenseTxn(
//             TransactionKey.VACANCY_EXPENSE,
//             this.txnBuilderReq.vacancyRate
//         );
//     }

//     private createMaintenanceTxn(): BaseTransaction {
//         return this.createOperationalExpenseTxn(
//             TransactionKey.MAINTENANCE_EXPENSE,
//             this.txnBuilderReq.maintenanceRate
//         );
//     }

//     private createOtherExpenseTxn(): BaseTransaction {
//         return this.createOperationalExpenseTxn(
//             TransactionKey.OTHER_EXPENSES,
//             this.txnBuilderReq.otherExpensesRate
//         );
//     }

//     private createOperationalExpenseTxn(txnKey: TransactionKey, amountOrRate: ValueInput): BaseTransaction {
//         const initialRentalAmount = this.txnBuilderReq.rentEstimate;
//         const rentalGrowthRate = this.txnBuilderReq.growthProjections.getAnnualRentIncreaseRate();
//         const txn = new Transaction(
//             txnKey,
//             amountOrRate,
//             TransactionType.OPERATIONAL_RECURRING_EXPENSE,
//             this.canBeCumulated,
//             this.canBePercentage,
//             !this.hasRateOfGrowth
//         );
//         const calc: RecurringExpenseProjectionCalculator =
//             new RecurringExpenseProjectionCalculator(initialRentalAmount, rentalGrowthRate);
//         txn.setTransactionCalculator(calc);
//         return txn;
//     }

//     //---------------------------------------------------------------------------------------------------------------------

//     private createDownPaymentTxn(): BaseTransaction {
//         return this.createInitialExpenseTxn(
//             TransactionKey.DOWN_PAYMENT,
//             this.txnBuilderReq.downPayment
//         );
//     }

//     private createLegalAndProfessionalFeesTxn(): BaseTransaction {
//         return this.createInitialExpenseTxn(
//             TransactionKey.LEGAL_AND_PROFESSIONAL_FEES,
//             this.txnBuilderReq.legalAndProfessionalFees
//         );
//     }

//     private createInititalRepairCostsTxn(): BaseTransaction {
//         return this.createInitialExpenseTxn(
//             TransactionKey.INITIAL_REPAIR_COST,
//             this.txnBuilderReq.initialRepairCosts
//         );
//     }

//     private createClosingCostsTxn(): BaseTransaction {
//         return this.createInitialExpenseTxn(
//             TransactionKey.CLOSING_COST,
//             this.txnBuilderReq.closingCosts
//         );
//     }

//     private createOtherInititalExpensesTxn(): BaseTransaction {
//         return this.createInitialExpenseTxn(
//             TransactionKey.OTHER_INITIAL_EXPENSES,
//             this.txnBuilderReq.otherInitialExpenses
//         );
//     }

//     private createInitialExpenseTxn(txnKey: TransactionKey, amountOrRate: ValueInput): BaseTransaction {
//         const initialPurchasePrice = this.txnBuilderReq.purchasePrice;
//         const txn = new Transaction(
//             txnKey,
//             amountOrRate,
//             TransactionType.INITIAL_EXPENSE,
//             !this.canBeCumulated,
//             this.canBePercentage,
//             !this.hasRateOfGrowth
//         );
//         const calc: DirectValueCalculator =
//             new DirectValueCalculator(initialPurchasePrice);
//         txn.setTransactionCalculator(calc);
//         return txn;
//     }

//     //---------------------------------------------------------------------------------------------------------------------

//     private createRentalIncomeTxn(): BaseTransaction {
//         return this.createIncomeStreamTxn(
//             TransactionKey.RENTAL_INCOME,
//             this.txnBuilderReq.rentEstimate,
//             this.txnBuilderReq.growthProjections.getAnnualRentIncreaseRate(),
//         );
//     }

//     private createParkingFeesTxn(): BaseTransaction {
//         return this.createIncomeStreamTxn(
//             TransactionKey.PARKING_FEES,
//             this.txnBuilderReq.parkingFees,
//             this.txnBuilderReq.growthProjections.getParkingFeesIncreaseRate(),
//         );
//     }

//     private createLaundryServiceTxn(): BaseTransaction {
//         return this.createIncomeStreamTxn(
//             TransactionKey.LAUNDRY_SERVICES,
//             this.txnBuilderReq.laundryServices,
//             this.txnBuilderReq.growthProjections.getLaundryServicesIncreaseRate(),
//         );
//     }

//     private createStorageUnitFeesTxn(): BaseTransaction {
//         return this.createIncomeStreamTxn(
//             TransactionKey.STORAGE_UNIT_FEES,
//             this.txnBuilderReq.storageUnitFees,
//             this.txnBuilderReq.growthProjections.getStorageUnitFeesIncreaseRate(),
//         );
//     }

//     private createOtherAdditionalIncomeStreamsTxn(): BaseTransaction {
//         return this.createIncomeStreamTxn(
//             TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS,
//             this.txnBuilderReq.otherAdditionalIncomeStreams,
//             this.txnBuilderReq.growthProjections.getOtherAdditionalIncomeStreamsIncreaseRate(),
//         );
//     }

//     private createIncomeStreamTxn(
//         txnKey: TransactionKey,
//         amountOrRate: ValueInput,
//         rateOfGrowth: ValueRateInput): BaseTransaction {

//         const initialPurchasePrice = this.txnBuilderReq.purchasePrice;
//         const appreciationGrowthRate = this.txnBuilderReq.growthProjections.getAnnualAppreciationRate();
//         const txn = new Transaction(
//             txnKey,
//             amountOrRate,
//             TransactionType.INCOME_STREAMS,
//             this.canBeCumulated,
//             !this.canBePercentage,
//             this.hasRateOfGrowth,
//             rateOfGrowth,
//         );
//         const calc: AppreciationAndIncomeProjectionCalculator =
//             new AppreciationAndIncomeProjectionCalculator(initialPurchasePrice, appreciationGrowthRate);
//         txn.setTransactionCalculator(calc);
//         return txn;
//     }


//     //---------------------------------------------------------------------------------------------------------------------

//     private createPropertyTaxTxn(): BaseTransaction {
//         return this.createFixedRecurringExpenseTxn(
//             TransactionKey.PROPERTY_TAX,
//             this.txnBuilderReq.monthlyPropertyTax,
//             this.txnBuilderReq.growthProjections.getAnnualTaxIncreaseRate(),
//         )
//     }

//     private createHOAFeeTxn(): BaseTransaction {
//         return this.createFixedRecurringExpenseTxn(
//             TransactionKey.HOA_FEE,
//             this.txnBuilderReq.monthlyPropertyTax,
//             this.txnBuilderReq.growthProjections.getAnnualHOAFeesIncreaseRate(),
//         )
//     }

//     private createHomeInsuranceTxn(): BaseTransaction {
//         return this.createFixedRecurringExpenseTxn(
//             TransactionKey.HOME_INSURANCE,
//             this.txnBuilderReq.monthlyPropertyTax,
//             this.txnBuilderReq.growthProjections.getAnnualHomeInsuranceIncreaseRate(),
//         )
//     }

//     private createFixedRecurringExpenseTxn(
//         txnKey: TransactionKey,
//         amountOrRate: ValueInput,
//         rateOfGrowth: ValueRateInput
//     ): BaseTransaction {
//         const initialRentalAmount = this.txnBuilderReq.rentEstimate;
//         const rentalGrowthRate = this.txnBuilderReq.growthProjections.getAnnualRentIncreaseRate();
//         const txn = new Transaction(
//             txnKey,
//             amountOrRate,
//             TransactionType.FIXED_RECURRING_EXPENSE,
//             this.canBeCumulated,
//             this.canBePercentage,
//             this.hasRateOfGrowth,
//             rateOfGrowth,
//         );
//         const calc: DynamicGrowthCalculator =
//             new DynamicGrowthCalculator(initialRentalAmount, rentalGrowthRate);
//         txn.setTransactionCalculator(calc);
//         return txn;
//     }

//     //---------------------------------------------------------------------------------------------------------------------

//     private createHomeAppreciationTxn(): BaseTransaction {
//         return this.createFinancingTxn(
//             TransactionKey.PURCHASE_PRICE,
//             this.txnBuilderReq.purchasePrice,
//             this.txnBuilderReq.growthProjections.getAnnualAppreciationRate(),
//         )
//     }

//     private createFinancingTxn(
//         txnKey: TransactionKey,
//         amountOrRate: ValueInput,
//         rateOfGrowth: ValueRateInput): BaseTransaction {
//         const txn = new Transaction(
//             txnKey,
//             amountOrRate,
//             TransactionType.FINANCING,
//             !this.canBeCumulated,
//             !this.canBePercentage,
//             this.hasRateOfGrowth,
//             rateOfGrowth,
//         );
//         const calc: MonthlyAppreciationCalculator =
//             new MonthlyAppreciationCalculator();
//         txn.setTransactionCalculator(calc);
//         return txn;
//     }

//     //---------------------------------------------------------------------------------------------------------------------

//     private createMortgageTxn(downPaymentTxn: BaseTransaction): BaseMortgageTransaction {
//         const initialPurchasePrice = this.txnBuilderReq.purchasePrice;
//         const termInYears = this.txnBuilderReq.termInYears;
//         const interestType = this.txnBuilderReq.interestType;
//         const annualInterestRate = this.txnBuilderReq.annualInterestRate;

//         const txn = new MortgageTransaction(
//             TransactionKey.MORTGAGE,
//             annualInterestRate,
//             TransactionType.MORTGAGE,
//             this.canBeCumulated,
//             this.canBePercentage,
//             !this.hasRateOfGrowth,
//         );
//         const calc: MortgageCalculator =
//             new MortgageCalculator(initialPurchasePrice, downPaymentTxn, termInYears, interestType);
//         txn.setTransactionCalculator(calc);
//         return txn;
//     }

//     //---------------------------------------------------------------------------------------------------------------------

//     private get canBeCumulated(): boolean {
//         return true;
//     }

//     private get canBePercentage(): boolean {
//         return true;
//     }

//     private get hasRateOfGrowth(): boolean {
//         return true;
//     }

// }