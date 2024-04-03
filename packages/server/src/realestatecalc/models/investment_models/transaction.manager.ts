import {
    IncomeStreamsDTO,
    InitialCostsExpensesDTO,
    RecurringFixedExpensesDTO,
    RecurringOperationalCostsDTO,
    TransactionKey,
    TransactionType,
    TxnDTO,
    Utility
} from "@realestatemanager/shared";
import { Income } from "./income";
import { InitialCost } from "./initial.cost";
import { PurchasePrice } from "./purchase.price";
import { RecurringFixedCost } from "./recurring.fixed.cost";
import { RecurringOperationalCost } from "./recurring.operational.cost";
import { RentEstimate } from "./rent.estimate";


export class TransactionManager {
    private recurringFixedCostMap: Map<TransactionKey, RecurringFixedCost>;
    private incomeMap: Map<TransactionKey, Income>;
    private initialExpenseMap: Map<TransactionKey, InitialCost>;
    private recurringOperationalCostMap: Map<TransactionKey, RecurringOperationalCost>;

    constructor(
        recurringFixedCostMap: Map<TransactionKey, RecurringFixedCost>,
        incomeMap: Map<TransactionKey, Income>,
        initialExpenseMap: Map<TransactionKey, InitialCost>,
        recurringOperationalCostMap: Map<TransactionKey, RecurringOperationalCost>,
    ) {
        this.recurringFixedCostMap = recurringFixedCostMap;
        this.incomeMap = incomeMap;
        this.initialExpenseMap = initialExpenseMap;
        this.recurringOperationalCostMap = recurringOperationalCostMap;
    }

    getRecurringFixedExpensesDTO(rentEstimate: RentEstimate, monthCounter: number): RecurringFixedExpensesDTO {
        return {
            type: TransactionType.FIXED_RECURRING_EXPENSE,
            totalAmount: {
                description: '',
                amount: Utility.round(this.getTotalAmountOfRecurringExpenses(rentEstimate, monthCounter))
            },
            breakdown: {
                [TransactionKey.PROPERTY_TAX]: this.getMonthlyPropertyTaxDTO(rentEstimate, monthCounter),
                [TransactionKey.HOA_FEE]: this.getMonthlyHOAFeesAmountDTO(rentEstimate, monthCounter),
                [TransactionKey.HOME_INSURANCE]: this.getMonthlyHomeInsuranceAmountDTO(rentEstimate, monthCounter),
            },
        };
    }

    getInitialCostsDTO(purchasePrice: PurchasePrice): InitialCostsExpensesDTO {
        return {
            type: TransactionType.INITIAL_EXPENSE,
            totalAmount: {
                description: '',
                amount: Utility.round(this.getTotalInitialCosts(purchasePrice)),
            },
            breakdown: {
                [TransactionKey.DOWN_PAYMENT]: this.getDownPaymentDTO(purchasePrice),
                [TransactionKey.CLOSING_COST]: this.getClosingCostsDTO(purchasePrice),
                [TransactionKey.INITIAL_REPAIR_COST]: this.getInitialRepairCostsDTO(purchasePrice),
                [TransactionKey.LEGAL_AND_PROFESSIONAL_FEES]: this.getLegalAndProfessionalFeesDTO(purchasePrice),
                [TransactionKey.TRAVELING_COST]: this.getTravelingCostsDTO(purchasePrice),
                [TransactionKey.OTHER_INITIAL_EXPENSES]: this.getOtherInititalExpensesDTO(purchasePrice),
            },
        };
    }

    getIncomeStreamsDTO(rentEstimate: RentEstimate, monthCounter: number): IncomeStreamsDTO {
        return {
            type: TransactionType.INCOME_STREAMS,
            totalAmount: {
                description: '',
                amount: Utility.round(this.getTotalIncomeStreams(rentEstimate, monthCounter)),
            },
            breakdown: {
                [TransactionKey.RENTAL_INCOME]: rentEstimate.toDTO(monthCounter),
                [TransactionKey.STORAGE_UNIT_FEES]: this.getStorageUnitFeesDTO(rentEstimate, monthCounter),
                [TransactionKey.PARKING_FEES]: this.getParkingFeeDTO(rentEstimate, monthCounter),
                [TransactionKey.LAUNDRY_SERVICES]: this.getLaundryServiceDTO(rentEstimate, monthCounter),
                [TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS]: this.getOtherAdditionalIncomeStreamsDTO(rentEstimate, monthCounter),
            },
        };
    }

    getRecurringOperationalCostsDTO(rentEstimate: RentEstimate, monthCounter: number): RecurringOperationalCostsDTO {
        return {
            type: TransactionType.OPERATIONAL_RECURRING_EXPENSE,
            totalAmount: {
                description: '',
                amount: Utility.round(this.getTotalRecurringOperationalCosts(rentEstimate, monthCounter)),
            },
            breakdown: {
                [TransactionKey.CAP_EX_RESERVE_EXPENSE]: this.getCapExReserveRateDTO(rentEstimate, monthCounter),
                [TransactionKey.MAINTENANCE_EXPENSE]: this.getMaintenanceRateDTO(rentEstimate, monthCounter),
                [TransactionKey.OTHER_EXPENSES]: this.getOtherExpenseRateDTO(rentEstimate, monthCounter),
                [TransactionKey.PROPERTY_MANAGEMENT_EXPENSE]: this.getPropertyManagementRateDTO(rentEstimate, monthCounter),
                [TransactionKey.VACANCY_EXPENSE]: this.getVacancyRateDTO(rentEstimate, monthCounter),
            },
        };
    }

    // Total Amounts

    getTotalRecurringExpenseAmount(rentEstimate: RentEstimate, monthCounter: number): number {
        return this.getTotalAmountOfRecurringExpenses(rentEstimate, monthCounter) +
            this.getTotalRecurringOperationalCosts(rentEstimate, monthCounter);
    }

    getTotalIncomeStreams(rentEstimate: RentEstimate, monthCounter: number): number {
        let totalAmount = rentEstimate.getFutureDatedRentalAmount(monthCounter);
        this.incomeMap.forEach((income: Income) => {
            totalAmount += income.getAmount(rentEstimate, monthCounter);
        });
        return totalAmount;
    }

    getTotalAmountOfRecurringExpenses(rentEstimate: RentEstimate, monthCounter: number): number {
        let totalAmount = 0;
        this.recurringFixedCostMap.forEach((recurringFixedCost: RecurringFixedCost) => {
            totalAmount += recurringFixedCost.getAmount(rentEstimate, monthCounter);
        });
        return totalAmount;
    }

    getTotalInitialCosts(purchasePrice: PurchasePrice): number {
        let totalAmount = 0;
        this.initialExpenseMap.forEach((inialExpense: InitialCost) => {
            totalAmount += inialExpense.getAmount(purchasePrice);
        });
        return totalAmount;
    }

    getTotalRecurringOperationalCosts(rentEstimate: RentEstimate, monthCounter: number): number {
        let totalAmount = 0;
        this.recurringOperationalCostMap.forEach((recurringOperationalCost: RecurringOperationalCost) => {
            totalAmount += recurringOperationalCost.getAmount(rentEstimate, monthCounter);
        });
        return totalAmount;
    }

    // Fixed Recurring Expenses DTO
    private getMonthlyHOAFeesAmountDTO(rentEstimate: RentEstimate, monthCounter: number): TxnDTO {
        return this.monthlyHOAFeesTxn.toDTO(rentEstimate, monthCounter);
    }

    private getMonthlyHomeInsuranceAmountDTO(rentEstimate: RentEstimate, monthCounter: number): TxnDTO {
        return this.monthlyHomeInsuranceAmountTxn.toDTO(rentEstimate, monthCounter);
    }

    private getMonthlyPropertyTaxDTO(rentEstimate: RentEstimate, monthCounter: number): TxnDTO {
        return this.monthlyPropertyTaxTxn.toDTO(rentEstimate, monthCounter);
    }

    // Initial Costs DTO
    private getDownPaymentDTO(purchasePrice: PurchasePrice): TxnDTO {
        return this.downPaymentTxn.toDTO(purchasePrice);
    }

    private getClosingCostsDTO(purchasePrice: PurchasePrice): TxnDTO {
        return this.closingCostsTxn.toDTO(purchasePrice);
    }

    private getInitialRepairCostsDTO(purchasePrice: PurchasePrice): TxnDTO {
        return this.initialRepairCostsTxn.toDTO(purchasePrice);
    }

    private getLegalAndProfessionalFeesDTO(purchasePrice: PurchasePrice): TxnDTO {
        return this.legalAndProfessionalFeesTxn.toDTO(purchasePrice);
    }

    private getTravelingCostsDTO(purchasePrice: PurchasePrice): TxnDTO {
        return this.travelingCostsTxn.toDTO(purchasePrice);
    }

    private getOtherInititalExpensesDTO(purchasePrice: PurchasePrice): TxnDTO {
        return this.otherInitialExpensesTxn.toDTO(purchasePrice);
    }

    // Income Streams DTO
    private getStorageUnitFeesDTO(rentEstimate: RentEstimate, monthCounter: number): TxnDTO {
        return this.storageUnitFeesTxn.toDTO(rentEstimate, monthCounter);
    }

    private getParkingFeeDTO(rentEstimate: RentEstimate, monthCounter: number): TxnDTO {
        return this.parkingFeeTxn.toDTO(rentEstimate, monthCounter);
    }

    private getLaundryServiceDTO(rentEstimate: RentEstimate, monthCounter: number): TxnDTO {
        return this.laundryServiceTxn.toDTO(rentEstimate, monthCounter);
    }

    private getOtherAdditionalIncomeStreamsDTO(rentEstimate: RentEstimate, monthCounter: number): TxnDTO {
        return this.otherAdditionalIncomeStreamsTxn.toDTO(rentEstimate, monthCounter);
    }

    // Recurring Operational Expenses DTO

    private getCapExReserveRateDTO(rentEstimate: RentEstimate, monthCounter: number): TxnDTO {
        return this.capExReserveRateTxn.toDTO(rentEstimate, monthCounter);
    }

    private getMaintenanceRateDTO(rentEstimate: RentEstimate, monthCounter: number): TxnDTO {
        return this.maintenanceRateTxn.toDTO(rentEstimate, monthCounter);
    }

    private getOtherExpenseRateDTO(rentEstimate: RentEstimate, monthCounter: number): TxnDTO {
        return this.otherExpenseRateTxn.toDTO(rentEstimate, monthCounter);
    }

    private getPropertyManagementRateDTO(rentEstimate: RentEstimate, monthCounter: number): TxnDTO {
        return this.propertyManagementRateTxn.toDTO(rentEstimate, monthCounter);
    }

    private getVacancyRateDTO(rentEstimate: RentEstimate, monthCounter: number): TxnDTO {
        return this.vacancyRateTxn.toDTO(rentEstimate, monthCounter);
    }


    //-----------------------------------------------------------------------------------------------------------------

    // Fixed Recurring Expenses Txn
    get monthlyHOAFeesTxn(): RecurringFixedCost {
        return this.recurringFixedCostMap.get(TransactionKey.HOA_FEE);
    }

    get monthlyHomeInsuranceAmountTxn(): RecurringFixedCost {
        return this.recurringFixedCostMap.get(TransactionKey.HOME_INSURANCE);
    }

    get monthlyPropertyTaxTxn(): RecurringFixedCost {
        return this.recurringFixedCostMap.get(TransactionKey.PROPERTY_TAX);
    }

    // Initial Costs Txn
    get downPaymentTxn(): InitialCost {
        return this.initialExpenseMap.get(TransactionKey.DOWN_PAYMENT);
    }

    get closingCostsTxn(): InitialCost {
        return this.initialExpenseMap.get(TransactionKey.CLOSING_COST);
    }

    get initialRepairCostsTxn(): InitialCost {
        return this.initialExpenseMap.get(TransactionKey.INITIAL_REPAIR_COST);
    }

    get legalAndProfessionalFeesTxn(): InitialCost {
        return this.initialExpenseMap.get(TransactionKey.LEGAL_AND_PROFESSIONAL_FEES);
    }

    get travelingCostsTxn(): InitialCost {
        return this.initialExpenseMap.get(TransactionKey.TRAVELING_COST);
    }

    get otherInitialExpensesTxn(): InitialCost {
        return this.initialExpenseMap.get(TransactionKey.OTHER_INITIAL_EXPENSES);
    }

    // Income Streams Txn

    get storageUnitFeesTxn(): Income {
        return this.incomeMap.get(TransactionKey.STORAGE_UNIT_FEES);
    }

    get parkingFeeTxn(): Income {
        return this.incomeMap.get(TransactionKey.PARKING_FEES);
    }

    get laundryServiceTxn(): Income {
        return this.incomeMap.get(TransactionKey.LAUNDRY_SERVICES);
    }

    get otherAdditionalIncomeStreamsTxn(): Income {
        return this.incomeMap.get(TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS);
    }

    // Recurring Operational Expenses Txn

    get capExReserveRateTxn(): RecurringOperationalCost {
        return this.recurringOperationalCostMap.get(TransactionKey.CAP_EX_RESERVE_EXPENSE);
    }

    get maintenanceRateTxn(): RecurringOperationalCost {
        return this.recurringOperationalCostMap.get(TransactionKey.MAINTENANCE_EXPENSE);
    }

    get otherExpenseRateTxn(): RecurringOperationalCost {
        return this.recurringOperationalCostMap.get(TransactionKey.OTHER_EXPENSES);
    }

    get propertyManagementRateTxn(): RecurringOperationalCost {
        return this.recurringOperationalCostMap.get(TransactionKey.PROPERTY_MANAGEMENT_EXPENSE);
    }

    get vacancyRateTxn(): RecurringOperationalCost {
        return this.recurringOperationalCostMap.get(TransactionKey.VACANCY_EXPENSE);
    }

}