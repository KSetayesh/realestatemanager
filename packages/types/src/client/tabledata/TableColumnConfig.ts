import { ListingWithScenariosResponseDTO, MonthlyInvestmentDetailsResponseDTO } from "../../server/InvestmentTypes";
import { InputType, SortDirection } from "../types/ClientTypes";
import { PropertiesListTableHelper } from "./PropertiesListTableHelper";

export enum TableType {
    PROPERTY_LIST_TABLE = 'PROPERTY_LIST_TABLE',
    INVESTMENT_BREAKDOWN_TABLE = 'INVESTMENT_BREAKDOWN_TABLE',
};

export enum TableColumnDetailsEnum {
    // Property List Columns
    PROPERTY_TYPE = 'PROPERTY_TYPE',
    FULL_ADDRESS = 'FULL_ADDRESS',
    STATE = 'STATE',
    ZIP_CODE = 'ZIP_CODE',
    ZILLOW_URL = 'ZILLOW_URL',
    PRICE = 'PRICE',
    RENT_ESTIMATE = 'RENT_ESTIMATE',
    INITIAL_COSTS = 'INITIAL_COSTS',
    LOAN_AMOUNT = 'LOAN_AMOUNT',
    DOWN_PAYMENT_AMOUNT = 'DOWN_PAYMENT_AMOUNT',
    ANNUAL_INTEREST_RATE = 'ANNUAL_INTEREST_RATE',
    ROI = 'ROI',
    CAP_RATE = 'CAP_RATE',
    RECURRING_COSTS = 'RECURRING_COSTS',
    INITIAL_MONTHLY_AMOUNT = 'INITIAL_MONTHLY_AMOUNT',
    MORTGAGE = 'MORTGAGE',
    MONTHLY_CASH_FLOW = 'MONTHLY_CASH_FLOW',
    YEARLY_CASH_FLOW = 'YEARLY_CASH_FLOW',
    NUMBER_OF_DAYS_ON_MARKET = 'NUMBER_OF_DAYS_ON_MARKET',
    DATE_LISTED = 'DATE_LISTED',
    DATE_CREATED = 'DATE_CREATED',
    CITY = 'CITY',
    COUNTY = 'COUNTY',
    COUNTRY = 'COUNTRY',
    STREET_ADDRESS = 'STREET_ADDRESS',
    APARTMENT_NUMBER = 'APARTMENT_NUMBER',
    LONGITUDE = 'LONGITUDE',
    LATITUDE = 'LATITUDE',
    ELEMENTARY_SCHOOL_RATING = 'ELEMENTARY_SCHOOL_RATING',
    MIDDLE_SCHOOL_RATING = 'MIDDLE_SCHOOL_RATING',
    HIGH_SCHOOL_RATING = 'HIGH_SCHOOL_RATING',
    NUMBER_OF_BEDROOMS = 'NUMBER_OF_BEDROOMS',
    NUMBER_OF_FULL_BATHROOMS = 'NUMBER_OF_FULL_BATHROOMS',
    NUMBER_OF_HALF_BATHROOMS = 'NUMBER_OF_HALF_BATHROOMS',
    SQUARE_FEET = 'SQUARE_FEET',
    ACRES = 'ACRES',
    YEAR_BUILT = 'YEAR_BUILT',
    HAS_GARAGE = 'HAS_GARAGE',
    HAS_POOL = 'HAS_POOL',
    HAS_BASEMENT = 'HAS_BASEMENT',
    LISTING_PRICE = 'LISTING_PRICE',
    ZESTIMATE = 'ZESTIMATE',
    ZILLOW_RENT_ESTIMATE = 'ZILLOW_RENT_ESTIMATE',
    ZESTIMATE_RANGE_LOW = 'ZESTIMATE_RANGE_LOW',
    ZESTIMATE_RANGE_HIGH = 'ZESTIMATE_RANGE_HIGH',
    ZILLOW_MONTHLY_PROPERTY_TAX_AMOUNT = 'ZILLOW_MONTHLY_PROPERTY_TAX_AMOUNT',
    ZILLOW_MONTHLY_HOME_INSURANCE_AMOUNT = 'ZILLOW_MONTHLY_HOME_INSURANCE_AMOUNT',
    ZILLOW_MONTHLY_HOA_FEES_AMOUNT = 'ZILLOW_MONTHLY_HOA_FEES_AMOUNT',
    CREATION_TYPE = 'CREATION_TYPE',
    DESCRIPTION = 'DESCRIPTION',

    // InvestmentBreakdown Columns
    YEAR = 'YEAR',
    MONTH = 'MONTH',
    DATE = 'DATE',
    //MORTGAGE
    TOTAL_INTEREST_PAID = 'TOTAL_INTEREST_PAID',
    TOTAL_PRINCIPAL_PAID = 'TOTAL_PRINCIPAL_PAID',
    REMAINING_BALANCE = 'REMAINING_BALANCE',
    // RENT ESTIMATE
    // MONTHLY INCOME
    MONTHLY_EXPENSES = 'MONTHLY_EXPENSES',
    // MONTHLY CASH FLOW
    ACCUMULATED_CASH_FLOW = 'ACCUMULATED_CASH_FLOW',
    APPRECIATION_AMOUNT = 'APPRECIATION_AMOUNT',
    PMI_AMOUNT = 'PMI_AMOUNT',
    INTEREST_PAYMENT = 'INTEREST_PAYMENT',
    PRINCIPAL_PAYMENT = 'PRINCIPAL_PAYMENT',
    PERCENTAGE_OF_INTEREST = 'PERCENTAGE_OF_INTEREST',
    PERCENTAGE_OF_PRINCIPAL = 'PERCENTAGE_OF_PRINCIPAL',
    EQUITY_AMOUNT = 'EQUITY_AMOUNT',
    NET_OPERATING_INCOME = 'NET_OPERATING_INCOME',
    ACCUMULATED_NET_OPERATING_INCOME = 'ACCUMULATED_NET_OPERATING_INCOME',
    CASH_ON_CASH_RETURN = 'CASH_ON_CASH_RETURN',
    MONTHLY_NET_INCOME = 'MONTHLY_NET_INCOME',
    ACCUMULATED_NET_INCOME = 'ACCUMULATED_NET_INCOME',
    PROPERTY_MANAGEMENT_AMOUNT = 'PROPERTY_MANAGEMENT_AMOUNT',
    VACANCY_AMOUNT = 'VACANCY_AMOUNT',
    MAINTENANCE_AMOUNT = 'MAINTENANCE_AMOUNT',
    CAP_EX_RESERVE_AMOUNT = 'CAP_EX_RESERVE_AMOUNT',
    OTHER_EXPENSE_AMOUNT = 'OTHER_EXPENSE_AMOUNT',
    OPERATIONAL_COSTS = 'OPERATIONAL_COSTS',
    PROPERTY_TAX_AMOUNT = 'PROPERTY_TAX_AMOUNT',
    MONTHLY_HOME_INSURANCE_AMOUNT = 'MONTHLY_HOME_INSURANCE_AMOUNT',
    MONTHLY_HOA_FEES_AMOUNT = 'MONTHLY_HOA_FEES_AMOUNT',
    FIXED_COSTS = 'FIXED_COSTS',
    MONTHLY_PAYMENT_AND_OPERATIONAL_COSTS = 'MONTHLY_PAYMENT_AND_OPERATIONAL_COSTS',
};

export const genericSort = (
    aValue: number | string | boolean,
    bValue: number | string | boolean,
    sortDirection: SortDirection
): number => {
    if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === SortDirection.ASCENDING
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === SortDirection.ASCENDING
            ? aValue - bValue
            : bValue - aValue;
    }

    if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return sortDirection === SortDirection.ASCENDING
            ? (aValue === bValue ? 0 : aValue ? -1 : 1)
            : (aValue === bValue ? 0 : aValue ? 1 : -1);
    }

    // For mixed types or unhandled types, treat as equal
    return 0;
};

export type ValueType = string | boolean | number;

// Define a type that maps TableType to its corresponding DTO type
export type TableTypeSpecific<T extends TableType> =
    T extends TableType.PROPERTY_LIST_TABLE ? ListingWithScenariosResponseDTO :
    T extends TableType.INVESTMENT_BREAKDOWN_TABLE ? MonthlyInvestmentDetailsResponseDTO : never;

// Define the sort and value function types based on TableType
export type SortFunction<T extends TableType> =
    (items: TableTypeSpecific<T>[], sortDirection?: SortDirection) => TableTypeSpecific<T>[];

export type ValueFunction<T extends TableType> =
    (item: TableTypeSpecific<T>) => ValueType;

// Define the type for the table-specific details
export type TableTypeDetails<T extends TableType> = {
    sortFunction: SortFunction<T>;
    value: ValueFunction<T>;
};

// Define the type for the sortMap structure
export type ColumnsDetails = {
    [key in TableColumnDetailsEnum]: {
        title: string;
        accessor: string;
        inputType: InputType;
        isUrl: boolean;
        isDollarAmount: boolean;
        addSuffix: string;
        showColumn: boolean,
        isEditable: boolean,
        isSortable: boolean,
        detailedDescription: string,
    } & {
        [T in TableType]: TableTypeDetails<T>;
    };
};

const sort = <T>(list: T[], _func: (s: T) => ValueType, sortDirection: SortDirection): T[] => {
    return list.sort((a, b) => {
        const aValue = _func(a);
        const bValue = _func(b);
        return genericSort(aValue, bValue, sortDirection);
    });
};

// Implement the sortMap with the defined types
export const columnDetails: ColumnsDetails = {
    [TableColumnDetailsEnum.PROPERTY_TYPE]: {
        title: "Property Type",
        accessor: "propertyType",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: true,
        isEditable: false,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getFullAddress(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getFullAddress(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[], 
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.FULL_ADDRESS]: {
        title: "Full Address",
        accessor: "fullAddress",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: true,
        isEditable: false,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getFullAddress(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getFullAddress(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.STATE]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getState(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getState(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.ZIP_CODE]: {
        title: "Zip Code",
        accessor: "zipcode",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: true,
        isEditable: false,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getZipCode(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getZipCode(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.ZILLOW_URL]: {
        title: "Zillow Url",
        accessor: "zillowUrl",
        inputType: InputType.TEXT,
        isUrl: true,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: true,
        isEditable: false,
        isSortable: false,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getZillowURL(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getZillowURL(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.PRICE]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getPrice(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getPrice(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.RENT_ESTIMATE]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getRentEstimate(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getRentEstimate(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.INITIAL_COSTS]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getInitialCosts(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getInitialCosts(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.LOAN_AMOUNT]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getLoanAmount(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getLoanAmount(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.DOWN_PAYMENT_AMOUNT]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getDownPaymentAmount(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getDownPaymentAmount(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.ANNUAL_INTEREST_RATE]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getAnnualInterestRate(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getAnnualInterestRate(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.ROI]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getROI(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getROI(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.CAP_RATE]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getCapRate(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getCapRate(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.RECURRING_COSTS]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getRecurringCosts(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getRecurringCosts(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.INITIAL_MONTHLY_AMOUNT]: {
        title: "Monthly Payment",
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getInitialMonthlyAmount(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getInitialMonthlyAmount(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.MORTGAGE]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getMortgage(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getMortgage(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.MONTHLY_CASH_FLOW]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getMonthlyCashFlow(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getMonthlyCashFlow(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.YEARLY_CASH_FLOW]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getYearlyCashFlow(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getYearlyCashFlow(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.NUMBER_OF_DAYS_ON_MARKET]: {
        title: "Number of Days On Market",
        accessor: "numberOfDaysOnMarket",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: true,
        isEditable: false,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getNumberOfDaysOnMarket(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getNumberOfDaysOnMarket(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.DATE_LISTED]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getDateListed(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getDateListed(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.DATE_CREATED]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getDateCreated(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getDateCreated(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.CITY]: {
        title: "City",
        accessor: "city",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: false,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getCity(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getCity(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.COUNTY]: {
        title: "County",
        accessor: "county",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: false,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getCounty(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getCounty(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.COUNTRY]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getCountry(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getCountry(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.STREET_ADDRESS]: {
        title: "Street Address",
        accessor: "streetAddress",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: false,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getStreetAddress(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getStreetAddress(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.APARTMENT_NUMBER]: {
        title: "Apartment Number",
        accessor: "apartmentNumber",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: false,
        isSortable: false,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getApartmentNumber(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getApartmentNumber(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.LONGITUDE]: {
        title: "Longitude",
        accessor: "longitude",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: false,
        isSortable: false,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getLongitude(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getLongitude(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.LATITUDE]: {
        title: "Latitude",
        accessor: "latitude",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: false,
        isSortable: false,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getLatitude(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getLatitude(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.ELEMENTARY_SCHOOL_RATING]: {
        title: "Elementary School Rating",
        accessor: "elementarySchoolRating",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getElementarySchoolRating(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getElementarySchoolRating(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.MIDDLE_SCHOOL_RATING]: {
        title: "Middle School Rating",
        accessor: "middleSchoolRating",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getMiddleSchoolRating(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getMiddleSchoolRating(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.HIGH_SCHOOL_RATING]: {
        title: "High School Rating",
        accessor: "highSchoolRating",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getHighSchoolRating(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getHighSchoolRating(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.NUMBER_OF_BEDROOMS]: {
        title: "Number Of Bedrooms",
        accessor: "numberOfBedrooms",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getNumberOfBedrooms(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getNumberOfBedrooms(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.NUMBER_OF_FULL_BATHROOMS]: {
        title: "Number Of Full Bathrooms",
        accessor: "numberOfFullBathrooms",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getNumberOfFullBathrooms(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getNumberOfFullBathrooms(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.NUMBER_OF_HALF_BATHROOMS]: {
        title: "Number Of Half Bathrooms",
        accessor: "numberOfHalfBathrooms",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getNumberOfHalfBathrooms(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getNumberOfHalfBathrooms(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.SQUARE_FEET]: {
        title: "Square Feet",
        accessor: "squareFeet",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getSquareFeet(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getSquareFeet(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.ACRES]: {
        title: "Acres",
        accessor: "acres",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getAcres(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getAcres(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.YEAR_BUILT]: {
        title: "Year Built",
        accessor: "yearBuilt",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getYearBuilt(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getYearBuilt(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.HAS_GARAGE]: {
        title: "Has Garage",
        accessor: "hasGarage",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.hasGarage(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.hasGarage(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.HAS_POOL]: {
        title: "Has Pool",
        accessor: "hasPool",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.hasPool(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.hasPool(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.HAS_BASEMENT]: {
        title: "Has Basement",
        accessor: "hasBasement",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.hasBasement(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.hasBasement(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.LISTING_PRICE]: {
        title: "Listing Price",
        accessor: "listingPrice",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getListingPrice(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getListingPrice(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.ZESTIMATE]: {
        title: "Zestimate",
        accessor: "zestimate",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getZestimate(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getZestimate(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.ZILLOW_RENT_ESTIMATE]: {
        title: "Zillow Rent Estimate",
        accessor: "zillowRentEstimate",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getZillowRentEstimate(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getZillowRentEstimate(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.ZESTIMATE_RANGE_LOW]: {
        title: "Zillow Range Low",
        accessor: "zestimateRangeLow",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getZestimateRangeLow(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getZestimateRangeLow(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.ZESTIMATE_RANGE_HIGH]: {
        title: "Zillow Range High",
        accessor: "zestimateRangeHigh",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getZestimateRangeHigh(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getZestimateRangeHigh(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.ZILLOW_MONTHLY_PROPERTY_TAX_AMOUNT]: {
        title: "Zillow Monthly Property Tax Amount",
        accessor: "zillowMonthlyPropertyTaxAmount",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getZillowMonthlyPropertyTaxAmount(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getZillowMonthlyPropertyTaxAmount(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.ZILLOW_MONTHLY_HOME_INSURANCE_AMOUNT]: {
        title: "Zillow Monthly Home Insurance Amount",
        accessor: "zillowMonthlyHomeInsuranceAmount",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getZillowMonthlyHomeInsuranceAmount(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getZillowMonthlyHomeInsuranceAmount(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.ZILLOW_MONTHLY_HOA_FEES_AMOUNT]: {
        title: "Zillow Monthly HOA Fees Amount",
        accessor: "zillowMonthlyHOAFeesAmount",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: true,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getZillowMonthlyHOAFeesAmount(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getZillowMonthlyHOAFeesAmount(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.CREATION_TYPE]: {
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
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getCreationType(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getCreationType(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.DESCRIPTION]: {
        title: "Description",
        accessor: "description",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        showColumn: false,
        isEditable: true,
        isSortable: false,
        detailedDescription: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return sort(
                    listingWithScenarios,
                    listing => PropertiesListTableHelper.getDescription(listing),
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return PropertiesListTableHelper.getDescription(listingWithScenarios);
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.YEAR]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.MONTH]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.DATE]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.TOTAL_INTEREST_PAID]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.TOTAL_PRINCIPAL_PAID]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.REMAINING_BALANCE]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.MONTHLY_EXPENSES]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.ACCUMULATED_CASH_FLOW]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.APPRECIATION_AMOUNT]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.PMI_AMOUNT]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.INTEREST_PAYMENT]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.PRINCIPAL_PAYMENT]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.PERCENTAGE_OF_INTEREST]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.PERCENTAGE_OF_PRINCIPAL]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.EQUITY_AMOUNT]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.NET_OPERATING_INCOME]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.ACCUMULATED_NET_OPERATING_INCOME]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.CASH_ON_CASH_RETURN]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.MONTHLY_NET_INCOME]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.ACCUMULATED_NET_INCOME]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.PROPERTY_MANAGEMENT_AMOUNT]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.VACANCY_AMOUNT]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.MAINTENANCE_AMOUNT]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.CAP_EX_RESERVE_AMOUNT]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.OTHER_EXPENSE_AMOUNT]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.OPERATIONAL_COSTS]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.PROPERTY_TAX_AMOUNT]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.MONTHLY_HOME_INSURANCE_AMOUNT]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.MONTHLY_HOA_FEES_AMOUNT]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.FIXED_COSTS]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
    [TableColumnDetailsEnum.MONTHLY_PAYMENT_AND_OPERATIONAL_COSTS]: {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (
                listingWithScenarios: ListingWithScenariosResponseDTO[],
                sortDirection: SortDirection
            ) => {
                return listingWithScenarios;
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): ValueType => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: (
                monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO[],
                sortDirection: SortDirection
            ) => {
                throw new Error("Not implemented");
            },
            value: (monthlyInvestmentDetails: MonthlyInvestmentDetailsResponseDTO): ValueType => {
                return;
            }
        }
    },
};
