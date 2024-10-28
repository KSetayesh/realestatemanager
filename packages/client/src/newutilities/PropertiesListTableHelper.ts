import {
    Country,
    GrowthProjectionsResponseDTO,
    InitialInvestmentBreakdownResponseDTO,
    ListingCreationType,
    ListingDetailsResponseDTO,
    ListingWithScenariosResponseDTO,
    PropertyStatus,
    PropertyType,
    State,
    TaxImplicationsResponseDTO
} from "@realestatemanager/types";

export class PropertiesListTableHelper {

    // setters

    static setElementarySchoolRating(property: ListingWithScenariosResponseDTO, newValue: number): void {
        const schoolRating = this.getListingDetails(property).propertyDetails.schoolRating;
        if (schoolRating?.elementarySchoolRating) {
            schoolRating.elementarySchoolRating = newValue;
        }
    }

    static setMiddleSchoolRating(property: ListingWithScenariosResponseDTO, newValue: number): void {
        const schoolRating = this.getListingDetails(property).propertyDetails.schoolRating;
        if (schoolRating?.middleSchoolRating) {
            schoolRating.middleSchoolRating = newValue;
        }
    }

    static setHighSchoolRating(property: ListingWithScenariosResponseDTO, newValue: number): void {
        const schoolRating = this.getListingDetails(property).propertyDetails.schoolRating;
        if (schoolRating?.highSchoolRating) {
            schoolRating.highSchoolRating = newValue;
        }
    }

    static setNumberOfBedrooms(property: ListingWithScenariosResponseDTO, newValue: number | undefined): void {
        this.getListingDetails(property).propertyDetails.numberOfBedrooms = newValue;
    }

    static setNumberOfFullBathrooms(property: ListingWithScenariosResponseDTO, newValue: number | undefined): void {
        this.getListingDetails(property).propertyDetails.numberOfFullBathrooms = newValue;
    }

    static setNumberOfHalfBathrooms(property: ListingWithScenariosResponseDTO, newValue: number | undefined): void {
        this.getListingDetails(property).propertyDetails.numberOfHalfBathrooms = newValue;
    }

    static setSquareFeet(property: ListingWithScenariosResponseDTO, newValue: number | undefined): void {
        this.getListingDetails(property).propertyDetails.squareFeet = newValue;
    }

    static setAcres(property: ListingWithScenariosResponseDTO, newValue: number | undefined): void {
        this.getListingDetails(property).propertyDetails.acres = newValue;
    }

    static setYearBuilt(property: ListingWithScenariosResponseDTO, newValue: number | undefined): void {
        this.getListingDetails(property).propertyDetails.yearBuilt = newValue;
    }

    static setHasGarage(property: ListingWithScenariosResponseDTO, newValue: boolean | undefined): void {
        this.getListingDetails(property).propertyDetails.hasGarage = newValue;
    }

    static setHasPool(property: ListingWithScenariosResponseDTO, newValue: boolean | undefined): void {
        this.getListingDetails(property).propertyDetails.hasPool = newValue;
    }

    static setHasBasement(property: ListingWithScenariosResponseDTO, newValue: boolean | undefined): void {
        this.getListingDetails(property).propertyDetails.hasBasement = newValue;
    }

    static setListingPrice(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getListingDetails(property).listingPrice = newValue;
    }

    static setZestimate(property: ListingWithScenariosResponseDTO, newValue: number | undefined): void {
        this.getListingDetails(property).zillowMarketEstimates.zestimate = newValue;
    }

    static setZillowRentEstimate(property: ListingWithScenariosResponseDTO, newValue: number | undefined): void {
        this.getListingDetails(property).zillowMarketEstimates.zillowRentEstimate = newValue;
    }

    static setZestimateRangeLow(property: ListingWithScenariosResponseDTO, newValue: number | undefined): void {
        const zestimateRange = this.getListingDetails(property).zillowMarketEstimates.zestimateRange;
        if (zestimateRange?.low) {
            zestimateRange.low = newValue;
        }
    }

    static setZestimateRangeHigh(property: ListingWithScenariosResponseDTO, newValue: number | undefined): void {
        const zestimateRange = this.getListingDetails(property).zillowMarketEstimates.zestimateRange;
        if (zestimateRange?.high) {
            zestimateRange.high = newValue;
        }
    }

    static setZillowMonthlyPropertyTaxAmount(property: ListingWithScenariosResponseDTO, newValue: number | undefined): void {
        this.getListingDetails(property).zillowMarketEstimates.zillowMonthlyPropertyTaxAmount = newValue;
    }

    static setZillowMonthlyHomeInsuranceAmount(property: ListingWithScenariosResponseDTO, newValue: number | undefined): void {
        this.getListingDetails(property).zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount = newValue;
    }

    static setZillowMonthlyHOAFeesAmount(property: ListingWithScenariosResponseDTO, newValue: number | undefined): void {
        this.getListingDetails(property).zillowMarketEstimates.zillowMonthlyHOAFeesAmount = newValue;
    }

    static setDescription(property: ListingWithScenariosResponseDTO, newValue: string | undefined): void {
        this.getListingDetails(property).propertyDetails.description = newValue;
    }

    static setCreationType(property: ListingWithScenariosResponseDTO, newValue: ListingCreationType): void {
        this.getListingDetails(property).creationType = newValue;
    }

    static setPrice(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getInitialInvestmentDetails(property).transactions.Financing.breakdown["Purchase Price"].amount = newValue;
    }

    static setRentEstimate(property: ListingWithScenariosResponseDTO, newValue: number): void {
        this.getInitialInvestmentDetails(property).transactions["Income Streams"].breakdown["Rental Income"].amount = newValue;
    }

    // getters

    static getFullAddress(property: ListingWithScenariosResponseDTO): string {
        return this.getListingDetails(property).propertyDetails.address.fullAddress;
    }

    static getPropertyType(property: ListingWithScenariosResponseDTO): PropertyType | undefined {
        return this.getListingDetails(property).propertyDetails.propertyType;
    }

    static getPropertyStatus(property: ListingWithScenariosResponseDTO): PropertyStatus {
        return this.getListingDetails(property).propertyStatus;
    }

    static getState(property: ListingWithScenariosResponseDTO): State {
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

    static getCounty(property: ListingWithScenariosResponseDTO): string | undefined {
        return this.getListingDetails(property).propertyDetails.address?.county;
    }

    static getCountry(property: ListingWithScenariosResponseDTO): Country {
        return this.getListingDetails(property).propertyDetails.address.country;
    }

    static getStreetAddress(property: ListingWithScenariosResponseDTO): string {
        return this.getListingDetails(property).propertyDetails.address.streetAddress;
    }

    static getApartmentNumber(property: ListingWithScenariosResponseDTO): string | undefined {
        return this.getListingDetails(property).propertyDetails.address?.apartmentNumber;
    }

    static getLongitude(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).propertyDetails.address?.longitude;
    }

    static getLatitude(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).propertyDetails.address?.latitude;
    }

    static getNumberOfDaysOnMarket(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).numberOfDaysOnMarket; //propertyDetails.numberOfDaysOnMarket;
    }

    // Make sure new Date() is being used correctly
    static getDateListed(property: ListingWithScenariosResponseDTO): Date {
        return new Date(this.getListingDetails(property).dateListed);
    }

    // Make sure new Date() is being used correctly
    static getDateCreated(property: ListingWithScenariosResponseDTO): Date {
        return new Date(this.getListingDetails(property).dateCreated);
    }

    static getElementarySchoolRating(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).propertyDetails.schoolRating?.elementarySchoolRating;
    }

    static getMiddleSchoolRating(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).propertyDetails.schoolRating?.middleSchoolRating;
    }

    static getHighSchoolRating(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).propertyDetails.schoolRating?.highSchoolRating;
    }

    static getNumberOfBedrooms(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).propertyDetails.numberOfBedrooms;
    }

    static getNumberOfFullBathrooms(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).propertyDetails.numberOfFullBathrooms;
    }

    static getNumberOfHalfBathrooms(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).propertyDetails.numberOfHalfBathrooms;
    }

    static getSquareFeet(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).propertyDetails.squareFeet;
    }

    static getAcres(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).propertyDetails.acres;
    }

    static getYearBuilt(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).propertyDetails.yearBuilt;
    }

    static hasGarage(property: ListingWithScenariosResponseDTO): boolean | undefined {
        return this.getListingDetails(property).propertyDetails.hasGarage;
    }

    static hasPool(property: ListingWithScenariosResponseDTO): boolean | undefined {
        return this.getListingDetails(property).propertyDetails.hasPool;
    }

    static hasBasement(property: ListingWithScenariosResponseDTO): boolean | undefined {
        return this.getListingDetails(property).propertyDetails.hasBasement;
    }

    static getListingPrice(property: ListingWithScenariosResponseDTO): number {
        return this.getListingDetails(property).listingPrice;
    }

    static getZestimate(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).zillowMarketEstimates.zestimate;
    }

    static getZillowRentEstimate(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).zillowMarketEstimates.zillowRentEstimate;
    }

    static getZestimateRangeLow(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).zillowMarketEstimates.zestimateRange?.low;
    }

    static getZestimateRangeHigh(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).zillowMarketEstimates.zestimateRange?.high;
    }

    static getZillowMonthlyPropertyTaxAmount(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).zillowMarketEstimates.zillowMonthlyPropertyTaxAmount;
    }

    static getZillowMonthlyHomeInsuranceAmount(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount;
    }

    static getZillowMonthlyHOAFeesAmount(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getListingDetails(property).zillowMarketEstimates.zillowMonthlyHOAFeesAmount;
    }

    static getDescription(property: ListingWithScenariosResponseDTO): string | undefined {
        return this.getListingDetails(property).propertyDetails.description;
    }

    static getCreationType(property: ListingWithScenariosResponseDTO): ListingCreationType {
        return this.getListingDetails(property).creationType;
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

    static getAnnualHOAFeesIncreaseRate(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getGrowthProjections(property).annualHOAFeesIncreaseRate;
    }

    static getAnnualTaxIncreaseRate(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getGrowthProjections(property).annualTaxIncreaseRate;
    }

    static getAnnualHomeInsuranceIncreaseRate(property: ListingWithScenariosResponseDTO): number | undefined {
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

    static getPropertyTaxes(property: ListingWithScenariosResponseDTO): number | undefined {
        return this.getTaxImplications(property).propertyTaxes;
    }

    static getPrice(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions.Financing.breakdown["Purchase Price"].amount;
    }

    static getRentEstimate(property: ListingWithScenariosResponseDTO): number {
        return this.getInitialInvestmentDetails(property).transactions["Income Streams"].breakdown["Rental Income"].amount;
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
