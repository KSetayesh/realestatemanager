// import { MonthlyInvestmentDetailsResponseDTO } from "@realestatemanager/types";
// import { TableColumn, TableRow } from "../components/ReusableTable";
// import { AbstractTable, TablesConfig } from "./AbstractTable";
// import {
//     expensesBreakdownColumns,
//     investmentBreakdownColumns,
//     mortgageBreakdownColumns,
//     standardBreakdownColumns
// } from "./columns/InvestmentBreakdownColumn";
// import { InvestmentBreakdownTableType } from "../constants/Constant";

// export class InvestmentBreakdownTable extends AbstractTable<MonthlyInvestmentDetailsResponseDTO, InvestmentBreakdownTableType> {

//     getDefaultTableType(): InvestmentBreakdownTableType {
//         return InvestmentBreakdownTableType.STANDARD_BREAKDOWN;
//     }

//     getDefaultColumns(): TableColumn[] {
//         return standardBreakdownColumns;
//     }

//     getTablesConfig(): TablesConfig<MonthlyInvestmentDetailsResponseDTO> {
//         return {
//             [InvestmentBreakdownTableType.STANDARD_BREAKDOWN]: {
//                 columns: this.getDefaultColumns(),
//                 data: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): TableRow => {
//                     return {
//                         year: ammortizationDetail.monthlyDateData.yearCounter,
//                         month: ammortizationDetail.monthlyDateData.monthMod12,
//                         date: ammortizationDetail.monthlyDateData.dateAsString,
//                         mortgageAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.amount,
//                         totalInterestPaid: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.totalInterestPaid,
//                         totalPrincipalPaid: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.totalPrincipalPaid,
//                         remainingBalance: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.balanceAfterPayment,
//                         rentEstimate: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Income Streams'].breakdown['Rental Income'].amount,
//                         monthlyIncome: ammortizationDetail.monthlyBreakdown.transactions.incomeAmount,
//                         monthlyExpenses: ammortizationDetail.monthlyBreakdown.transactions.expenseAmount,
//                         monthlyCashFlow: ammortizationDetail.monthlyBreakdown.transactions.cashFlow,
//                         accumulatedCashFlow: ammortizationDetail.monthlyBreakdown.investmentBreakdown.accumulatedCashFlow,
//                         appreciationAmount: ammortizationDetail.monthlyBreakdown.appreciation.homeValue, //ammortizationDetail.appreciationAmount,
//                     };
//                 },
//             },
//             [InvestmentBreakdownTableType.MORTGAGE_BREAKDOWN]: {
//                 columns: mortgageBreakdownColumns,
//                 data: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): TableRow => {
//                     return {
//                         year: ammortizationDetail.monthlyDateData.yearCounter,
//                         month: ammortizationDetail.monthlyDateData.monthMod12,
//                         date: ammortizationDetail.monthlyDateData.dateAsString,
//                         mortgageAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.amount,
//                         pmiAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.pmiAmount,
//                         interestPayment: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.interestAmountForPayment,
//                         principalPayment: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.principalAmountForPayment,
//                         percentageOfInterest: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.percentageOfInterest,
//                         percentageOfPrincipal: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.percentageOfPrincipal,
//                         totalInterestPaid: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.totalInterestPaid,
//                         totalPrincipalPaid: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.totalPrincipalPaid,
//                         remainingBalance: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.balanceAfterPayment,
//                     };
//                 },
//             },
//             [InvestmentBreakdownTableType.INVESTMENT_BREAKDOWN]: {
//                 columns: investmentBreakdownColumns,
//                 data: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): TableRow => {
//                     //TODO - Maybe move monthlyPayment calculation to backend
//                     return {
//                         year: ammortizationDetail.monthlyDateData.yearCounter,
//                         month: ammortizationDetail.monthlyDateData.monthMod12,
//                         date: ammortizationDetail.monthlyDateData.dateAsString,
//                         rentEstimate: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Income Streams'].breakdown['Rental Income'].amount,
//                         monthlyIncome: ammortizationDetail.monthlyBreakdown.transactions.incomeAmount,
//                         monthlyExpenses: ammortizationDetail.monthlyBreakdown.transactions.expenseAmount,
//                         monthlyCashFlow: ammortizationDetail.monthlyBreakdown.investmentBreakdown.monthlyCashFlow,
//                         // come back to this
//                         accumulatedCashFlow: ammortizationDetail.monthlyBreakdown.investmentBreakdown.accumulatedCashFlow,
//                         equityAmount: ammortizationDetail.monthlyBreakdown.investmentBreakdown.equityAmount,
//                         netOperatingIncome: ammortizationDetail.monthlyBreakdown.investmentBreakdown.NOI,
//                         accumulatedNetOperatingIncome: ammortizationDetail.monthlyBreakdown.investmentBreakdown.accumulatedNOI,
//                         capRate: ammortizationDetail.monthlyBreakdown.investmentBreakdown.capRate,
//                         returnOnInvestment: ammortizationDetail.monthlyBreakdown.investmentBreakdown.ROI,
//                         cashOnCashReturn: ammortizationDetail.monthlyBreakdown.investmentBreakdown.cashOnCashReturn,
//                         monthlyNetIncome: ammortizationDetail.monthlyBreakdown.investmentBreakdown.monthlyNetIncome,
//                         accumulatedNetIncome: ammortizationDetail.monthlyBreakdown.investmentBreakdown.accumulatedNetIncome,
//                         appreciationAmount: ammortizationDetail.monthlyBreakdown.appreciation.homeValue, //ammortizationDetail.appreciationAmount,
//                     };
//                 },
//             },
//             // Define type3 and type4 similarly
//             [InvestmentBreakdownTableType.EXPENSES_BREAKDOWN]: {
//                 columns: expensesBreakdownColumns,
//                 data: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): TableRow => {
//                     const mortgageAmount = ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.amount;
//                     const fixedCosts = ammortizationDetail.monthlyBreakdown.transactions.breakdown['Fixed Recurring Expense'].totalAmount.amount;
//                     //TODO - Maybe move monthlyPayment calculation to backend
//                     const monthlyPayment = mortgageAmount + fixedCosts;

//                     return {
//                         year: ammortizationDetail.monthlyDateData.yearCounter,
//                         month: ammortizationDetail.monthlyDateData.monthMod12,
//                         date: ammortizationDetail.monthlyDateData.dateAsString,
//                         propertyManagementAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Property Management Expense'].amount,
//                         vacancyAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Vacancy Expense'].amount,
//                         maintenanceAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Maintenance Expense'].amount,
//                         capExReserveAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Cap Ex Reserve Expense'].amount,
//                         otherExpenseAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Other Expeneses'].amount,
//                         operationalCosts: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].totalAmount.amount,
//                         propertyTaxAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Fixed Recurring Expense'].breakdown['Property Tax'].amount,
//                         monthlyHomeInsuranceAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Fixed Recurring Expense'].breakdown['Monthly Home Insurance'].amount,
//                         monthlyHOAFeesAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Fixed Recurring Expense'].breakdown['Monthly HOA Fee'].amount,
//                         fixedCosts: fixedCosts,
//                         mortgageAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.amount,
//                         pmiAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.pmiAmount,
//                         monthlyPayment: monthlyPayment,
//                         monthlyPaymentAndOperationalCosts: ammortizationDetail.monthlyBreakdown.transactions.expenseAmount,
//                     };
//                 },
//             },
//         };
//     }

// }