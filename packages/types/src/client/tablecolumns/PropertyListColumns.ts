import { ListingWithScenariosResponseDTO } from "../../server/InvestmentTypes";
import { PropertiesListTableHelper } from "../tabledata/PropertiesListTableHelper";
import { ColumnDetail, InputType, PrimitiveType, TableType } from "../types/ClientTypes";

export const PropertyTypeColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getFullAddress(listingWithScenarios);
        }
    },
};

export const FullAddressColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getFullAddress(listingWithScenarios);
        }
    },
};

export const ZipCodeColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZipCode(listingWithScenarios);
        }
    },
};

export const ZillowUrlColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZillowURL(listingWithScenarios);
        }
    },
};

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
        }
    },
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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
};

export const NumberOfDaysOnMarketColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getNumberOfDaysOnMarket(listingWithScenarios);
        }
    },
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
    },
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
    },
};

export const CityColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getCity(listingWithScenarios);
        }
    },
};

export const CountyColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getCounty(listingWithScenarios);
        }
    },
};

export const StreetAddressColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getStreetAddress(listingWithScenarios);
        }
    },
};

export const ApartmentNumberColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getApartmentNumber(listingWithScenarios);
        }
    },
};

export const LongitudeColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getLongitude(listingWithScenarios);
        }
    },
};

export const LatitudeColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getLatitude(listingWithScenarios);
        }
    },
};

export const ElementarySchoolRatingColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getElementarySchoolRating(listingWithScenarios);
        }
    },
};

export const MiddleSchoolRatingColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getMiddleSchoolRating(listingWithScenarios);
        }
    },
};

export const HighSchoolRatingColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getHighSchoolRating(listingWithScenarios);
        }
    },
};

export const NumberOfBedroomsColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getNumberOfBedrooms(listingWithScenarios);
        }
    },
};

export const NumberOfFullBathroomsColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getNumberOfFullBathrooms(listingWithScenarios);
        }
    },
};

export const NumberOfHalfBathroomsColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getNumberOfHalfBathrooms(listingWithScenarios);
        }
    },
};

export const SquareFeetColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getSquareFeet(listingWithScenarios);
        }
    },
}

export const AcresColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getAcres(listingWithScenarios);
        }
    },
};

export const YearBuiltColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getYearBuilt(listingWithScenarios);
        }
    },
};

export const HasGarageColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.hasGarage(listingWithScenarios);
        }
    },
};

export const HasPoolColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.hasPool(listingWithScenarios);
        }
    },
};

export const HasBasementColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.hasBasement(listingWithScenarios);
        }
    },
};

export const ListingPriceColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getListingPrice(listingWithScenarios);
        }
    },
};

export const ZestimateColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZestimate(listingWithScenarios);
        }
    },
};

export const ZillowRentEstimateColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZillowRentEstimate(listingWithScenarios);
        }
    },
};

export const ZestimateRangeLowColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZestimateRangeLow(listingWithScenarios);
        }
    },
};

export const ZestimateRangeHighColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZestimateRangeHigh(listingWithScenarios);
        }
    },
};

export const ZillowMonthlyPropertyTaxAmountColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZillowMonthlyPropertyTaxAmount(listingWithScenarios);
        }
    },
};

export const ZillowMonthlyHomeInsuranceAmountColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZillowMonthlyHomeInsuranceAmount(listingWithScenarios);
        }
    },
};

export const ZillowMonthlyHOAFeesAmountColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getZillowMonthlyHOAFeesAmount(listingWithScenarios);
        }
    },
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
        }
    },
};

export const DescriptionColumn: ColumnDetail = {
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
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return PropertiesListTableHelper.getDescription(listingWithScenarios);
        }
    },
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
    isEditable: true,
    isSortable: false,
    detailedDescription: "",
    routeTo: 'investmentBreakdown',
    [TableType.PROPERTY_LIST_TABLE]: {
        value: (listingWithScenarios: ListingWithScenariosResponseDTO): PrimitiveType => {
            return 'View';
        }
    },
};

