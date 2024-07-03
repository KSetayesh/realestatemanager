import {
    GrowthProjectionsResponseDTO,
    InitialInvestmentBreakdownResponseDTO,
    ListingDetailsResponseDTO, ListingWithScenariosResponseDTO, TaxImplicationsResponseDTO,
} from "@realestatemanager/types";

export const getPropertyType = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).propertyDetails.propertyType ?? "";
};

export const getFullAddress = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).propertyDetails.address?.fullAddress ?? "";
};

export const getState = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).propertyDetails.address?.state ?? "";
};

export const getZipCode = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).propertyDetails.address?.zipcode ?? "";
};

export const getZillowURL = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).zillowURL;
};

export const getCity = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).propertyDetails.address?.city ?? "";
};

export const getCounty = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).propertyDetails.address?.county ?? "";
};

export const getCountry = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).propertyDetails.address?.country ?? "";
};

export const getStreetAddress = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).propertyDetails.address?.streetAddress ?? "";
};

export const getApartmentNumber = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).propertyDetails.address?.apartmentNumber ?? "";
};

export const getLongitude = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).propertyDetails.address?.longitude ?? -1;
};

export const getLatitude = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).propertyDetails.address?.latitude ?? -1;
};

export const getNumberOfDaysOnMarket = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).numberOfDaysOnMarket ?? -1; //propertyDetails.numberOfDaysOnMarket ?? -1;
};

export const getDateListed = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).dateListed ?? new Date(0).toLocaleDateString('en-US');
};

export const getDateCreated = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).dateCreated ?? new Date(0).toLocaleDateString('en-US');
};

export const getElementarySchoolRating = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).propertyDetails.schoolRating?.elementarySchoolRating ?? -1;
};

export const getMiddleSchoolRating = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).propertyDetails.schoolRating?.middleSchoolRating ?? -1;
};

export const getHighSchoolRating = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).propertyDetails.schoolRating?.highSchoolRating ?? -1;
};

export const getNumberOfBedrooms = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).propertyDetails.numberOfBedrooms ?? -1;
};

export const getNumberOfFullBathrooms = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).propertyDetails.numberOfFullBathrooms ?? -1;
};

export const getNumberOfHalfBathrooms = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).propertyDetails.numberOfHalfBathrooms ?? -1;
};

export const getSquareFeet = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).propertyDetails.squareFeet ?? -1;
};

export const getAcres = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).propertyDetails.acres ?? -1;
};

export const getYearBuilt = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).propertyDetails.yearBuilt ?? -1;
};

export const hasGarage = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).propertyDetails.hasGarage?.toString() ?? "";
};

export const hasPool = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).propertyDetails.hasPool?.toString() ?? "";
};

export const hasBasement = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).propertyDetails.hasBasement?.toString() ?? "";
};

export const getListingPrice = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).listingPrice;
};

export const getZestimate = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).zillowMarketEstimates.zestimate ?? -1;
};

export const getZillowRentEstimate = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).zillowMarketEstimates.zillowRentEstimate ?? -1;
};

export const getZestimateRangeLow = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).zillowMarketEstimates.zestimateRange?.low ?? -1;
};

export const getZestimateRangeHigh = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).zillowMarketEstimates.zestimateRange?.high ?? -1;
};

export const getZillowMonthlyPropertyTaxAmount = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).zillowMarketEstimates.zillowMonthlyPropertyTaxAmount ?? -1;
};

export const getZillowMonthlyHomeInsuranceAmount = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount ?? -1;
};

export const getZillowMonthlyHOAFeesAmount = (property: ListingWithScenariosResponseDTO): number => {
    return listingDetails(property).zillowMarketEstimates.zillowMonthlyHOAFeesAmount ?? -1;
};

export const getDescription = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).propertyDetails.description ?? "";
};

export const getCreationType = (property: ListingWithScenariosResponseDTO): string => {
    return listingDetails(property).creationType ?? "";
};

export const getPMIRate = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions.Mortgage.breakdown.pmiRate;
};

export const getPMIDropoffPoint = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions.Mortgage.breakdown.pmiDropOffPoint;
};

export const getMonthlyPropertyTax = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Fixed Recurring Expense"].breakdown["Property Tax"].amount;
};

export const getMonthlyHomeInsuranceAmount = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Fixed Recurring Expense"].breakdown["Monthly Home Insurance"].amount;
};

export const getMonthlyHOAFeesAmount = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Fixed Recurring Expense"].breakdown["Monthly HOA Fee"].amount;
};

export const getTermInYears = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions.Mortgage.breakdown.termLength;
};

export const getInterestType = (property: ListingWithScenariosResponseDTO): string => {
    return initialInvestmentDetails(property).transactions.Mortgage.breakdown.interestType;
};

export const getPropertyManagementRate = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Operational Recurring Expense"].breakdown["Property Management Expense"].percentage;
};

export const getVacancyRate = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Operational Recurring Expense"].breakdown["Vacancy Expense"].percentage;
};

export const getMaintenanceRate = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Operational Recurring Expense"].breakdown["Maintenance Expense"].percentage;
};

export const getOtherExpensesRate = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Operational Recurring Expense"].breakdown["Other Expeneses"].percentage;
};

export const getCapExReserveRate = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Operational Recurring Expense"].breakdown["Cap Ex Reserve Expense"].percentage;
};

export const getLegalAndProfessionalFees = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Initial Expense"].breakdown["Legal And Professional Fees"].amount;
};

export const getInitialRepairCosts = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Initial Expense"].breakdown["Initial Repair Costs"].amount;
};

export const getTravelingCosts = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Initial Expense"].breakdown["Traveling Costs"].amount;
};

export const getClosingCosts = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Initial Expense"].breakdown["Closing Costs"].amount;
};

export const getOtherInitialExpenses = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Initial Expense"].breakdown["Other Initial Expenses"].amount;
};

export const getAnnualRentIncreaseRate = (property: ListingWithScenariosResponseDTO): number => {
    return growthProjections(property).annualRentIncreaseRate;
};

export const getAnnualAppreciationRate = (property: ListingWithScenariosResponseDTO): number => {
    return growthProjections(property).annualAppreciationRate;
};

export const getAnnualHOAFeesIncreaseRate = (property: ListingWithScenariosResponseDTO): number => {
    return growthProjections(property).annualHOAFeesIncreaseRate ?? -1;
};

export const getAnnualTaxIncreaseRate = (property: ListingWithScenariosResponseDTO): number => {
    return growthProjections(property).annualTaxIncreaseRate ?? -1;
};

export const getAnnualHomeInsuranceIncreaseRate = (property: ListingWithScenariosResponseDTO): number => {
    return growthProjections(property).annualHomeInsuranceIncreaseRate ?? -1;
};

export const getParkingFees = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Income Streams"].breakdown["Parking Fees"].amount;
};

export const getLaundryServices = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Income Streams"].breakdown["Laundry Service"].amount;
};

export const getStorageUnitFees = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Income Streams"].breakdown["Storage Unit Fees"].amount;
};

export const getOtherAdditionalIncomeStreams = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Income Streams"].breakdown["Other Additional Incomes Streams"].amount;
};

export const getTaxDepreciation = (property: ListingWithScenariosResponseDTO): number => {
    return taxImplications(property).depreciation;
};

export const getMortgageInterest = (property: ListingWithScenariosResponseDTO): number => {
    return taxImplications(property).mortgageInterest;
};

export const getOperatingExpenses = (property: ListingWithScenariosResponseDTO): number => {
    return taxImplications(property).operatingExpenses;
};

export const getPropertyTaxes = (property: ListingWithScenariosResponseDTO): number => {
    return taxImplications(property).propertyTaxes ?? -1;
};

export const getPrice = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions.Financing.breakdown["Purchase Price"].amount;
};

export const getRentEstimate = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Income Streams"].breakdown["Rental Income"].amount;
};

export const getInitialCosts = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Initial Expense"].totalAmount.amount;
};

export const getLoanAmount = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions.Financing.breakdown["Loan Amount"];
};

export const getDownPaymentAmount = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Initial Expense"].breakdown["Down Payment"].amount;
};

export const getDownPaymentPercentage = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Initial Expense"].breakdown["Down Payment"].percentage;
};

export const getAnnualInterestRate = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions.Mortgage.breakdown.percentage;
};

export const getROI = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).investmentBreakdown.ROI;
};

export const getCapRate = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).investmentBreakdown.capRate;
};

export const getRecurringCosts = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions["Operational Recurring Expense"].totalAmount.amount; //investmentBreakdown.ROI;
};

// Come back to this
export const getInitialMonthlyAmount = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions.Mortgage.breakdown.amount;
    // return property.metrics[0].investmentProjections.monthlyPayment;
};

export const getMortgage = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).transactions.Mortgage.breakdown.mortgageAmount;
};

export const getMonthlyCashFlow = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).investmentBreakdown.monthlyCashFlow;
};

export const getYearlyCashFlow = (property: ListingWithScenariosResponseDTO): number => {
    return initialInvestmentDetails(property).investmentBreakdown.yearlyCashFlow;
};

const initialInvestmentDetails = (property: ListingWithScenariosResponseDTO): InitialInvestmentBreakdownResponseDTO => {
    return property.metrics.initialInvestmentDetails;
};

const growthProjections = (property: ListingWithScenariosResponseDTO): GrowthProjectionsResponseDTO => {
    return property.metrics.growthProjections;
};

const taxImplications = (property: ListingWithScenariosResponseDTO): TaxImplicationsResponseDTO => {
    return property.metrics.taxImplications;
};

const listingDetails = (property: ListingWithScenariosResponseDTO): ListingDetailsResponseDTO => {
    return property.listingDetails;
};