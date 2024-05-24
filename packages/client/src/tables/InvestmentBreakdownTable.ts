import { ListingWithScenariosResponseDTO, MonthlyInvestmentDetailsResponseDTO } from "@realestatemanager/shared";
import { InvestmentBreakdownTableType, TablesConfig } from "../pages/InvestmentBreakdown";
import { TableDataItem, TableRow } from "../components/ReusableTable";
import { AbstractTable } from "./AbstractTable";

export class InvestmentBreakdownTable extends AbstractTable<InvestmentBreakdownTableType, MonthlyInvestmentDetailsResponseDTO> {

    getTablesConfig(): TablesConfig<MonthlyInvestmentDetailsResponseDTO> {
        return {
            [InvestmentBreakdownTableType.STANDARD_BREAKDOWN]: {
                columns: [
                    {
                        header: "Year",
                        accessor: "year",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                    },
                    {
                        header: "Month",
                        accessor: "month",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                    },
                    {
                        header: "Date",
                        accessor: "date",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                    },
                    {
                        header: "Mortgage Amount",
                        accessor: "mortgageAmount",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                        detailedDescription: `Mortgage Amount + PMI`,
                    },
                    {
                        header: "Total Interest Paid",
                        accessor: "totalInterestPaid",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Total Principal Paid",
                        accessor: "totalPrincipalPaid",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Remaining Balance",
                        accessor: "remainingBalance",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Rent Estimate",
                        accessor: "rentEstimate",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Monthly Income",
                        accessor: "monthlyIncome",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Monthly Expenses",
                        accessor: "monthlyExpenses",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Monthly Cash Flow",
                        accessor: "monthlyCashFlow",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                        detailedDescription: `Rent Estimate - (Monthly Payment + Operational Costs)`,
                    },
                    {
                        header: "Accumulated Cash Flow",
                        accessor: "accumulatedCashFlow",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Appreciation Amount",
                        accessor: "appreciationAmount",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false
                    },
                ],
                data: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): TableRow => {
                    return {
                        year: ammortizationDetail.monthlyDateData.yearCounter,
                        month: ammortizationDetail.monthlyDateData.monthMod12,
                        date: ammortizationDetail.monthlyDateData.dateAsString,
                        mortgageAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.amount,
                        totalInterestPaid: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.totalInterestPaid,
                        totalPrincipalPaid: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.totalPrincipalPaid,
                        remainingBalance: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.balanceAfterPayment,
                        rentEstimate: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Income Streams'].breakdown['Rental Income'].amount,
                        monthlyIncome: ammortizationDetail.monthlyBreakdown.transactions.incomeAmount,
                        monthlyExpenses: ammortizationDetail.monthlyBreakdown.transactions.expenseAmount,
                        monthlyCashFlow: ammortizationDetail.monthlyBreakdown.transactions.cashFlow,
                        accumulatedCashFlow: ammortizationDetail.monthlyBreakdown.investmentBreakdown.accumulatedCashFlow,
                        appreciationAmount: ammortizationDetail.monthlyBreakdown.appreciation.homeValue, //ammortizationDetail.appreciationAmount,
                    };
                },
            },
            [InvestmentBreakdownTableType.MORTGAGE_BREAKDOWN]: {
                columns: [
                    {
                        header: "Year",
                        accessor: "year",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                    },
                    {
                        header: "Month",
                        accessor: "month",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                    },
                    {
                        header: "Date",
                        accessor: "date",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                    },
                    {
                        header: "Mortgage Amount",
                        accessor: "mortgageAmount",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                        detailedDescription: `Mortgage Amount + PMI`,
                    },
                    {
                        header: "PMI Amount",
                        accessor: "pmiAmount",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Interest Payment",
                        accessor: "interestPayment",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Principal Payment",
                        accessor: "principalPayment",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Interest Payment",
                        accessor: "interestPayment",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Percentage of Interest (%)",
                        accessor: "percentageOfInterest",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                        addSuffix: '%',
                    },
                    {
                        header: "Percentage of Principal (%)",
                        accessor: "percentageOfPrincipal",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                        addSuffix: '%',
                    },
                    {
                        header: "Total Interest Paid",
                        accessor: "totalInterestPaid",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Total Principal Paid",
                        accessor: "totalPrincipalPaid",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Remaining Balance",
                        accessor: "remainingBalance",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                ],
                data: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): TableRow => {
                    return {
                        year: ammortizationDetail.monthlyDateData.yearCounter,
                        month: ammortizationDetail.monthlyDateData.monthMod12,
                        date: ammortizationDetail.monthlyDateData.dateAsString,
                        mortgageAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.amount,
                        pmiAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.pmiAmount,
                        interestPayment: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.interestAmountForPayment,
                        principalPayment: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.principalAmountForPayment,
                        percentageOfInterest: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.percentageOfInterest,
                        percentageOfPrincipal: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.percentageOfPrincipal,
                        totalInterestPaid: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.totalInterestPaid,
                        totalPrincipalPaid: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.totalPrincipalPaid,
                        remainingBalance: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.balanceAfterPayment,
                    };
                },
            },
            [InvestmentBreakdownTableType.INVESTMENT_BREAKDOWN]: {
                columns: [
                    {
                        header: "Year",
                        accessor: "year",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                    },
                    {
                        header: "Month",
                        accessor: "month",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                    },
                    {
                        header: "Date",
                        accessor: "date",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                    },
                    {
                        header: "Rent Estimate",
                        accessor: "rentEstimate",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Monthly Income",
                        accessor: "monthlyIncome",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Monthly Expenses",
                        accessor: "monthlyExpenses",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Monthly Cash Flow",
                        accessor: "monthlyCashFlow",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                        detailedDescription: `Rent Estimate - (Monthly Payment + Operational Costs)`,
                    },
                    {
                        header: "Accumulated Cash Flow",
                        accessor: "accumulatedCashFlow",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Equity Amount",
                        accessor: "equityAmount",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                        detailedDescription: `Equity Amount`,
                    },
                    {
                        header: "Net Operating Income (NOI)",
                        accessor: "netOperatingIncome",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                        detailedDescription: `Net Operating Income (NOI)`,
                    },
                    {
                        header: "Accumulated Net Operating Income (NOI)",
                        accessor: "accumulatedNetOperatingIncome",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                        detailedDescription: `Accumulated Net Operation Income (NOI)`,
                    },
                    {
                        header: "Cap Rate (%)",
                        accessor: "capRate",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                        detailedDescription: `Cap Rate`,
                        addSuffix: `%`
                    },
                    {
                        header: "Return On Investment (ROI %)",
                        accessor: "returnOnInvestment",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                        detailedDescription: `Return On Investment (ROI)`,
                        addSuffix: `%`
                    },
                    {
                        header: "Cash On Cash Return (COC %)",
                        accessor: "cashOnCashReturn",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                        detailedDescription: `Cash On Cash Return (COC)`,
                        addSuffix: `%`,
                    },
                    {
                        header: "Monthly Net Income",
                        accessor: "monthlyNetIncome",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                        detailedDescription: `Monthly Net Income`,
                    },
                    {
                        header: "Accumulated Net Income",
                        accessor: "accumulatedNetIncome",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                        detailedDescription: `Accumulated Net Income`,
                    },
                    {
                        header: "Appreciation Amount",
                        accessor: "appreciationAmount",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false
                    },
                ],
                data: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): TableRow => {
                    //TODO - Maybe move monthlyPayment calculation to backend
                    return {
                        year: ammortizationDetail.monthlyDateData.yearCounter,
                        month: ammortizationDetail.monthlyDateData.monthMod12,
                        date: ammortizationDetail.monthlyDateData.dateAsString,
                        rentEstimate: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Income Streams'].breakdown['Rental Income'].amount,
                        monthlyIncome: ammortizationDetail.monthlyBreakdown.transactions.incomeAmount,
                        monthlyExpenses: ammortizationDetail.monthlyBreakdown.transactions.expenseAmount,
                        monthlyCashFlow: ammortizationDetail.monthlyBreakdown.investmentBreakdown.monthlyCashFlow,
                        // come back to this
                        accumulatedCashFlow: ammortizationDetail.monthlyBreakdown.investmentBreakdown.accumulatedCashFlow,
                        equityAmount: ammortizationDetail.monthlyBreakdown.investmentBreakdown.equityAmount,
                        netOperatingIncome: ammortizationDetail.monthlyBreakdown.investmentBreakdown.NOI,
                        accumulatedNetOperatingIncome: ammortizationDetail.monthlyBreakdown.investmentBreakdown.accumulatedNOI,
                        capRate: ammortizationDetail.monthlyBreakdown.investmentBreakdown.capRate,
                        returnOnInvestment: ammortizationDetail.monthlyBreakdown.investmentBreakdown.ROI,
                        cashOnCashReturn: ammortizationDetail.monthlyBreakdown.investmentBreakdown.cashOnCashReturn,
                        monthlyNetIncome: ammortizationDetail.monthlyBreakdown.investmentBreakdown.monthlyNetIncome,
                        accumulatedNetIncome: ammortizationDetail.monthlyBreakdown.investmentBreakdown.accumulatedNetIncome,
                        appreciationAmount: ammortizationDetail.monthlyBreakdown.appreciation.homeValue, //ammortizationDetail.appreciationAmount,
                    };
                },
            },
            // Define type3 and type4 similarly
            [InvestmentBreakdownTableType.EXPENSES_BREAKDOWN]: {
                columns: [
                    {
                        header: "Year",
                        accessor: "year",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                    },
                    {
                        header: "Month",
                        accessor: "month",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                    },
                    {
                        header: "Date",
                        accessor: "date",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: false,
                        isSortable: false,
                    },
                    {
                        header: "Property Management Amount",
                        accessor: "propertyManagementAmount",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Vacancy Amount",
                        accessor: "vacancyAmount",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Maintenance Amount",
                        accessor: "maintenanceAmount",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Cap Ex Reserve Amount",
                        accessor: "capExReserveAmount",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Other Expense Amount",
                        accessor: "otherExpenseAmount",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Operational Costs",
                        accessor: "operationalCosts",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: true,
                        detailedDescription: `Property Management Amount + 
                        Vacancy Amount +
                        Maintenance Amount +
                        Other Expenses Amount +
                        CapEx Reserve Amount`,
                    },
                    {
                        header: "Property Tax Amount",
                        accessor: "propertyTaxAmount",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Monthly Home Insurance Amount",
                        accessor: "monthlyHomeInsuranceAmount",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Monthly HOA Fees Amount",
                        accessor: "monthlyHOAFeesAmount",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Fixed Costs",
                        accessor: "fixedCosts",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: true,
                        detailedDescription: `Property Tax Amount +
                                Monthly Home Insurance Amount +
                                Monthly HOA Fees Amount`,
                    },
                    {
                        header: "Mortgage Amount",
                        accessor: "mortgageAmount",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                        detailedDescription: `Mortgage Amount + PMI`,
                    },
                    {
                        header: "PMI Amount",
                        accessor: "pmiAmount",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                    {
                        header: "Monthly Payment",
                        accessor: "monthlyPayment",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                        detailedDescription: `Mortgage Amount +
                                Property Tax Amount +
                                Monthly Home Insurance Amount +
                                Monthly HOA Fees Amount`,
                    },
                    {
                        header: "Monthly Payment + Operational Costs",
                        accessor: "monthlyPaymentAndOperationalCosts",
                        isURL: false,
                        showColumn: true,
                        isDollarAmount: true,
                        isSortable: false,
                    },
                ],
                data: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): TableRow => {
                    const mortgageAmount = ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.amount;
                    const fixedCosts = ammortizationDetail.monthlyBreakdown.transactions.breakdown['Fixed Recurring Expense'].totalAmount.amount;
                    //TODO - Maybe move monthlyPayment calculation to backend
                    const monthlyPayment = mortgageAmount + fixedCosts;

                    return {
                        year: ammortizationDetail.monthlyDateData.yearCounter,
                        month: ammortizationDetail.monthlyDateData.monthMod12,
                        date: ammortizationDetail.monthlyDateData.dateAsString,
                        propertyManagementAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Property Management Expense'].amount,
                        vacancyAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Vacancy Expense'].amount,
                        maintenanceAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Maintenance Expense'].amount,
                        capExReserveAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Cap Ex Reserve Expense'].amount,
                        otherExpenseAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].breakdown['Other Expeneses'].amount,
                        operationalCosts: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Operational Recurring Expense'].totalAmount.amount,
                        propertyTaxAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Fixed Recurring Expense'].breakdown['Property Tax'].amount,
                        monthlyHomeInsuranceAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Fixed Recurring Expense'].breakdown['Monthly Home Insurance'].amount,
                        monthlyHOAFeesAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown['Fixed Recurring Expense'].breakdown['Monthly HOA Fee'].amount,
                        fixedCosts: fixedCosts,
                        mortgageAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.amount,
                        pmiAmount: ammortizationDetail.monthlyBreakdown.transactions.breakdown.Mortgage.breakdown.pmiAmount,
                        monthlyPayment: monthlyPayment,
                        monthlyPaymentAndOperationalCosts: ammortizationDetail.monthlyBreakdown.transactions.expenseAmount,
                    };
                },
            },
        };
    }

    getTableData(
        properties: ListingWithScenariosResponseDTO[],
        tableType: InvestmentBreakdownTableType
    ): TableDataItem<MonthlyInvestmentDetailsResponseDTO>[] {
        const property: ListingWithScenariosResponseDTO = properties[0];
        const ammortizationDetails: MonthlyInvestmentDetailsResponseDTO[] = property.metrics.amortizationData; // investmentProjections.ammortizationDetails!;
        return ammortizationDetails.map(ammortizationDetail => ({
            objectData: {
                key: ammortizationDetail,
            },
            // Change createRowDataForInvestmentMetrics to the proper function for radio type
            rowData: this.getTablesConfig()[tableType].data(ammortizationDetail), //createRowDataForInvestmentMetrics(ammortizationDetail),
        }));

    };


}