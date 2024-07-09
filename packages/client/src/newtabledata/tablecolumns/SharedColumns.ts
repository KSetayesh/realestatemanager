import {
    AgentResponseDTO,
    ColumnDetail,
    HighYeildSavingsResponseDTO,
    InputType,
    ListingWithScenariosResponseDTO,
    MonthlyInvestmentDetailsResponseDTO,
    PrimitiveType,
    TableType
} from "@realestatemanager/types";
import { InvestmentDetailsTableHelper } from "../../newutilities/InvestmentDetailsTableHelper";
import { PropertiesListTableHelper } from "../../newutilities/PropertiesListTableHelper";
import { DummyCSVDataType } from "../../pages/PropertyForm";

export const YearColumn: ColumnDetail = {
    title: "Year",
    accessor: "year",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getYear(monthlyInvestmentDetails);
        }
    },
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        value: (highYeildSavings: HighYeildSavingsResponseDTO): PrimitiveType => {
            return highYeildSavings.year;
        }
    }
};

export const MonthColumn: ColumnDetail = {
    title: "Month",
    accessor: "month",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getMonth(monthlyInvestmentDetails);
        }
    },
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        value: (highYeildSavings: HighYeildSavingsResponseDTO): PrimitiveType => {
            return highYeildSavings.month;
        }
    }
};

export const DateColumn: ColumnDetail = {
    title: "Date",
    accessor: "date",
    inputType: InputType.STRING,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getDate(monthlyInvestmentDetails);
        }
    },
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        value: (highYeildSavings: HighYeildSavingsResponseDTO): PrimitiveType => {
            return highYeildSavings.date;
        }
    }
};

export const MortgageAmountColumn: ColumnDetail = {
    title: "Mortgage Amount",
    accessor: "mortgage",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getMortgage(listingWithScenarios);
        }
    },
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getMortgageAmount(ammortizationDetail);
        }
    }
};

export const RentEstimateColumn: ColumnDetail = {
    title: "Rent Estimate",
    accessor: "rentEstimate",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: true,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getRentEstimate(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setRentEstimate(listingWithScenarios, Number(newValue));
        }
    },
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getRentEstimate(ammortizationDetail);
        }
    }
};

export const MonthlyCashFlowColumn: ColumnDetail = {
    title: "Monthly Cash Flow",
    accessor: "monthlyCashFlow",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getMonthlyCashFlow(listingWithScenarios);
        }
    },
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getMonthlyCashFlow(ammortizationDetail);
        }
    }
};

export const CapRateColumn: ColumnDetail = {
    title: "Cap Rate",
    accessor: "capRate",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "%",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getCapRate(listingWithScenarios);
        }
    },
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getCapRate(ammortizationDetail);
        }
    }
};

export const ROIColumn: ColumnDetail = {
    title: "ROI",
    accessor: "ROI",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "%",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getROI(listingWithScenarios);
        }
    },
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        value: (ammortizationDetail: MonthlyInvestmentDetailsResponseDTO): PrimitiveType => {
            return InvestmentDetailsTableHelper.getReturnOnInvestment(ammortizationDetail);
        }
    }
};

export const CountryColumn: ColumnDetail = {
    title: "Country",
    accessor: "country",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getCountry(listingWithScenarios);
        }
    },
    [TableType.AGENT_TABLE]: {
        value: (agent: AgentResponseDTO): PrimitiveType => {
            return agent.country;
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.country;
        }
    }
};

export const StateColumn: ColumnDetail = {
    title: "State",
    accessor: "state",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getState(listingWithScenarios);
        }
    },
    [TableType.AGENT_TABLE]: {
        value: (agent: AgentResponseDTO): PrimitiveType => {
            return agent.state;
        }
    },
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        value: (dummyCSVData: DummyCSVDataType): PrimitiveType => {
            return dummyCSVData.state;
        }
    }
};