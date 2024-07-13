import {
    ColumnDetail,
    InputType,
    ListingCreationType,
    ListingWithScenariosResponseDTO,
    PrimitiveType,
    TableType,
    ValidationValue
} from "@realestatemanager/types";
import { Utility } from "@realestatemanager/utilities";
import { PropertiesListTableHelper } from "../../newutilities/PropertiesListTableHelper";
import { isPositiveWholeNumber } from "../../constants/Constant";

export const PriceColumn: ColumnDetail = {
    title: "Price",
    accessor: "price",
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
            return PropertiesListTableHelper.getPrice(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            PropertiesListTableHelper.setPrice(listingWithScenarios, Number(newValue));
        },
        validate: (newValue: PrimitiveType): ValidationValue => {
            if (newValue === undefined || newValue.toString.length === 0) {
                return {
                    isValid: false,
                    message: 'Must have a price',
                };
            }
            if (!isPositiveWholeNumber(newValue.toString())) {
                return {
                    isValid: false,
                    message: 'Not a valid Price (must be whole number and => 0',
                };
            }
            return {
                isValid: true
            };
        }
    }
};

export const InitialCostsColumn: ColumnDetail = {
    title: "Initial Costs",
    accessor: "initialCosts",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: `downPaymentAmount +
                            legalAndProfessionalFees +
                            initialRepairCosts +
                            travelingCosts +
                            closingCosts +
                            otherInitialExpenses`,
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getInitialCosts(listingWithScenarios);
        }
    }
};

export const LoanAmountColumn: ColumnDetail = {
    title: "Loan Amount",
    accessor: "loanAmount",
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
            return PropertiesListTableHelper.getLoanAmount(listingWithScenarios);
        }
    }
};

export const DownPaymentAmountColumn: ColumnDetail = {
    title: "Down Payment",
    accessor: "downPaymentAmount",
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
            return PropertiesListTableHelper.getDownPaymentAmount(listingWithScenarios);
        }
    }
};

export const AnnualInterestRateColumn: ColumnDetail = {
    title: "Annual Interest Rate",
    accessor: "annualInterestRate",
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
            return PropertiesListTableHelper.getAnnualInterestRate(listingWithScenarios);
        }
    }
};

export const RecurringCostsColumn: ColumnDetail = {
    title: "Recurring Costs",
    accessor: "recurringCosts",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: `propertyManagementAmount +
                            vacancyAmount +
                            maintenanceAmount +
                            otherExpensesAmount +
                            capExReserveAmount`,
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getRecurringCosts(listingWithScenarios);
        }
    }
};

export const InitialMonthlyPaymentColumn: ColumnDetail = {
    title: "Initial Monthly Payment",
    accessor: "initialMonthlyAmount",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: `Mortgage Amount +
                            Property Tax Amount +
                            Monthly Home Insurance Amount +
                            Monthly HOA Fees Amount`,
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getInitialMonthlyAmount(listingWithScenarios);
        }
    }
};

export const YearlyCashFlowColumn: ColumnDetail = {
    title: "Yearly Cash Flow",
    accessor: "yearlyCashFlow",
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
            return PropertiesListTableHelper.getYearlyCashFlow(listingWithScenarios);
        }
    }
};

export const DateListedColumn: ColumnDetail = {
    title: "Date Listed",
    accessor: "dateListed",
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
            return PropertiesListTableHelper.getDateListed(listingWithScenarios);
        }
    }
};

export const DateCreatedColumn: ColumnDetail = {
    title: "Date Created",
    accessor: "dateCreated",
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
            return PropertiesListTableHelper.getDateCreated(listingWithScenarios);
        }
    }
};

export const CreationTypeColumn: ColumnDetail = {
    title: "Creation Type",
    accessor: "creationType",
    inputType: InputType.TEXT,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: false,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getCreationType(listingWithScenarios);
        },
        setValue: (listingWithScenarios: ListingWithScenariosResponseDTO, newValue: PrimitiveType): void => {
            const errorMsg = 'CreationType cannot be undefined';
            if (newValue === undefined) {
                throw new Error(errorMsg);
            }
            const listingCreationTypeEnum: ListingCreationType | undefined = Utility.getEnumValue(
                ListingCreationType,
                newValue.toString()
            );
            if (listingCreationTypeEnum === undefined) {
                throw new Error(errorMsg);
            }
            PropertiesListTableHelper.setCreationType(listingWithScenarios, listingCreationTypeEnum);
        }
    }
};

// Only certain PropertyList tables will have this
export const InvestmentBreakdownColumn: ColumnDetail = {
    title: "Investment Breakdown",
    accessor: "investmentBreakdown",
    inputType: InputType.STRING,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    routeTo: 'investmentBreakdown',
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return 'View';
        }
    },
};

