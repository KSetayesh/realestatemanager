import { TableColumnDetailsType } from "../types/ClientTypes";

export enum TableColumnDetailsEnum {
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
}


export const tableColumnDetailsMap: { [key in TableColumnDetailsEnum]: TableColumnDetailsType } = {
    [TableColumnDetailsEnum.PROPERTY_TYPE]: {
        title: "Property Type",
        accessor: "propertyType",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.FULL_ADDRESS]: {
        title: "Full Address",
        accessor: "fullAddress",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.STATE]: {
        title: "State",
        accessor: "state",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.ZIP_CODE]: {
        title: "Zip Code",
        accessor: "zipcode",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.ZILLOW_URL]: {
        title: "Zillow Url",
        accessor: "zillowUrl",
        inputType: InputType.TEXT,
        isUrl: true,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.PRICE]: {
        title: "Price",
        accessor: "price",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.RENT_ESTIMATE]: {
        title: "Rent Estimate",
        accessor: "rentEstimate",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.INITIAL_COSTS]: {
        title: "Initial Costs",
        accessor: "initialCosts",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.LOAN_AMOUNT]: {
        title: "Loan Amount",
        accessor: "loanAmount",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.DOWN_PAYMENT_AMOUNT]: {
        title: "Down Payment",
        accessor: "downPaymentAmount",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.ANNUAL_INTEREST_RATE]: {
        title: "Annual Interest Rate",
        accessor: "annualInterestRate",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "%"
    },
    [TableColumnDetailsEnum.ROI]: {
        title: "ROI",
        accessor: "ROI",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "%"
    },
    [TableColumnDetailsEnum.CAP_RATE]: {
        title: "Cap Rate",
        accessor: "capRate",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: "%"
    },
    [TableColumnDetailsEnum.RECURRING_COSTS]: {
        title: "Recurring Costs",
        accessor: "recurringCosts",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.INITIAL_MONTHLY_AMOUNT]: {
        title: "Monthly Payment",
        accessor: "initialMonthlyAmount",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.MORTGAGE]: {
        title: "Mortgage Amount",
        accessor: "mortgage",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.MONTHLY_CASH_FLOW]: {
        title: "Monthly Cash Flow",
        accessor: "monthlyCashFlow",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.YEARLY_CASH_FLOW]: {
        title: "Yearly Cash Flow",
        accessor: "yearlyCashFlow",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.NUMBER_OF_DAYS_ON_MARKET]: {
        title: "Number of Days On Market",
        accessor: "numberOfDaysOnMarket",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.DATE_LISTED]: {
        title: "Date Listed",
        accessor: "dateListed",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.DATE_CREATED]: {
        title: "Date Created",
        accessor: "dateCreated",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.CITY]: {
        title: "City",
        accessor: "city",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.COUNTY]: {
        title: "County",
        accessor: "county",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.COUNTRY]: {
        title: "Country",
        accessor: "country",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.STREET_ADDRESS]: {
        title: "Street Address",
        accessor: "streetAddress",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.APARTMENT_NUMBER]: {
        title: "Apartment Number",
        accessor: "apartmentNumber",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.LONGITUDE]: {
        title: "Longitude",
        accessor: "longitude",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.LATITUDE]: {
        title: "Latitude",
        accessor: "latitude",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.ELEMENTARY_SCHOOL_RATING]: {
        title: "Elementary School Rating",
        accessor: "elementarySchoolRating",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.MIDDLE_SCHOOL_RATING]: {
        title: "Middle School Rating",
        accessor: "middleSchoolRating",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.HIGH_SCHOOL_RATING]: {
        title: "High School Rating",
        accessor: "highSchoolRating",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.NUMBER_OF_BEDROOMS]: {
        title: "Number Of Bedrooms",
        accessor: "numberOfBedrooms",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.NUMBER_OF_FULL_BATHROOMS]: {
        title: "Number Of Full Bathrooms",
        accessor: "numberOfFullBathrooms",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.NUMBER_OF_HALF_BATHROOMS]: {
        title: "Number Of Half Bathrooms",
        accessor: "numberOfHalfBathrooms",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.SQUARE_FEET]: {
        title: "Square Feet",
        accessor: "squareFeet",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.ACRES]: {
        title: "Acres",
        accessor: "acres",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.YEAR_BUILT]: {
        title: "Year Built",
        accessor: "yearBuilt",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.HAS_GARAGE]: {
        title: "Has Garage",
        accessor: "hasGarage",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.HAS_POOL]: {
        title: "Has Pool",
        accessor: "hasPool",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.HAS_BASEMENT]: {
        title: "Has Basement",
        accessor: "hasBasement",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.LISTING_PRICE]: {
        title: "Listing Price",
        accessor: "listingPrice",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.ZESTIMATE]: {
        title: "Zestimate",
        accessor: "zestimate",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.ZILLOW_RENT_ESTIMATE]: {
        title: "Zillow Rent Estimate",
        accessor: "zillowRentEstimate",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.ZESTIMATE_RANGE_LOW]: {
        title: "Zillow Range Low",
        accessor: "zestimateRangeLow",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.ZESTIMATE_RANGE_HIGH]: {
        title: "Zillow Range High",
        accessor: "zestimateRangeHigh",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.ZILLOW_MONTHLY_PROPERTY_TAX_AMOUNT]: {
        title: "Zillow Monthly Property Tax Amount",
        accessor: "zillowMonthlyPropertyTaxAmount",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.ZILLOW_MONTHLY_HOME_INSURANCE_AMOUNT]: {
        title: "Zillow Monthly Home Insurance Amount",
        accessor: "zillowMonthlyHomeInsuranceAmount",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.ZILLOW_MONTHLY_HOA_FEES_AMOUNT]: {
        title: "Zillow Monthly HOA Fees Amount",
        accessor: "zillowMonthlyHOAFeesAmount",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: true,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.CREATION_TYPE]: {
        title: "Creation Type",
        accessor: "creationType",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    },
    [TableColumnDetailsEnum.DESCRIPTION]: {
        title: "Description",
        accessor: "description",
        inputType: InputType.TEXT,
        isUrl: false,
        isDollarAmount: false,
        addSuffix: ""
    }
};


// export const PROPERTY_TYPE = 'Property Type';
// export const FULL_ADDRESS = "Full Address";
// export const STATE = "State";
// export const ZIP_CODE = "Zip Code";
// export const ZILLOW_URL = "Zillow URL";
// export const PRICE = "Price";
// export const RENT_ESTIMATE = "Rent Estimate";
// export const INITIAL_COSTS = "Initial Costs";
// export const LOAN_AMOUNT = "Loan Amount";
// export const DOWN_PAYMENT_AMOUNT = "Down Payment";
// export const ANNUAL_INTEREST_RATE = "Annual Interest Rate";
// export const ROI = "ROI";
// export const CAP_RATE = "Cap Rate";
// export const RECURRING_COSTS = "Recurring Costs";
// export const INITIAL_MONTHLY_AMOUNT = "Monthly Payment";
// export const MORTGAGE = "Mortgage Amount";
// export const MONTHLY_CASH_FLOW = "Monthly Cash Flow";
// export const YEARLY_CASH_FLOW = "Yearly Cash Flow";
// export const NUMBER_OF_DAYS_ON_MARKET = "Number of Days On Market";
// export const DATE_LISTED = "Date Listed";
// export const DATE_CREATED = "Date Created";
// export const CITY = "City";
// export const COUNTY = "County";
// export const COUNTRY = "Country";
// export const STREET_ADDRESS = "Street Address";
// export const APARTMENT_NUMBER = "Apartment Number";
// export const LONGITUDE = "Longitude";
// export const LATITUDE = "Latitude";
// export const ELEMENTARY_SCHOOL_RATING = "Elementary School Rating";
// export const MIDDLE_SCHOOL_RATING = "Middle School Rating";
// export const HIGH_SCHOOL_RATING = "High School Rating";
// export const NUMBER_OF_BEDROOMS = "Number Of Bedrooms";
// export const NUMBER_OF_FULL_BATHROOMS = "Number Of Full Bathrooms";
// export const NUMBER_OF_HALF_BATHROOMS = "Number Of Half Bathrooms";
// export const SQUARE_FEET = "Square Feet";
// export const ACRES = "Acres";
// export const YEAR_BUILT = "Year Built";
// export const HAS_GARAGE = "Has Garage";
// export const HAS_POOL = "Has Pool";
// export const HAS_BASEMENT = "Has Basement";
// export const LISTING_PRICE = "Listing Price";
// export const ZESTIMATE = "Zestimate";
// export const ZILLOW_RENT_ESTIMATE = "Zillow Rent Estimate";
// export const ZESTIMATE_RANGE_LOW = "Zillow Range Low";
// export const ZESTIMATE_RANGE_HIGH = "Zillow Range High";
// export const ZILLOW_MONTHLY_PROPERTY_TAX_AMOUNT = "Zillow Monthly Property Tax Amount";
// export const ZILLOW_MONTHLY_HOME_INSURANCE_AMOUNT = "Zillow Monthly Home Insurance Amount";
// export const ZILLOW_MONTHLY_HOA_FEES_AMOUNT = "Zillow Monthly HOA Fees Amount";
// export const CREATION_TYPE = "Creation Type";
// export const DESCRIPTION = "Description";

// export export const TableTitles: { [key in PropertyColumnAccessorEnum]: string } = {
//     [PropertyColumnAccessorEnum.PROPERTY_TYPE]: PROPERTY_TYPE,
//     [PropertyColumnAccessorEnum.FULL_ADDRESS]: FULL_ADDRESS,
//     [PropertyColumnAccessorEnum.STATE]: STATE,
//     [PropertyColumnAccessorEnum.ZIP_CODE]: ZIP_CODE,
//     [PropertyColumnAccessorEnum.ZILLOW_URL]: ZILLOW_URL,
//     [PropertyColumnAccessorEnum.PRICE]: PRICE,
//     [PropertyColumnAccessorEnum.RENT_ESTIMATE]: RENT_ESTIMATE,
//     [PropertyColumnAccessorEnum.INITIAL_COSTS]: INITIAL_COSTS,
//     [PropertyColumnAccessorEnum.LOAN_AMOUNT]: LOAN_AMOUNT,
//     [PropertyColumnAccessorEnum.DOWN_PAYMENT_AMOUNT]: DOWN_PAYMENT_AMOUNT,
//     [PropertyColumnAccessorEnum.ANNUAL_INTEREST_RATE]: ANNUAL_INTEREST_RATE,
//     [PropertyColumnAccessorEnum.ROI]: ROI,
//     [PropertyColumnAccessorEnum.CAP_RATE]: CAP_RATE,
//     [PropertyColumnAccessorEnum.RECURRING_COSTS]: RECURRING_COSTS,
//     [PropertyColumnAccessorEnum.INITIAL_MONTHLY_AMOUNT]: INITIAL_MONTHLY_AMOUNT,
//     [PropertyColumnAccessorEnum.MORTGAGE]: MORTGAGE,
//     [PropertyColumnAccessorEnum.MONTHLY_CASH_FLOW]: MONTHLY_CASH_FLOW,
//     [PropertyColumnAccessorEnum.YEARLY_CASH_FLOW]: YEARLY_CASH_FLOW,
//     [PropertyColumnAccessorEnum.NUMBER_OF_DAYS_ON_MARKET]: NUMBER_OF_DAYS_ON_MARKET,
//     [PropertyColumnAccessorEnum.DATE_LISTED]: DATE_LISTED,
//     [PropertyColumnAccessorEnum.DATE_CREATED]: DATE_CREATED,
//     [PropertyColumnAccessorEnum.CITY]: CITY,
//     [PropertyColumnAccessorEnum.COUNTY]: COUNTY,
//     [PropertyColumnAccessorEnum.COUNTRY]: COUNTRY,
//     [PropertyColumnAccessorEnum.STREET_ADDRESS]: STREET_ADDRESS,
//     [PropertyColumnAccessorEnum.APARTMENT_NUMBER]: APARTMENT_NUMBER,
//     [PropertyColumnAccessorEnum.LONGITUDE]: LONGITUDE,
//     [PropertyColumnAccessorEnum.LATITUDE]: LATITUDE,
//     [PropertyColumnAccessorEnum.ELEMENTARY_SCHOOL_RATING]: ELEMENTARY_SCHOOL_RATING,
//     [PropertyColumnAccessorEnum.MIDDLE_SCHOOL_RATING]: MIDDLE_SCHOOL_RATING,
//     [PropertyColumnAccessorEnum.HIGH_SCHOOL_RATING]: HIGH_SCHOOL_RATING,
//     [PropertyColumnAccessorEnum.NUMBER_OF_BEDROOMS]: NUMBER_OF_BEDROOMS,
//     [PropertyColumnAccessorEnum.NUMBER_OF_FULL_BATHROOMS]: NUMBER_OF_FULL_BATHROOMS,
//     [PropertyColumnAccessorEnum.NUMBER_OF_HALF_BATHROOMS]: NUMBER_OF_HALF_BATHROOMS,
//     [PropertyColumnAccessorEnum.SQUARE_FEET]: SQUARE_FEET,
//     [PropertyColumnAccessorEnum.ACRES]: ACRES,
//     [PropertyColumnAccessorEnum.YEAR_BUILT]: YEAR_BUILT,
//     [PropertyColumnAccessorEnum.HAS_GARAGE]: HAS_GARAGE,
//     [PropertyColumnAccessorEnum.HAS_POOL]: HAS_POOL,
//     [PropertyColumnAccessorEnum.HAS_BASEMENT]: HAS_BASEMENT,
//     [PropertyColumnAccessorEnum.LISTING_PRICE]: LISTING_PRICE,
//     [PropertyColumnAccessorEnum.ZESTIMATE]: ZESTIMATE,
//     [PropertyColumnAccessorEnum.ZILLOW_RENT_ESTIMATE]: ZILLOW_RENT_ESTIMATE,
//     [PropertyColumnAccessorEnum.ZESTIMATE_RANGE_LOW]: ZESTIMATE_RANGE_LOW,
//     [PropertyColumnAccessorEnum.ZESTIMATE_RANGE_HIGH]: ZESTIMATE_RANGE_HIGH,
//     [PropertyColumnAccessorEnum.ZILLOW_MONTHLY_PROPERTY_TAX_AMOUNT]: ZILLOW_MONTHLY_PROPERTY_TAX_AMOUNT,
//     [PropertyColumnAccessorEnum.ZILLOW_MONTHLY_HOME_INSURANCE_AMOUNT]: ZILLOW_MONTHLY_HOME_INSURANCE_AMOUNT,
//     [PropertyColumnAccessorEnum.ZILLOW_MONTHLY_HOA_FEES_AMOUNT]: ZILLOW_MONTHLY_HOA_FEES_AMOUNT,
//     [PropertyColumnAccessorEnum.CREATION_TYPE]: CREATION_TYPE,
//     [PropertyColumnAccessorEnum.DESCRIPTION]: DESCRIPTION,
// };


