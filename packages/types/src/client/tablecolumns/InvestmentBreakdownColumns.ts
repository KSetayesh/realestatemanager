import { MonthlyInvestmentDetailsResponseDTO } from "../../server/InvestmentTypes";
import { InvestmentDetailsTableHelper } from "../tabledata/InvestmentDetailsTableHelper";
import { ColumnDetail, InputType, PrimitiveType, TableType } from "../types/ClientTypes";

export const TotalInterestPaidColumn: ColumnDetail = {
    title: "Total Interest Paid",
    accessor: "totalInterestPaid",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getTotalInterestPaid(monthlyInvestmentDetails);
        }
    }
};

export const TotalPrincipalPaidColumn: ColumnDetail = {
    title: "Total Principal Paid",
    accessor: "totalPrincipalPaid",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getTotalPrincipalPaid(monthlyInvestmentDetails);
        }
    }
};

export const RemainingBalanceColumn: ColumnDetail = {
    title: "Remaining Balance",
    accessor: "remainingBalance",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getRemainingBalance(monthlyInvestmentDetails);
        }
    }
};

export const MonthlyIncomeColumn: ColumnDetail = {
    title: "Monthly Income",
    accessor: "monthlyIncome",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getMonthlyIncome(monthlyInvestmentDetails);
        }
    }
};

export const MonthlyExpensesColumn: ColumnDetail = {
    title: "Monthly Expenses",
    accessor: "monthlyExpenses",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getMonthlyExpenses(monthlyInvestmentDetails);
        }
    }
};

export const AccumulatedCashFlowColumn: ColumnDetail = {
    title: "Accumulated Cash Flow",
    accessor: "accumulatedCashFlow",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getAccumulatedCashFlow(monthlyInvestmentDetails);
        }
    }
};

export const AppreciationAmountColumn: ColumnDetail = {
    title: "Appreciation Amount",
    accessor: "appreciationAmount",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getAppreciationAmount(monthlyInvestmentDetails);
        }
    }
};

export const PMIAmountColumn: ColumnDetail = {
    title: "PMI Amount",
    accessor: "pmiAmount",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getPmiAmount(monthlyInvestmentDetails);
        }
    }
};

export const InterestPaymentColumn: ColumnDetail = {
    title: "Interest Payment",
    accessor: "interestPayment",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getInterestPayment(monthlyInvestmentDetails);
        }
    }
};

export const PrincipalPaymentColumn: ColumnDetail = {
    title: "Principal Payment",
    accessor: "principalPayment",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getPrincipalPayment(monthlyInvestmentDetails);
        }
    }
};

export const PercentageOfInterestColumn: ColumnDetail = {
    title: "Percentage of Interest (%)",
    accessor: "percentageOfInterest",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "%",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getPercentageOfInterest(monthlyInvestmentDetails);
        }
    }
};

export const PercentageOfPrincipalColumn: ColumnDetail = {
    title: "Percentage of Principal (%)",
    accessor: "percentageOfPrincipal",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "%",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getPercentageOfPrincipal(monthlyInvestmentDetails);
        }
    }
};

export const EquityAmountColumn: ColumnDetail = {
    title: "Equity Amount",
    accessor: "equityAmount",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getEquityAmount(monthlyInvestmentDetails);
        }
    }
};

export const NetOperatingIncomeColumn: ColumnDetail = {
    title: "Net Operating Income (NOI)",
    accessor: "netOperatingIncome",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getNetOperatingIncome(monthlyInvestmentDetails);
        }
    }
};

export const AccumulatedNetOperatingIncomeColumn: ColumnDetail = {
    title: "Accumulated Net Operating Income (NOI)",
    accessor: "accumulatedNetOperatingIncome",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getAccumulatedNetOperatingIncome(monthlyInvestmentDetails);
        }
    }
};

export const CashOnCashReturnColumn: ColumnDetail = {
    title: "Cash On Cash Return (COC %)",
    accessor: "cashOnCashReturn",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "%",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getCashOnCashReturn(monthlyInvestmentDetails);
        }
    }
};

export const MonthlyNetIncomeColumn: ColumnDetail = {
    title: "Monthly Net Income",
    accessor: "monthlyNetIncome",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getMonthlyNetIncome(monthlyInvestmentDetails);
        }
    }
};

export const AccumulatedNetIncomeColumn: ColumnDetail = {
    title: "Accumulated Net Income",
    accessor: "accumulatedNetIncome",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getAccumulatedNetIncome(monthlyInvestmentDetails);
        }
    }
};

export const PropertyManagementAmountColumn: ColumnDetail = {
    title: "Property Management Amount",
    accessor: "propertyManagementAmount",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getPropertyManagementAmount(monthlyInvestmentDetails);
        }
    }
};

export const VacancyAmountColumn: ColumnDetail = {
    title: "Vacancy Amount",
    accessor: "vacancyAmount",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getVacancyAmount(monthlyInvestmentDetails);
        }
    }
};

export const MaintenanceAmountColumn: ColumnDetail = {
    title: "Maintenance Amount",
    accessor: "maintenanceAmount",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getMaintenanceAmount(monthlyInvestmentDetails);
        }
    }
};

export const CapExReserveAmountColumn: ColumnDetail = {
    title: "Cap Ex Reserve Amount",
    accessor: "capExReserveAmount",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getCapExReserveAmount(monthlyInvestmentDetails);
        }
    }
};

export const OtherExpenseAmountColumn: ColumnDetail = {
    title: "Other Expense Amount",
    accessor: "otherExpenseAmount",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getOtherExpenseAmount(monthlyInvestmentDetails);
        }
    }
};

export const OperationalCostsColumn: ColumnDetail = {
    title: "Operational Costs",
    accessor: "operationalCosts",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getOperationalCosts(monthlyInvestmentDetails);
        }
    }
};

export const PropertyTaxAmountColumn: ColumnDetail = {
    title: "Property Tax Amount",
    accessor: "propertyTaxAmount",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getPropertyTaxAmount(monthlyInvestmentDetails);
        }
    }
};

export const MonthlyHomeInsuranceAmountColumn: ColumnDetail = {
    title: "Monthly Home Insurance Amount",
    accessor: "monthlyHomeInsuranceAmount",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getMonthlyHomeInsuranceAmount(monthlyInvestmentDetails);
        }
    }
};

export const MonthlyHOAFeesAmountColumn: ColumnDetail = {
    title: "Monthly HOA Fees Amount",
    accessor: "monthlyHOAFeesAmount",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getMonthlyHOAFeesAmount(monthlyInvestmentDetails);
        }
    }
};

export const FixedCostsColumn: ColumnDetail = {
    title: "Fixed Costs",
    accessor: "fixedCosts",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getFixedCosts(monthlyInvestmentDetails);
        }
    }
};

export const MonthlyPaymentColumn: ColumnDetail = {
    title: "Monthly Payment",
    accessor: "monthlyPayment",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getMonthlyPayment(monthlyInvestmentDetails);
        }
    }
};

export const MonthlyPaymentAndOperationalCostsColumn: ColumnDetail = {
    title: "Monthly Payment + Operational Costs",
    accessor: "monthlyPaymentAndOperationalCosts",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getMonthlyPaymentAndOperationalCosts(monthlyInvestmentDetails);
        }
    }
};

