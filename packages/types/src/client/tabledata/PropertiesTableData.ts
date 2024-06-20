import { AcresColumn } from "./tablecolumns/AcresColumn";
import { AnnualInterestRateColumn } from "./tablecolumns/AnnualInterestRateColumn";
import { ApartmentNumberColumn } from "./tablecolumns/ApartmentNumberColumn";
import { CapRateColumn } from "./tablecolumns/CapRateColumn";
import { CityColumn } from "./tablecolumns/CityColumn";
import { CountryColumn } from "./tablecolumns/CountryColumn";
import { CountyColumn } from "./tablecolumns/CountyColumn";
import { CreationTypeColumn } from "./tablecolumns/CreationTypeColumn";
import { DateCreatedColumn } from "./tablecolumns/DateCreated";
import { DateListedColumn } from "./tablecolumns/DateListedColumn";
import { DescriptionColumn } from "./tablecolumns/DescriptionColumn";
import { DownPaymentAmountColumn } from "./tablecolumns/DownPaymentAmountColumn";
import { ElementarySchoolRatingColumn } from "./tablecolumns/ElementarySchoolRatingColumn";
import { FullAddressColumn } from "./tablecolumns/FullAddressColumn";
import { HasBasementColumn } from "./tablecolumns/HasBasementColumn";
import { HasGarageColumn } from "./tablecolumns/HasGarageColumn";
import { HasPoolColumn } from "./tablecolumns/HasPoolColumn";
import { HighSchoolRatingColumn } from "./tablecolumns/HighSchoolRatingColumn";
import { InitialCostsColumn } from "./tablecolumns/InitialCostsColumn";
import { InitialMonthlyAmountColumn } from "./tablecolumns/InitialMonthlyAmountColumn";
import { LatitudeColumn } from "./tablecolumns/LatitudeColumn";
import { ListingPriceColumn } from "./tablecolumns/ListingPriceColumn";
import { LoanAmountColumn } from "./tablecolumns/LoanAmountColumn";
import { LongitudeColumn } from "./tablecolumns/LongitudeColumn";
import { MiddleSchoolRatingColumn } from "./tablecolumns/MiddleSchoolRatingColumn";
import { MonthlyCashFlowColumn } from "./tablecolumns/MonthlyCashFlowColumn";
import { MortgageColumn } from "./tablecolumns/MortgageColumn";
import { NumberOfBedroomsColumn } from "./tablecolumns/NumberOfBedroomsColumn";
import { NumberOfDaysOnMarketColumn } from "./tablecolumns/NumberOfDaysOnMarketColumn";
import { NumberOfFullBathroomsColumn } from "./tablecolumns/NumberOfFullBathroomsColumn";
import { NumberOfHalfBathroomsColumn } from "./tablecolumns/NumberOfHalfBathroomsColumn";
import { PriceColumn } from "./tablecolumns/PriceColumn";
import { PropertyTypeColumn } from "./tablecolumns/PropertyTypeColumn";
import { ROIColumn } from "./tablecolumns/ROIColumn";
import { RecurringCostsColumn } from "./tablecolumns/RecurringCostsColumn";
import { RentEstimateColumn } from "./tablecolumns/RentEstimateColumn";
import { SquareFeetColumn } from "./tablecolumns/SquareFeetColumn";
import { StateColumn } from "./tablecolumns/StateColumn";
import { StreetAddressColumn } from "./tablecolumns/StreetAddressColumn";
import { TableColumn } from "./tablecolumns/TableColumn";
import { YearBuiltColumn } from "./tablecolumns/YearBuiltColumn";
import { YearlyCashFlowColumn } from "./tablecolumns/YearlyCashFlowColumn";
import { ZestimateColumn } from "./tablecolumns/ZestimateColumn";
import { ZestimateRangeHighColumn } from "./tablecolumns/ZestimateRangeHighColumn";
import { ZestimateRangeLowColumn } from "./tablecolumns/ZestimateRangeLowColumn";
import { ZillowMonthlyHOAFeesColumn } from "./tablecolumns/ZillowMonthlyHOAFeesColumn";
import { ZillowMonthlyHomeInsuranceAmountColumn } from "./tablecolumns/ZillowMonthlyHomeInsuranceAmountColumn";
import { ZillowMonthlyPropertyTaxAmountColumn } from "./tablecolumns/ZillowMonthlyPropertyTaxAmountColumn";
import { ZillowRentEstimateColumn } from "./tablecolumns/ZillowRentEstimateColumn";
import { ZillowUrlColumn } from "./tablecolumns/ZillowUrlColumn";
import { ZipCodeColumn } from "./tablecolumns/ZipCodeColumn";

export enum PropertyColumnAccessorEnum {
    PROPERTY_TYPE = 'propertyType',
    FULL_ADDRESS = 'fullAddress',
    STATE = 'state',
    ZIP_CODE = 'zipcode',
    ZILLOW_URL = 'zillowURL',
    PRICE = 'price',
    RENT_ESTIMATE = 'rentEstimate',
    INITIAL_COSTS = 'initialCosts',
    LOAN_AMOUNT = 'loanAmount',
    DOWN_PAYMENT_AMOUNT = 'downPaymentAmount',
    ANNUAL_INTEREST_RATE = 'annualInterestRate',
    ROI = 'ROI',
    CAP_RATE = 'capRate',
    RECURRING_COSTS = 'recurringCosts',
    INITIAL_MONTHLY_AMOUNT = 'initialMonthlyAmount',
    MORTGAGE = 'mortgage',
    MONTHLY_CASH_FLOW = 'monthlyCashFlow',
    YEARLY_CASH_FLOW = 'yearlyCashFlow',
    NUMBER_OF_DAYS_ON_MARKET = 'numberOfDaysOnMarket',
    DATE_LISTED = 'dateListed',
    DATE_CREATED = 'dateCreated',
    CITY = 'city',
    COUNTY = 'county',
    COUNTRY = 'country',
    STREET_ADDRESS = 'streetAddress',
    APARTMENT_NUMBER = 'apartmentNumber',
    LONGITUDE = 'longitude',
    LATITUDE = 'latitude',
    ELEMENTARY_SCHOOL_RATING = 'elementarySchoolRating',
    MIDDLE_SCHOOL_RATING = 'middleSchoolRating',
    HIGH_SCHOOL_RATING = 'highSchoolRating',
    NUMBER_OF_BEDROOMS = 'numberOfBedrooms',
    NUMBER_OF_FULL_BATHROOMS = 'numberOfFullBathrooms',
    NUMBER_OF_HALF_BATHROOMS = 'numberOfHalfBathrooms',
    SQUARE_FEET = 'squareFeet',
    ACRES = 'acres',
    YEAR_BUILT = 'yearBuilt',
    HAS_GARAGE = 'hasGarage',
    HAS_POOL = 'hasPool',
    HAS_BASEMENT = 'hasBasement',
    LISTING_PRICE = 'listingPrice',
    ZESTIMATE = 'zestimate',
    ZILLOW_RENT_ESTIMATE = 'zillowRentEstimate',
    ZESTIMATE_RANGE_LOW = 'zestimateRangeLow',
    ZESTIMATE_RANGE_HIGH = 'zestimateRangeHigh',
    ZILLOW_MONTHLY_PROPERTY_TAX_AMOUNT = 'zillowMonthlyPropertyTaxAmount',
    ZILLOW_MONTHLY_HOME_INSURANCE_AMOUNT = 'zillowMonthlyHomeInsuranceAmount',
    ZILLOW_MONTHLY_HOA_FEES_AMOUNT = 'zillowMonthlyHOAFeesAmount',
    CREATION_TYPE = 'creationType',
    DESCRIPTION = 'description',
};

export type TableColumnsMapType = {
    [key in PropertyColumnAccessorEnum]: TableColumn;
};

export enum SortDirection {
    ASCENDING = 'ascending',
    DESCENDING = 'descending',
};

export const tableColumnsMap: TableColumnsMapType = {
    [PropertyColumnAccessorEnum.PROPERTY_TYPE]: new PropertyTypeColumn(),
    [PropertyColumnAccessorEnum.FULL_ADDRESS]: new FullAddressColumn(),
    [PropertyColumnAccessorEnum.STATE]: new StateColumn(),
    [PropertyColumnAccessorEnum.ZIP_CODE]: new ZipCodeColumn(),
    [PropertyColumnAccessorEnum.ZILLOW_URL]: new ZillowUrlColumn(),
    [PropertyColumnAccessorEnum.PRICE]: new PriceColumn(),
    [PropertyColumnAccessorEnum.RENT_ESTIMATE]: new RentEstimateColumn(),
    [PropertyColumnAccessorEnum.INITIAL_COSTS]: new InitialCostsColumn(),
    [PropertyColumnAccessorEnum.LOAN_AMOUNT]: new LoanAmountColumn(),
    [PropertyColumnAccessorEnum.DOWN_PAYMENT_AMOUNT]: new DownPaymentAmountColumn(),
    [PropertyColumnAccessorEnum.ANNUAL_INTEREST_RATE]: new AnnualInterestRateColumn(),
    [PropertyColumnAccessorEnum.ROI]: new ROIColumn(),
    [PropertyColumnAccessorEnum.CAP_RATE]: new CapRateColumn(),
    [PropertyColumnAccessorEnum.RECURRING_COSTS]: new RecurringCostsColumn(),
    [PropertyColumnAccessorEnum.INITIAL_MONTHLY_AMOUNT]: new InitialMonthlyAmountColumn(),
    [PropertyColumnAccessorEnum.MORTGAGE]: new MortgageColumn(),
    [PropertyColumnAccessorEnum.MONTHLY_CASH_FLOW]: new MonthlyCashFlowColumn(),
    [PropertyColumnAccessorEnum.YEARLY_CASH_FLOW]: new YearlyCashFlowColumn(),
    [PropertyColumnAccessorEnum.NUMBER_OF_DAYS_ON_MARKET]: new NumberOfDaysOnMarketColumn(),
    [PropertyColumnAccessorEnum.DATE_LISTED]: new DateListedColumn(),
    [PropertyColumnAccessorEnum.DATE_CREATED]: new DateCreatedColumn(),
    [PropertyColumnAccessorEnum.CITY]: new CityColumn(),
    [PropertyColumnAccessorEnum.COUNTY]: new CountyColumn(),
    [PropertyColumnAccessorEnum.COUNTRY]: new CountryColumn(),
    [PropertyColumnAccessorEnum.STREET_ADDRESS]: new StreetAddressColumn(),
    [PropertyColumnAccessorEnum.APARTMENT_NUMBER]: new ApartmentNumberColumn(),
    [PropertyColumnAccessorEnum.LONGITUDE]: new LongitudeColumn(),
    [PropertyColumnAccessorEnum.LATITUDE]: new LatitudeColumn(),
    [PropertyColumnAccessorEnum.ELEMENTARY_SCHOOL_RATING]: new ElementarySchoolRatingColumn(),
    [PropertyColumnAccessorEnum.MIDDLE_SCHOOL_RATING]: new MiddleSchoolRatingColumn(),
    [PropertyColumnAccessorEnum.HIGH_SCHOOL_RATING]: new HighSchoolRatingColumn(),
    [PropertyColumnAccessorEnum.NUMBER_OF_BEDROOMS]: new NumberOfBedroomsColumn(),
    [PropertyColumnAccessorEnum.NUMBER_OF_FULL_BATHROOMS]: new NumberOfFullBathroomsColumn(),
    [PropertyColumnAccessorEnum.NUMBER_OF_HALF_BATHROOMS]: new NumberOfHalfBathroomsColumn(),
    [PropertyColumnAccessorEnum.SQUARE_FEET]: new SquareFeetColumn(),
    [PropertyColumnAccessorEnum.ACRES]: new AcresColumn(),
    [PropertyColumnAccessorEnum.YEAR_BUILT]: new YearBuiltColumn(),
    [PropertyColumnAccessorEnum.HAS_GARAGE]: new HasGarageColumn(),
    [PropertyColumnAccessorEnum.HAS_POOL]: new HasPoolColumn(),
    [PropertyColumnAccessorEnum.HAS_BASEMENT]: new HasBasementColumn(),
    [PropertyColumnAccessorEnum.LISTING_PRICE]: new ListingPriceColumn(),
    [PropertyColumnAccessorEnum.ZESTIMATE]: new ZestimateColumn(),
    [PropertyColumnAccessorEnum.ZILLOW_RENT_ESTIMATE]: new ZillowRentEstimateColumn(),
    [PropertyColumnAccessorEnum.ZESTIMATE_RANGE_LOW]: new ZestimateRangeLowColumn(),
    [PropertyColumnAccessorEnum.ZESTIMATE_RANGE_HIGH]: new ZestimateRangeHighColumn(),
    [PropertyColumnAccessorEnum.ZILLOW_MONTHLY_PROPERTY_TAX_AMOUNT]: new ZillowMonthlyPropertyTaxAmountColumn(),
    [PropertyColumnAccessorEnum.ZILLOW_MONTHLY_HOME_INSURANCE_AMOUNT]: new ZillowMonthlyHomeInsuranceAmountColumn(),
    [PropertyColumnAccessorEnum.ZILLOW_MONTHLY_HOA_FEES_AMOUNT]: new ZillowMonthlyHOAFeesColumn(),
    [PropertyColumnAccessorEnum.CREATION_TYPE]: new CreationTypeColumn(),
    [PropertyColumnAccessorEnum.DESCRIPTION]: new DescriptionColumn(),
};