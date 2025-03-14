// // InvestmentBreakdownColumns.ts

// import { TableColumn } from "../../components/ReusableTable";
// import { InputType } from "../../constants/Constant";

// export const standardBreakdownColumns: TableColumn[] = [
//     {
//         header: "Year",
//         accessor: "year",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//     },
//     {
//         header: "Month",
//         accessor: "month",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//     },
//     {
//         header: "Date",
//         accessor: "date",
//         inputType: InputType.STRING,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//     },
//     {
//         header: "Mortgage Amount",
//         accessor: "mortgageAmount",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//         detailedDescription: `Mortgage Amount + PMI`,
//     },
//     {
//         header: "Total Interest Paid",
//         accessor: "totalInterestPaid",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Total Principal Paid",
//         accessor: "totalPrincipalPaid",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Remaining Balance",
//         accessor: "remainingBalance",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Rent Estimate",
//         accessor: "rentEstimate",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Monthly Income",
//         accessor: "monthlyIncome",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Monthly Expenses",
//         accessor: "monthlyExpenses",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Monthly Cash Flow",
//         accessor: "monthlyCashFlow",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//         detailedDescription: `Rent Estimate - (Monthly Payment + Operational Costs)`,
//     },
//     {
//         header: "Accumulated Cash Flow",
//         accessor: "accumulatedCashFlow",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Appreciation Amount",
//         accessor: "appreciationAmount",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false
//     },
// ];

// export const mortgageBreakdownColumns: TableColumn[] = [
//     {
//         header: "Year",
//         accessor: "year",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//     },
//     {
//         header: "Month",
//         accessor: "month",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//     },
//     {
//         header: "Date",
//         accessor: "date",
//         inputType: InputType.STRING,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//     },
//     {
//         header: "Mortgage Amount",
//         accessor: "mortgageAmount",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//         detailedDescription: `Mortgage Amount + PMI`,
//     },
//     {
//         header: "PMI Amount",
//         accessor: "pmiAmount",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Interest Payment",
//         accessor: "interestPayment",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Principal Payment",
//         accessor: "principalPayment",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Percentage of Interest (%)",
//         accessor: "percentageOfInterest",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//         addSuffix: '%',
//     },
//     {
//         header: "Percentage of Principal (%)",
//         accessor: "percentageOfPrincipal",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//         addSuffix: '%',
//     },
//     {
//         header: "Total Interest Paid",
//         accessor: "totalInterestPaid",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Total Principal Paid",
//         accessor: "totalPrincipalPaid",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Remaining Balance",
//         accessor: "remainingBalance",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
// ];

// export const investmentBreakdownColumns: TableColumn[] = [
//     {
//         header: "Year",
//         accessor: "year",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//     },
//     {
//         header: "Month",
//         accessor: "month",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//     },
//     {
//         header: "Date",
//         accessor: "date",
//         inputType: InputType.STRING,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//     },
//     {
//         header: "Rent Estimate",
//         accessor: "rentEstimate",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Monthly Income",
//         accessor: "monthlyIncome",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Monthly Expenses",
//         accessor: "monthlyExpenses",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Monthly Cash Flow",
//         accessor: "monthlyCashFlow",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//         detailedDescription: `Rent Estimate - (Monthly Payment + Operational Costs)`,
//     },
//     {
//         header: "Accumulated Cash Flow",
//         accessor: "accumulatedCashFlow",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Equity Amount",
//         accessor: "equityAmount",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//         detailedDescription: `Equity Amount`,
//     },
//     {
//         header: "Net Operating Income (NOI)",
//         accessor: "netOperatingIncome",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//         detailedDescription: `Net Operating Income (NOI)`,
//     },
//     {
//         header: "Accumulated Net Operating Income (NOI)",
//         accessor: "accumulatedNetOperatingIncome",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//         detailedDescription: `Accumulated Net Operation Income (NOI)`,
//     },
//     {
//         header: "Cap Rate (%)",
//         accessor: "capRate",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//         detailedDescription: `Cap Rate`,
//         addSuffix: `%`
//     },
//     {
//         header: "Return On Investment (ROI %)",
//         accessor: "returnOnInvestment",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//         detailedDescription: `Return On Investment (ROI)`,
//         addSuffix: `%`
//     },
//     {
//         header: "Cash On Cash Return (COC %)",
//         accessor: "cashOnCashReturn",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//         detailedDescription: `Cash On Cash Return (COC)`,
//         addSuffix: `%`,
//     },
//     {
//         header: "Monthly Net Income",
//         accessor: "monthlyNetIncome",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//         detailedDescription: `Monthly Net Income`,
//     },
//     {
//         header: "Accumulated Net Income",
//         accessor: "accumulatedNetIncome",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//         detailedDescription: `Accumulated Net Income`,
//     },
//     {
//         header: "Appreciation Amount",
//         accessor: "appreciationAmount",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false
//     },
// ];

// export const expensesBreakdownColumns: TableColumn[] = [
//     {
//         header: "Year",
//         accessor: "year",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//     },
//     {
//         header: "Month",
//         accessor: "month",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//     },
//     {
//         header: "Date",
//         accessor: "date",
//         inputType: InputType.STRING,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: false,
//         isSortable: false,
//     },
//     {
//         header: "Property Management Amount",
//         accessor: "propertyManagementAmount",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Vacancy Amount",
//         accessor: "vacancyAmount",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Maintenance Amount",
//         accessor: "maintenanceAmount",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Cap Ex Reserve Amount",
//         accessor: "capExReserveAmount",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Other Expense Amount",
//         accessor: "otherExpenseAmount",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Operational Costs",
//         accessor: "operationalCosts",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: true,
//         detailedDescription: `Property Management Amount + 
//                         Vacancy Amount +
//                         Maintenance Amount +
//                         Other Expenses Amount +
//                         CapEx Reserve Amount`,
//     },
//     {
//         header: "Property Tax Amount",
//         accessor: "propertyTaxAmount",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Monthly Home Insurance Amount",
//         accessor: "monthlyHomeInsuranceAmount",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Monthly HOA Fees Amount",
//         accessor: "monthlyHOAFeesAmount",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Fixed Costs",
//         accessor: "fixedCosts",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: true,
//         detailedDescription: `Property Tax Amount +
//                                 Monthly Home Insurance Amount +
//                                 Monthly HOA Fees Amount`,
//     },
//     {
//         header: "Mortgage Amount",
//         accessor: "mortgageAmount",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//         detailedDescription: `Mortgage Amount + PMI`,
//     },
//     {
//         header: "PMI Amount",
//         accessor: "pmiAmount",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
//     {
//         header: "Monthly Payment",
//         accessor: "monthlyPayment",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//         detailedDescription: `Mortgage Amount +
//                                 Property Tax Amount +
//                                 Monthly Home Insurance Amount +
//                                 Monthly HOA Fees Amount`,
//     },
//     {
//         header: "Monthly Payment + Operational Costs",
//         accessor: "monthlyPaymentAndOperationalCosts",
//         inputType: InputType.NUMBER,
//         isURL: false,
//         showColumn: true,
//         isDollarAmount: true,
//         isSortable: false,
//     },
// ];