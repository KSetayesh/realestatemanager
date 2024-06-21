import { MonthlyInvestmentDetailsResponseDTO } from "@realestatemanager/types";

export class InvestmentDetailsHelper {

    static getYear(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyDateData.yearCounter;
    }

    static getMonth(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyDateData.monthMod12;
    }

    static getDate(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): string {
        return ammortizationDetail.monthlyDateData.dateAsString;
    }

    static getMortgageAmount(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.amount;
    }

    static getTotalInterestPaid(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.totalInterestPaid;
    }

    static getTotalPrincipalPaid(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.totalPrincipalPaid;
    }

    static getRemainingBalance(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.balanceAfterPayment;
    }

    static getRentEstimate(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown['Income Streams'].breakdown['Rental Income'].amount;
    }

    static getMonthlyIncome(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.incomeAmount;
    }

    static getMonthlyExpenses(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.expenseAmount;
    }

    static getMonthlyCashFlow(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.cashFlow;
    }

    static getAccumulatedCashFlow(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.investmentBreakdown.accumulatedCashFlow;
    }

    static getAppreciationAmount(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.appreciation.homeValue;
    }

    static getPmiAmount(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.pmiAmount;
    }

    static getInterestPayment(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.interestAmountForPayment;
    }

    static getPrincipalPayment(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.principalAmountForPayment;
    }

    static getPercentageOfInterest(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.percentageOfInterest;
    }

    static getPercentageOfPrincipal(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.percentageOfPrincipal;
    }

    static getEquityAmount(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.investmentBreakdown.equityAmount;
    }

    static getNetOperatingIncome(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.investmentBreakdown.NOI;
    }

    static getAccumulatedNetOperatingIncome(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.investmentBreakdown.accumulatedNOI;
    }

    static getCapRate(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.investmentBreakdown.capRate;
    }

    static getReturnOnInvestment(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.investmentBreakdown.ROI;
    }

    static getCashOnCashReturn(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.investmentBreakdown.cashOnCashReturn;
    }

    static getMonthlyNetIncome(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.investmentBreakdown.monthlyNetIncome;
    }

    static getAccumulatedNetIncome(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.investmentBreakdown.accumulatedNetIncome;
    }


    static getPropertyManagementAmount(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Property Management Expense'].amount;
    }

    static getVacancyAmount(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Vacancy Expense'].amount;
    }

    static getMaintenanceAmount(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Maintenance Expense'].amount;
    }

    static getCapExReserveAmount(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Cap Ex Reserve Expense'].amount;
    }

    static getOtherExpenseAmount(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Other Expeneses'].amount;
    }

    static getOperationalCosts(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].totalAmount.amount;
    }

    static getPropertyTaxAmount(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown['Fixed Recurring Expense'].breakdown['Property Tax'].amount;
    }

    static getMonthlyHomeInsuranceAmount(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown['Fixed Recurring Expense'].breakdown['Monthly Home Insurance'].amount;
    }

    static getMonthlyHOAFeesAmount(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown['Fixed Recurring Expense'].breakdown['Monthly HOA Fee'].amount;
    }

    static getFixedCosts(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.breakdown['Fixed Recurring Expense'].totalAmount.amount;
    }

    // Fix this, maybe move to backend
    static getMonthlyPayment(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return this.getMortgageAmount(ammortizationDetail) + this.getFixedCosts(ammortizationDetail);
    }

    static getMonthlyPaymentAndOperationalCosts(ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): number {
        return ammortizationDetail.monthlyBreakdown.transactions.expenseAmount;
    }



}