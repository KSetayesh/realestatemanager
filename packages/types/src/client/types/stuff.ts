import { ListingWithScenariosResponseDTO, MonthlyInvestmentDetailsResponseDTO } from "../../server/InvestmentTypes";
import { TableColumnDetailsEnum } from "../tabledata/TableTitles";
import { InputType, SortDirection } from "./ClientTypes";

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

export enum TableType {
    PROPERTY_LIST_TABLE = 'PROPERTY_LIST_TABLE',
    INVESTMENT_BREAKDOWN_TABLE = 'INVESTMENT_BREAKDOWN_TABLE',
}

// Define the type for the sort function
export type SortFunction<T> = (items?: T[], sortDirection?: SortDirection) => T[] | void;

// Define the type for the value function
export type ValueFunction<T> = (item?: T) => string | boolean | number | void;

export type SortFunctionTypes = SortFunction<ListingWithScenariosResponseDTO> | SortFunction<MonthlyInvestmentDetailsResponseDTO>;

export type ValueFunctionTypes = ValueFunction<ListingWithScenariosResponseDTO> | ValueFunction<MonthlyInvestmentDetailsResponseDTO>;

// Define the type for the table-specific details
export type TableTypeDetails = {
    sortFunction: SortFunctionTypes;
    value: ValueFunctionTypes;
};

// Define the type for the sortMap structure
// type SortMap = {
//     [key in TableColumnDetailsEnum]: {
//         title: string;
//         accessor: string;
//         inputType: InputType,
//         isUrl: boolean,
//         isDollarAmount: boolean,
//         addSuffix: string,
//         [key in TableType]: {
//             sortFunction: SortFunctionTypes;
//             value: ValueFunctionTypes;
//         };
//     };
// };

// Define the type for the sortMap structure
export type SortMap = {
    [key in TableColumnDetailsEnum]: {
        title: string;
        accessor: string;
        inputType: InputType;
        isUrl: boolean;
        isDollarAmount: boolean;
        addSuffix: string;
    } & {
        [key in TableType]: TableTypeDetails;
    };
};

const sort = <T>(list: T[], _func: (s: T) => number | string | boolean, sortDirection: SortDirection) => {
    return list.sort((a, b) => {
        const aValue = _func(a);
        const bValue = _func(b);
        return genericSort(aValue, bValue, sortDirection);
    });
}

// Implement the sortMap with the defined types
export const sortMap: SortMap = {
    [TableColumnDetailsEnum.PROPERTY_TYPE]: {
        title: "Property Type",
        accessor: "propertyType",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "",
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: (listingWithScenarios: ListingWithScenariosResponseDTO[], sortDirection: SortDirection) => {
                return sort(
                    listingWithScenarios, listing => listing.listingDetails.propertyDetails.propertyType,
                    sortDirection
                );
            },
            value: (listingWithScenarios: ListingWithScenariosResponseDTO): string | boolean | number => {
                return listingWithScenarios.listingDetails.propertyDetails.propertyType;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
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
        [TableType.PROPERTY_LIST_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        },
        [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
            sortFunction: () => {
                return;
            },
            value: (): string | boolean | number => {
                return;
            }
        }
    },
};
