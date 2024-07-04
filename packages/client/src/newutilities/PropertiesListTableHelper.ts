import { GrowthProjectionsResponseDTO, InitialInvestmentBreakdownResponseDTO, ListingCreationType, ListingDetailsResponseDTO, ListingWithScenariosResponseDTO, PropertyType, TaxImplicationsResponseDTO } from "@realestatemanager/types";

export class PropertiesListTableHelper {

    static getFullAddress(property: ListingWithScenariosResponseDTO): string {
        return this.getListingDetails(property).propertyDetails.address.fullAddress;
    }

    static getPropertyType(property: ListingWithScenariosResponseDTO): PropertyType {
        return this.getListingDetails(property).propertyDetails.propertyType;
    }


    static getPropertyStatus(property: ListingWithScenariosResponseDTO): PropertyType {
        return this.getListingDetails(property).propertyStatus;
    }

    static getState(property: ListingWithScenariosResponseDTO): string {
        return this.getListingDetails(property).propertyDetails.address.state;
    }

    static getZipCode(property: ListingWithScenariosResponseDTO): string {
        return this.getListingDetails(property).propertyDetails.address.zipcode;
    }

    static getZillowURL(property: ListingWithScenariosResponseDTO): string {
        return this.getListingDetails(property).zillowURL;
    }

    static getCity(property: ListingWithScenariosResponseDTO): string {
        return this.getListingDetails(property).propertyDetails.address.city;
    }

    static getCounty(property: ListingWithScenariosResponseDTO): string {
        return this.getListingDetails(property).propertyDetails.address.county;
    }

    static getCountry(property: ListingWithScenariosResponseDTO): string {
        return this.getListingDetails(property).propertyDetails.address.country;
    }

    static getStreetAddress(property: ListingWithScenariosResponseDTO): string {
        return this.getListingDetails(property).propertyDetails.address.streetAddress;
    }

    static getApartmentNumber(property: ListingWithScenariosResponseDTO): string {
        return this.getListingDetails(property).propertyDetails.address.apartmentNumber;
    }

    static getLongitude(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).propertyDetails.address.longitude;
    }

    static getLatitude(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).propertyDetails.address.latitude;
    }

    static getNumberOfDaysOnMarket(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).numberOfDaysOnMarket; //propertyDetails.numberOfDaysOnMarket;
    }

    static getDateListed(property: ListingWithScenariosResponseDTO): string {
        return this.getListingDetails(property).dateListed;
    }

    static getDateCreated(property: ListingWithScenariosResponseDTO): string {
        return this.getListingDetails(property).dateCreated;
    }

    static getElementarySchoolRating(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).propertyDetails.schoolRating.elementarySchoolRating;
    }

    static setElementarySchoolRating(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).propertyDetails.schoolRating.elementarySchoolRating = newValue;
    }

    static getMiddleSchoolRating(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).propertyDetails.schoolRating.middleSchoolRating;
    }

    static setMiddleSchoolRating(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).propertyDetails.schoolRating.middleSchoolRating = newValue;
    }

    static getHighSchoolRating(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).propertyDetails.schoolRating.highSchoolRating;
    }

    static setHighSchoolRating(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).propertyDetails.schoolRating.highSchoolRating = newValue;
    }

    static getNumberOfBedrooms(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).propertyDetails.numberOfBedrooms;
    }

    static setNumberOfBedrooms(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).propertyDetails.numberOfBedrooms = newValue;
    }

    static getNumberOfFullBathrooms(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).propertyDetails.numberOfFullBathrooms;
    }

    static setNumberOfFullBathrooms(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).propertyDetails.numberOfFullBathrooms = newValue;
    }

    static getNumberOfHalfBathrooms(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).propertyDetails.numberOfHalfBathrooms;
    }

    static setNumberOfHalfBathrooms(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).propertyDetails.numberOfHalfBathrooms = newValue;
    }

    static getSquareFeet(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).propertyDetails.squareFeet;
    }

    static setSquareFeet(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).propertyDetails.squareFeet = newValue;
    }

    static getAcres(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).propertyDetails.acres;
    }

    static setAcres(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).propertyDetails.acres = newValue;
    }

    static getYearBuilt(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).propertyDetails.yearBuilt;
    }

    static setYearBuilt(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).propertyDetails.yearBuilt = newValue;
    }

    static hasGarage(property: ListingWithScenariosResponseDTO): boolean {
        return this.getListingDetails(property).propertyDetails.hasGarage;
    }

    static setHasGarage(property: ListingWithScenariosResponseDTO, newValue: boolean): void {
        this.getListingDetails(property).propertyDetails.hasGarage = newValue;
    }

    static hasPool(property: ListingWithScenariosResponseDTO): boolean {
        return this.getListingDetails(property).propertyDetails.hasPool;
    }

    static setHasPool(property: ListingWithScenariosResponseDTO, newValue: boolean): void {
        this.getListingDetails(property).propertyDetails.hasPool = newValue;
    }

    static hasBasement(property: ListingWithScenariosResponseDTO): boolean {
        return this.getListingDetails(property).propertyDetails.hasBasement;
    }

    static setHasBasement(property: ListingWithScenariosResponseDTO, newValue: boolean): void {
        this.getListingDetails(property).propertyDetails.hasBasement = newValue;
    }

    static getListingPrice(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).listingPrice;
    }

    static setListingPrice(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).listingPrice = newValue;
    }

    static getZestimate(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).zillowMarketEstimates.zestimate;
    }

    static setZestimate(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).zillowMarketEstimates.zestimate = newValue;
    }

    static getZillowRentEstimate(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).zillowMarketEstimates.zillowRentEstimate;
    }

    static setZillowRentEstimate(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).zillowMarketEstimates.zillowRentEstimate = newValue;
    }

    static getZestimateRangeLow(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).zillowMarketEstimates.zestimateRange.low;
    }

    static setZestimateRangeLow(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).zillowMarketEstimates.zestimateRange.low = newValue;
    }

    static getZestimateRangeHigh(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).zillowMarketEstimates.zestimateRange.high;
    }

    static setZestimateRangeHigh(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).zillowMarketEstimates.zestimateRange.high = newValue;
    }

    static getZillowMonthlyPropertyTaxAmount(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).zillowMarketEstimates.zillowMonthlyPropertyTaxAmount;
    }

    static setZillowMonthlyPropertyTaxAmount(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).zillowMarketEstimates.zillowMonthlyPropertyTaxAmount = newValue;
    }

    static getZillowMonthlyHomeInsuranceAmount(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount;
    }

    static setZillowMonthlyHomeInsuranceAmount(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount = newValue;
    }

    static getZillowMonthlyHOAFeesAmount(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).zillowMarketEstimates.zillowMonthlyHOAFeesAmount;
    }

    static setZillowMonthlyHOAFeesAmount(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).zillowMarketEstimates.zillowMonthlyHOAFeesAmount = newValue;
    }

    static getDescription(property: ListingWithScenariosResponseDTO): string {
        return this.getListingDetails(property).propertyDetails.description;
    }

    static setDescription(property: ListingWithScenariosResponseDTO, newValue: string): void {
        this.getListingDetails(property).propertyDetails.description = newValue;
    }

    static getCreationType(property: ListingWithScenariosResponseDTO): string {
        return this.getListingDetails(property).creationType;
    }

    static setCreationType(property: ListingWithScenariosResponseDTO, newValue: ListingCreationType): string {
        return this.getListingDetails(property).creationType = newValue;
    }

    static getPMIRate(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions.Mortgage.breakdown.pmiRate;
    }

    static getPMIDropoffPoint(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions.Mortgage.breakdown.pmiDropOffPoint;
    }

    static getMonthlyPropertyTax(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Fixed Recurring Expense"].breakdown["Property Tax"].amount;
    }

    static getMonthlyHomeInsuranceAmount(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Fixed Recurring Expense"].breakdown["Monthly Home Insurance"].amount;
    }

    static getMonthlyHOAFeesAmount(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Fixed Recurring Expense"].breakdown["Monthly HOA Fee"].amount;
    }

    static getTermInYears(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions.Mortgage.breakdown.termLength;
    }

    static getInterestType(property: ListingWithScenariosResponseDTO): string {
        return this.getInitialInvestmentDetails(property).transactions.Mortgage.breakdown.interestType;
    }

    static getPropertyManagementRate(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Operational Recurring Expense"].breakdown["Property Management Expense"].percentage;
    }

    static getVacancyRate(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Operational Recurring Expense"].breakdown["Vacancy Expense"].percentage;
    }

    static getMaintenanceRate(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Operational Recurring Expense"].breakdown["Maintenance Expense"].percentage;
    }

    static getOtherExpensesRate(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Operational Recurring Expense"].breakdown["Other Expeneses"].percentage;
    }

    static getCapExReserveRate(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Operational Recurring Expense"].breakdown["Cap Ex Reserve Expense"].percentage;
    }

    static getLegalAndProfessionalFees(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Initial Expense"].breakdown["Legal And Professional Fees"].amount;
    }

    static getInitialRepairCosts(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Initial Expense"].breakdown["Initial Repair Costs"].amount;
    }

    static getTravelingCosts(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Initial Expense"].breakdown["Traveling Costs"].amount;
    }

    static getClosingCosts(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Initial Expense"].breakdown["Closing Costs"].amount;
    }

    static getOtherInitialExpenses(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Initial Expense"].breakdown["Other Initial Expenses"].amount;
    }

    static getAnnualRentIncreaseRate(property: ListingWithScenariosResponseDTO): number {
        return this.getGrowthProjections(property).annualRentIncreaseRate;
    }

    static getAnnualAppreciationRate(property: ListingWithScenariosResponseDTO): number {
        return this.getGrowthProjections(property).annualAppreciationRate;
    }

    static getAnnualHOAFeesIncreaseRate(property: ListingWithScenariosResponseDTO): number {
        return this.getGrowthProjections(property).annualHOAFeesIncreaseRate;
    }

    static getAnnualTaxIncreaseRate(property: ListingWithScenariosResponseDTO): number {
        return this.getGrowthProjections(property).annualTaxIncreaseRate;
    }

    static getAnnualHomeInsuranceIncreaseRate(property: ListingWithScenariosResponseDTO): number {
        return this.getGrowthProjections(property).annualHomeInsuranceIncreaseRate;
    }

    static getParkingFees(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Income Streams"].breakdown["Parking Fees"].amount;
    }

    static getLaundryServices(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Income Streams"].breakdown["Laundry Service"].amount;
    }

    static getStorageUnitFees(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Income Streams"].breakdown["Storage Unit Fees"].amount;
    }

    static getOtherAdditionalIncomeStreams(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Income Streams"].breakdown["Other Additional Incomes Streams"].amount;
    }

    static getTaxDepreciation(property: ListingWithScenariosResponseDTO): number {
        return this.getTaxImplications(property).depreciation;
    }

    static getMortgageInterest(property: ListingWithScenariosResponseDTO): number {
        return this.getTaxImplications(property).mortgageInterest;
    }

    static getOperatingExpenses(property: ListingWithScenariosResponseDTO): number {
        return this.getTaxImplications(property).operatingExpenses;
    }

    static getPropertyTaxes(property: ListingWithScenariosResponseDTO): number {
        return this.getTaxImplications(property).propertyTaxes;
    }

    static getPrice(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions.Financing.breakdown["Purchase Price"].amount;
    }

    static setPrice(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getInitialInvestmentDetails(property).transactions.Financing.breakdown["Purchase Price"].amount = newValue;
    }

    static getRentEstimate(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Income Streams"].breakdown["Rental Income"].amount;
    }

    static setRentEstimate(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getInitialInvestmentDetails(property).transactions["Income Streams"].breakdown["Rental Income"].amount = newValue;
    }

    static getInitialCosts(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Initial Expense"].totalAmount.amount;
    }

    static getLoanAmount(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions.Financing.breakdown["Loan Amount"];
    }

    static getDownPaymentAmount(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Initial Expense"].breakdown["Down Payment"].amount;
    }

    static getDownPaymentPercentage(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Initial Expense"].breakdown["Down Payment"].percentage;
    }

    static getAnnualInterestRate(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions.Mortgage.breakdown.percentage;
    }

    static getROI(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).investmentBreakdown.ROI;
    }

    static getCapRate(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).investmentBreakdown.capRate;
    }

    static getRecurringCosts(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Operational Recurring Expense"].totalAmount.amount; //investmentBreakdown.ROI;
    }

    // Come back to this
    static getInitialMonthlyAmount(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions.Mortgage.breakdown.amount;
        // return property.metrics[0].investmentProjections.monthlyPayment;
    }

    static getMortgage(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions.Mortgage.breakdown.mortgageAmount;
    }

    static getMonthlyCashFlow(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).investmentBreakdown.monthlyCashFlow;
    }

    static getYearlyCashFlow(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).investmentBreakdown.yearlyCashFlow;
    }

    private static getInitialInvestmentDetails(property: ListingWithScenariosResponseDTO): InitialInvestmentBreakdownResponseDTO {
        return property.metrics.initialInvestmentDetails;
    }

    private static getGrowthProjections(property: ListingWithScenariosResponseDTO): GrowthProjectionsResponseDTO {
        return property.metrics.growthProjections;
    }

    private static getTaxImplications(property: ListingWithScenariosResponseDTO): TaxImplicationsResponseDTO {
        return property.metrics.taxImplications;
    }

    private static getListingDetails(property: ListingWithScenariosResponseDTO): ListingDetailsResponseDTO {
        return property.listingDetails;
    }
}