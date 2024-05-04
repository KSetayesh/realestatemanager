import { accumulateAndSum, getYear } from "src/shared/Constants";
import { MortgageCalculator } from "./transaction_models/mortgage.calc";
import { PurchasePrice } from "./transaction_models/purchase.price";
import { RentEstimate } from "./transaction_models/rent.estimate";
import {
    AmortizationBreakdownDTO,
    FinancingDTO,
    InitialInvestmentBreakdownDTO,
    InvestmentBreakdownDTO,
    MonthlyDateData,
    MonthlyInvestmentBreakdownDTO,
    MonthlyInvestmentDetailsDTO,
    MortgageDTO,
    MortgageTxnDTO,
    TransactionKey,
    TransactionType,
    Utility
} from "@realestatemanager/shared";
import { TransactionManager } from "./transaction.manager";
import { GrowthProjections } from "./growth.projections.model";
import { TaxImplications } from "./tax.implications.model";

export class InvestmentCalculator {

    private transactionManager: TransactionManager;
    private mortgageCalc: MortgageCalculator;
    private growthProjections: GrowthProjections;
    private taxImplications: TaxImplications;

    // Financing
    private purchasePrice: PurchasePrice;
    private rentalEstimate: RentEstimate;

    constructor(
        transactionManager: TransactionManager,
        mortgageCalc: MortgageCalculator,
        growthProjections: GrowthProjections,
        taxImplications: TaxImplications,
        purchasePrice: PurchasePrice,
        rentalEstimate: RentEstimate,
    ) {
        this.transactionManager = transactionManager;
        this.mortgageCalc = mortgageCalc;
        this.growthProjections = growthProjections;
        this.taxImplications = taxImplications;
        this.purchasePrice = purchasePrice;
        this.rentalEstimate = rentalEstimate;
    }

    createInvestmentMetrics(): AmortizationBreakdownDTO {
        let ammortizationList: MonthlyInvestmentDetailsDTO[] = [];

        const totalPayments = this.mortgageCalc.numberOfPayments;
        const today = new Date();
        const year = today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear();
        const nextMonth = (today.getMonth() + 1) % 12;


        for (let monthCounter = 1; monthCounter <= totalPayments; monthCounter++) {
            const monthlyDateData: MonthlyDateData = this.getDateData(year, nextMonth, monthCounter);
            const monthlyInvestmentDetailsDTO: MonthlyInvestmentDetailsDTO = {
                monthlyDateData: monthlyDateData,
                monthlyBreakdown: this.getMonthlyTransactionData(monthCounter),
            };

            ammortizationList.push(monthlyInvestmentDetailsDTO);
        }

        const returnData: AmortizationBreakdownDTO = {
            initialInvestmenDetails: this.getInitialValues(),
            growthProjections: this.growthProjections.toDTO(),
            taxImplications: this.taxImplications.toDTO(),
            amortizationData: ammortizationList,
        }

        return returnData;
    }

    private getInitialValues(): InitialInvestmentBreakdownDTO {
        return {
            investmentBreakdown: this.getInvestmentBreakdownDTO(0),
            transactions: {
                [TransactionType.FINANCING]: this.getFinancingDTO(),

                [TransactionType.MORTGAGE]: this.getMortgageDTO(0),

                [TransactionType.FIXED_RECURRING_EXPENSE]:
                    this.transactionManager.getRecurringFixedExpensesDTO(this.rentalEstimate, 0),

                [TransactionType.INCOME_STREAMS]:
                    this.transactionManager.getIncomeStreamsDTO(this.rentalEstimate, 0),

                [TransactionType.OPERATIONAL_RECURRING_EXPENSE]:
                    this.transactionManager.getRecurringOperationalCostsDTO(this.rentalEstimate, 0),

                [TransactionType.INITIAL_EXPENSE]: this.transactionManager.getInitialCostsDTO(this.purchasePrice),
            },
        };
    }

    private getMonthlyTransactionData(monthCounter: number): MonthlyInvestmentBreakdownDTO { //AmortizationYearData {
        // const yearCounter = getYear(monthCounter);
        return {
            appreciation: {
                appreciationRate: this.purchasePrice.getExpectedAppreciationRate(),
                homeValue: Utility.round(this.purchasePrice.getFutureDatedHomeValue(monthCounter)),
            },
            // Go back to the calculations for each of these 4 investmentBreakdown properties
            investmentBreakdown: this.getInvestmentBreakdownDTO(monthCounter),
            transactions: {
                expenseAmount: Utility.round(this.getTotalRecurringExpenseAmountIncludingMortgage(this.rentalEstimate, monthCounter)),
                incomeAmount: Utility.round(this.getTotalIncomeStreams(this.rentalEstimate, monthCounter)),
                cashFlow: Utility.round(this.calculateMonthlyCashFlow(this.rentalEstimate, monthCounter)),
                breakdown: {
                    [TransactionType.OPERATIONAL_RECURRING_EXPENSE]:
                        this.transactionManager.getRecurringOperationalCostsDTO(this.rentalEstimate, monthCounter),

                    [TransactionType.INCOME_STREAMS]:
                        this.transactionManager.getIncomeStreamsDTO(this.rentalEstimate, monthCounter),

                    [TransactionType.FIXED_RECURRING_EXPENSE]:
                        this.transactionManager.getRecurringFixedExpensesDTO(this.rentalEstimate, monthCounter),

                    [TransactionType.MORTGAGE]: this.getMortgageDTO(monthCounter),
                },
            },
        };

    }

    private getInvestmentBreakdownDTO(monthCounter: number): InvestmentBreakdownDTO {
        return {
            NOI: Utility.round(this.calculateNOI(this.rentalEstimate, monthCounter)),
            accumulatedNOI: Utility.round(this.calculateAccumulatedNOI(this.rentalEstimate, 12)),
            capRate: Utility.round(this.calculateCapRate(this.rentalEstimate, 12)),
            ROI: Utility.round(this.calculateROI(this.rentalEstimate, 12)),
            cashOnCashReturn: Utility.round(this.calculateCashOnCashReturn(this.rentalEstimate, 12)),
            monthlyCashFlow: Utility.round(this.calculateMonthlyCashFlow(this.rentalEstimate, monthCounter)),
            yearlyCashFlow: Utility.round(this.getAccumulatedCashFlow(this.rentalEstimate, 12)),
            monthlyNetIncome: Utility.round(this.calculateMonthlyNetIncome(this.rentalEstimate, monthCounter)),
            accumulatedNetIncome: Utility.round(this.calculateAccumulatedNetIncome(this.rentalEstimate, 12)),
            accumulatedCashFlow: Utility.round(this.getAccumulatedCashFlow(this.rentalEstimate, 12)),
            equityAmount: Utility.round(this.calculateEquityAmount(monthCounter)),
        };
    }

    private getFinancingDTO(): FinancingDTO {
        return {
            type: TransactionType.FINANCING,
            breakdown: {
                [TransactionKey.PURCHASE_PRICE]: this.purchasePrice.toDTO(0),
                [TransactionKey.LOAN_AMOUNT]: Utility.round(this.mortgageCalc.getLoanAmount()),
            },
        };
    }

    private getMortgageDTO(monthCounter: number): MortgageDTO {

        const mortgageTxnDTO = (monthCounter: number): MortgageTxnDTO => {
            return this.mortgageCalc.toDTO(monthCounter);
        }

        return {
            type: TransactionType.MORTGAGE,
            totalAmount: {
                amount: Utility.round(this.mortgageCalc.getAmount(monthCounter)),
                description: 'Mortgage + PMI'
            },
            breakdown: mortgageTxnDTO(monthCounter),
        };
    }

    private getTotalRecurringExpenseAmount(
        rentEstimate: RentEstimate,
        monthCounter: number,
        callBack?: (txnKey: TransactionKey) => boolean
    ): number {
        return this.transactionManager.getTotalRecurringExpenseAmount(rentEstimate, monthCounter, callBack);
    }

    private getTotalRecurringExpenseAmountIncludingMortgage(
        rentEstimate: RentEstimate,
        monthCounter: number,
    ): number {
        return this.getTotalRecurringExpenseAmount(rentEstimate, monthCounter) +
            this.mortgageCalc.getAmount(monthCounter);
    }

    private getTotalIncomeStreams(rentEstimate: RentEstimate, monthCounter: number): number {
        return this.transactionManager.getTotalIncomeStreams(rentEstimate, monthCounter);
    }

    private getDateData(year: number, nextMonth: number, monthCounter: number): MonthlyDateData {
        const month = (nextMonth + (monthCounter - 1)) % 12;
        const yearOffset = Math.floor((nextMonth + (monthCounter - 1)) / 12);
        const date: Date = new Date(year + yearOffset, month, 1);
        const dateAsString = date.toLocaleDateString('en-US'); // date.toISOString().split('T')[0];
        const monthMod12 = ((monthCounter - 1) % 12) + 1;
        const yearCounter = getYear(monthCounter);
        return {
            dateAsString: dateAsString,
            monthMod12: monthMod12,
            yearCounter: yearCounter,
        }
    }

    private get downPaymentAmount(): number {
        return this.transactionManager.downPaymentTxn.getAmount(this.purchasePrice);
    }

    private get initialPurchasePrice(): number {
        return this.purchasePrice.getInitialPurchasePrice();
    }

    private get totalInitialCosts(): number {
        return this.transactionManager.getTotalInitialCosts(this.purchasePrice);
    }

    // Need to update this so that it takes into account sale price, closing costs, additional fees, etc.
    private calculateNetSaleProceeds(monthCounter: number) {
        return this.calculateEquityAmount(monthCounter);
    }

    //--------------------------------------------------------------------------------------------------------------------------------

    /**
   * Calculates the Return on Investment (ROI) for a property over a specified time period.
   * ROI is expressed as a percentage and measures the profitability of the investment,
   * taking into account the total gains from operations and potential sale proceeds relative to the initial investment.
   *
   * @param {number} monthCounter - The time period over which the ROI is calculated. This
   *                                indicates how long the property has been held and generating income.
   * @return {number} - The ROI percentage, indicating the efficiency and profitability of the investment.
   */
    private calculateROI(
        rentEstimate: RentEstimate,
        monthCounter: number
    ): number {
        // Retrieve the total cash initially invested in the property. This includes down payments,
        // closing costs, and any other upfront expenses directly related to the purchase of the property.
        const totalCashInvested = this.totalInitialCosts;

        // Error handling to prevent division by zero in the ROI calculation, ensuring that the
        // initial investment is a positive number to produce a meaningful ROI.
        if (totalCashInvested <= 0) {
            throw new Error("Total cash invested must be greater than zero.");
        }

        // Calculate the net proceeds from the potential sale of the property after the specified
        // number of months. This figure should account for the current value of the property minus
        // any outstanding mortgage balance and selling costs.
        // This function needs to be accurately implemented to reflect true sale proceeds.
        const netProceedsInSale = this.calculateNetSaleProceeds(monthCounter) - this.mortgageCalc.calculateBalanceAfterPayment(monthCounter);

        // Accumulate the total cash flow generated from the property over the specified period.
        // This includes all rental income after expenses, providing insight into the operational
        // profitability of the property.
        const accumulatedCashFlow = this.getAccumulatedCashFlow(rentEstimate, monthCounter);

        // Sum of net sale proceeds and accumulated operational cash flow gives the total gain
        // from the investment, encapsulating both capital gains (from property value increase and sale)
        // and income gains (from rental operations).
        const totalGainFromInvestment = netProceedsInSale + accumulatedCashFlow;

        // The ROI is calculated by comparing the total gains from the investment against the
        // total cash initially invested, showing the total return as a percentage.
        // return ((totalGainFromInvestment - totalCashInvested) / totalCashInvested) * 100;
        return (totalGainFromInvestment / totalCashInvested) * 100;
    }


    /**
    * Calculates the current equity amount in a home based on a given month index.
    * Equity is calculated as the difference between the home's future market value
    * and the outstanding balance on the mortgage.
    *
    * @param {number} monthCounter - The month index for which to calculate equity.
    * @return {number} - The equity value of the home.
    */
    private calculateEquityAmount(monthCounter: number): number {
        // Retrieve the estimated current market value of the property as of the specified month.
        // Assumes a method is available that can predict or provide property value at a future date.
        const currentMarketValueOfProperty = this.purchasePrice.getFutureDatedHomeValue(monthCounter);

        // Determine the remaining mortgage balance after the specified number of payments.
        const loanBalance = this.mortgageCalc.calculateBalanceAfterPayment(monthCounter);

        // Calculate equity as the difference between estimated home value and loan balance.
        return currentMarketValueOfProperty - loanBalance;
    }

    /**
    * Calculates the Cash on Cash Return for an investment over a specified period.
    * This financial metric measures the percentage return on the cash invested based on the cash flows generated by the property.
    *
    * @param {RentEstimate} rentEstimate - Rental income and expense estimates for the property.
    * @param {number} monthCounter - The number of months over which the return is calculated.
    * @return {number} - The Cash on Cash Return as a percentage.
    */
    private calculateCashOnCashReturn(
        rentEstimate: RentEstimate,
        monthCounter: number
    ): number {

        // Retrieve the total initial cash invested in the property.
        const totalCashInvested = this.totalInitialCosts;

        // Prevent division by zero and ensure total cash invested is positive.
        if (totalCashInvested <= 0) {
            throw new Error("Total cash invested must be greater than zero.");
        }

        // Calculate the total net cash flow accumulated from the start of the investment to the specified month.
        const accumulatedCashFlow = this.getAccumulatedCashFlow(rentEstimate, monthCounter);

        // Calculate the Cash on Cash Return as a percentage.
        return (accumulatedCashFlow / totalCashInvested) * 100;
    }

    /**
    * Calculates the accumulated cash flow from rental operations over a specified number of months.
    * This function sums up the cash flow from the start of the rental period up to the specified month.
    *
    * @param {RentEstimate} rentEstimate - An object containing rental income and expense estimates.
    * @param {number} monthCounter - The number of months for which to calculate the total cash flow.
    * @return {number} - The total accumulated cash flow over the specified period.
    */
    private getAccumulatedCashFlow(
        rentEstimate: RentEstimate,
        monthCounter: number
    ): number {
        return accumulateAndSum(month => this.calculateMonthlyCashFlow(rentEstimate, month), monthCounter);
    }

    /**
     * Calculates the accumulated amount of income streams from a rental property over a specified period.
     * This function sums up all income generated month by month up to the specified month counter,
     * providing a total of how much income has been generated by the property within that timeframe.
     *
     * @param {RentEstimate} rentEstimate - An object containing estimates of rental income and possible
     *                                      other income streams for the property, structured in a way that
     *                                      allows monthly querying.
     * @param {number} monthCounter - The number of months for which to accumulate income. The function
     *                                will sum the income from month 0 to monthCounter - 1.
     * @return {number} - The total income accumulated over the specified period.
     */
    private getAccumulatedIncomeStreamsAmount(
        rentEstimate: RentEstimate,
        monthCounter: number
    ): number {
        return accumulateAndSum(month => this.getTotalIncomeStreams(rentEstimate, month), monthCounter);
    }

    /**
     * Calculates the total accumulated recurring expenses for a property over a specified period.
     * This function aggregates all recurring expenses generated month by month up to the given month counter,
     * providing the cumulative total of expenses incurred by the property within that timeframe.
     *
     * @param {RentEstimate} rentEstimate - An object containing detailed estimates of recurring expenses,
     *                                      which may include property management fees, maintenance costs,
     *                                      utilities, property taxes, insurance, and other regular payments
     *                                      necessary for the operation and upkeep of the rental property.
     * @param {number} monthCounter - The number of months for which to accumulate expenses. This function
     *                                sums expenses from the start of the period (month 0) to the end of the
     *                                period specified by monthCounter, but not including the monthCounter month
     *                                itself (i.e., up to monthCounter - 1).
     * @return {number} - The total amount of recurring expenses accumulated over the specified number of months.
     */
    private getAccumulatedTotalRecurringExpenseAmount(
        rentEstimate: RentEstimate,
        monthCounter: number
    ): number {
        return accumulateAndSum(month => this.getTotalRecurringExpenseAmount(rentEstimate, month), monthCounter);
    }


    /**
     * Calculates the monthly cash flow from a property based on the given rent estimate and month index.
     * Monthly cash flow is the net amount of cash generated after all expenses, including mortgage payments,
     * are subtracted from the total income.
     * 
     * @param {RentEstimate} rentEstimate - Data structure containing rental income and other financial estimates.
     * @param {number} monthCounter - The specific month for which the cash flow is being calculated.
     * @returns {number} - The net cash flow amount for the month.
     */
    private calculateMonthlyCashFlow(
        rentEstimate: RentEstimate,
        monthCounter: number,
    ): number {
        // Retrieve the total income streams for the property for the given month.
        const income = this.getTotalIncomeStreams(rentEstimate, monthCounter);

        // Calculate total expenses, including both mortgage payments and operational expenses.
        // It is assumed that getAmount includes both principal and interest components of the mortgage.
        const expenses = this.getTotalRecurringExpenseAmountIncludingMortgage(rentEstimate, monthCounter);

        // The monthly cash flow is the income minus the total expenses.
        return income - expenses;
    }

    /**
    * Calculates the net income from a property for a specific month based on rental estimates.
    * Net income is defined as the total income minus all operational expenses and interest (not including principal payments),
    * adjusted for non-cash expenses like depreciation.
    * 
    * @param {RentEstimate} rentEstimate - Data structure containing estimates of rental income and expenses.
    * @param {number} monthCounter - The month index for which the net income is calculated.
    * @returns {number} - The calculated net income for the month.
    */
    private calculateMonthlyNetIncome(
        rentEstimate: RentEstimate,
        monthCounter: number
    ): number {
        // Define or calculate depreciation based on property value and relevant depreciation schedules.
        // Placeholder is 0, replace with actual depreciation calculation as applicable.
        const depreciation = 0; // This should be calculated based on the property's purchase price and depreciation schedule.

        // Total income from the property, typically including rents and possibly other income like parking fees.
        const income = this.getTotalIncomeStreams(rentEstimate, monthCounter);

        // Total expenses include operational expenses, interest paid on mortgage (not principal),
        // and depreciation (a non-cash expense that impacts profit but not actual cash flow).
        const expenses = this.mortgageCalc.getInterestAmountForPayment(monthCounter) +
            this.getTotalRecurringExpenseAmount(rentEstimate, monthCounter) +
            depreciation;

        // Net income is calculated as total income minus total expenses.
        return income - expenses;
    }


    /**
     * Calculates the net income from a property for a specific month based on rental estimates.
     * Net income is defined as the total income minus all operational expenses and interest (not including principal payments),
     * adjusted for non-cash expenses like depreciation.
     * 
     * @param {RentEstimate} rentEstimate - Data structure containing estimates of rental income and expenses.
     * @param {number} monthCounter - The month index for which the net income is calculated.
     * @returns {number} - The calculated net income for the month.
     */
    private calculateAccumulatedNetIncome(
        rentEstimate: RentEstimate,
        monthCounter: number
    ): number {
        return accumulateAndSum(month => this.calculateMonthlyNetIncome(rentEstimate, month), monthCounter);
    }


    /**
    * Calculates the capitalization rate (cap rate) for a property based on current market value and NOI.
    * The cap rate is a measure used to assess the return on investment of a property, expressed as a percentage.
    * It provides investors with an estimate of potential return relative to the market value of the property.
    *
    * @param {RentEstimate} rentEstimate - Rental estimate data for the property.
    * @param {number} monthCounter - Index indicating the month of interest for which cap rate is calculated.
    * @returns {number} - The cap rate as a percentage. This is calculated by dividing the NOI by the
    * current market value of the property and multiplying by 100 to get a percentage.
    */
    private calculateCapRate(
        rentEstimate: RentEstimate,
        monthCounter: number
    ): number {
        // Calculate NOI for the property using provided rent estimates and month index.
        const accumulatedNOI = this.calculateAccumulatedNOI(rentEstimate, monthCounter);

        // Retrieve the estimated current market value of the property as of the specified month.
        // Assumes a method is available that can predict or provide property value at a future date.
        const currentMarketValueOfProperty = this.purchasePrice.getFutureDatedHomeValue(monthCounter);

        // Calculate the cap rate by dividing NOI by the current market value and multiplying by 100.
        return (accumulatedNOI / currentMarketValueOfProperty) * 100;
    }


    /**
     * Calculates the Net Operating Income (NOI) for a property, specifically excluding capital expenditure reserve expenses.
     * NOI is a fundamental metric in real estate investment analysis that measures the profitability of income-generating properties,
     * accounting only for operating income and expenses.
     *
     * @param {RentEstimate} rentEstimate - Rental estimate data for the property.
     * @param {number} monthCounter - Month index for which the NOI is calculated.
     * @returns {number} - The calculated NOI. This is derived by subtracting total operational expenses from the total income,
     * where operational expenses are adjusted to exclude capital expenditure reserves.
     */
    private calculateNOI(
        rentEstimate: RentEstimate,
        monthCounter: number
    ): number {
        // Retrieve the total income streams for the specified month from the rental estimates.
        const totalIncome = this.getTotalIncomeStreams(rentEstimate, monthCounter);

        // Callback function to exclude capital expenditure reserves from the operational expenses.
        const callBack = (txnKey: TransactionKey): boolean => {
            return txnKey !== TransactionKey.CAP_EX_RESERVE_EXPENSE;
        };

        // Calculate total recurring operational expenses for the month, using the callback to filter out capital expenditures.
        const totalRecurringExpensesAmount = this.getTotalRecurringExpenseAmount(rentEstimate, monthCounter, callBack);

        // NOI is calculated as total income minus operational expenses that qualify under the defined criteria.
        return totalIncome - totalRecurringExpensesAmount;
    }

    private calculateAccumulatedNOI(
        rentEstimate: RentEstimate,
        monthCounter: number
    ): number {
        return accumulateAndSum(month => this.calculateNOI(rentEstimate, month), monthCounter);
    }


}