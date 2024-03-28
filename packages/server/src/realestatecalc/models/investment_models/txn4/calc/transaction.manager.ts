import { CalculateTxnInterface, TxnDTO } from "../calculate.txn.interface";
import { Income } from "../income";
import { InitialCost } from "../initial.cost";
import { PurchasePrice } from "../purchase.price";
import { RecurringFixedCost } from "../recurring.fixed.cost";
import { RecurringOperationalCost } from "../recurring.operational.cost";
import { RentEstimate } from "../rent.estimate";
import { TransactionKey, TransactionType } from "./calculate";

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

    getRecurringFixedDTO(rentEstimate: RentEstimate, yearCounter: number) {
        return {
            [TransactionType.FIXED_RECURRING_EXPENSE]: {
                type: TransactionType.FIXED_RECURRING_EXPENSE,
                totalAmount: 0,
                breakdown: {
                    [TransactionKey.PROPERTY_TAX]: this.getMonthlyPropertyTaxDTO(rentEstimate, yearCounter),
                    [TransactionKey.HOA_FEE]: this.getMonthlyHOAFeesAmountDTO(rentEstimate, yearCounter),
                    [TransactionKey.HOME_INSURANCE]: this.getMonthlyHomeInsuranceAmountDTO(rentEstimate, yearCounter),
                },
            },
        };
    }

    // Fixed Recurring Expenses DTO
    private getMonthlyHOAFeesAmountDTO(rentEstimate: RentEstimate, yearCounter: number): TxnDTO {
        return this.monthlyHOAFeesTxn.toDTO(rentEstimate, yearCounter);
    }

    private getMonthlyHomeInsuranceAmountDTO(rentEstimate: RentEstimate, yearCounter: number): TxnDTO {
        return this.monthlyHomeInsuranceAmountTxn.toDTO(rentEstimate, yearCounter);
    }

    private getMonthlyPropertyTaxDTO(rentEstimate: RentEstimate, yearCounter: number): TxnDTO {
        return this.monthlyPropertyTaxTxn.toDTO(rentEstimate, yearCounter);
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
    private getStorageUnitFeesDTO(rentEstimate: RentEstimate, yearCounter: number): TxnDTO {
        return this.storageUnitFeesTxn.toDTO(rentEstimate, yearCounter);
    }

    private getParkingFeeDTO(rentEstimate: RentEstimate, yearCounter: number): TxnDTO {
        return this.parkingFeeTxn.toDTO(rentEstimate, yearCounter);
    }

    private getLaundryServiceDTO(rentEstimate: RentEstimate, yearCounter: number): TxnDTO {
        return this.laundryServiceTxn.toDTO(rentEstimate, yearCounter);
    }

    private getOtherAdditionalIncomeStreamsDTO(rentEstimate: RentEstimate, yearCounter: number): TxnDTO {
        return this.otherAdditionalIncomeStreamsTxn.toDTO(rentEstimate, yearCounter);
    }

    // Recurring Operational Expenses DTO

    private getCapExReserveRateDTO(rentEstimate: RentEstimate, yearCounter: number): TxnDTO {
        return this.capExReserveRateTxn.toDTO(rentEstimate, yearCounter);
    }

    private getMaintenanceRateDTO(rentEstimate: RentEstimate, yearCounter: number): TxnDTO {
        return this.maintenanceRateTxn.toDTO(rentEstimate, yearCounter);
    }

    private getOtherExpenseRateDTO(rentEstimate: RentEstimate, yearCounter: number): TxnDTO {
        return this.otherExpenseRateTxn.toDTO(rentEstimate, yearCounter);
    }

    private getPropertyManagementRateDTO(rentEstimate: RentEstimate, yearCounter: number): TxnDTO {
        return this.propertyManagementRateTxn.toDTO(rentEstimate, yearCounter);
    }

    private getVacancyRateDTO(rentEstimate: RentEstimate, yearCounter: number): TxnDTO {
        return this.vacancyRateTxn.toDTO(rentEstimate, yearCounter);
    }


    //-----------------------------------------------------------------------------------------------------------------

    // Fixed Recurring Expenses Txn
    private get monthlyHOAFeesTxn(): RecurringFixedCost {
        return this.recurringFixedCostMap.get(TransactionKey.HOA_FEE);
    }

    private get monthlyHomeInsuranceAmountTxn(): RecurringFixedCost {
        return this.recurringFixedCostMap.get(TransactionKey.HOME_INSURANCE);
    }

    private get monthlyPropertyTaxTxn(): RecurringFixedCost {
        return this.recurringFixedCostMap.get(TransactionKey.PROPERTY_TAX);
    }

    // Initial Costs Txn
    private get downPaymentTxn(): InitialCost {
        return this.initialExpenseMap.get(TransactionKey.DOWN_PAYMENT);
    }

    private get closingCostsTxn(): InitialCost {
        return this.initialExpenseMap.get(TransactionKey.CLOSING_COST);
    }

    private get initialRepairCostsTxn(): InitialCost {
        return this.initialExpenseMap.get(TransactionKey.INITIAL_REPAIR_COST);
    }

    private get legalAndProfessionalFeesTxn(): InitialCost {
        return this.initialExpenseMap.get(TransactionKey.LEGAL_AND_PROFESSIONAL_FEES);
    }

    private get travelingCostsTxn(): InitialCost {
        return this.initialExpenseMap.get(TransactionKey.TRAVELING_COST);
    }

    private get otherInitialExpensesTxn(): InitialCost {
        return this.initialExpenseMap.get(TransactionKey.OTHER_INITIAL_EXPENSES);
    }

    // Income Streams Txn

    private get storageUnitFeesTxn(): Income {
        return this.incomeMap.get(TransactionKey.STORAGE_UNIT_FEES);
    }

    private get parkingFeeTxn(): Income {
        return this.incomeMap.get(TransactionKey.PARKING_FEES);
    }

    private get laundryServiceTxn(): Income {
        return this.incomeMap.get(TransactionKey.LAUNDRY_SERVICES);
    }

    private get otherAdditionalIncomeStreamsTxn(): Income {
        return this.incomeMap.get(TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS);
    }

    // Recurring Operational Expenses Txn

    private get capExReserveRateTxn(): RecurringOperationalCost {
        return this.recurringOperationalCostMap.get(TransactionKey.CAP_EX_RESERVE_EXPENSE);
    }

    private get maintenanceRateTxn(): RecurringOperationalCost {
        return this.recurringOperationalCostMap.get(TransactionKey.MAINTENANCE_EXPENSE);
    }

    private get otherExpenseRateTxn(): RecurringOperationalCost {
        return this.recurringOperationalCostMap.get(TransactionKey.OTHER_EXPENSES);
    }

    private get propertyManagementRateTxn(): RecurringOperationalCost {
        return this.recurringOperationalCostMap.get(TransactionKey.PROPERTY_MANAGEMENT_EXPENSE);
    }

    private get vacancyRateTxn(): RecurringOperationalCost {
        return this.recurringOperationalCostMap.get(TransactionKey.VACANCY_EXPENSE);
    }

}