import { ListingWithScenariosDTO } from "@realestatemanager/shared";
import { TableColumn, TableRow } from "./ReusableTable";

export const defaultColumns: TableColumn[] = [
    {
        header: "Home Type",
        accessor: "homeType",
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Full Address",
        accessor: "fullAddress",
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true
    },
    {
        header: "State",
        accessor: "state",
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Zip Code",
        accessor: "zipcode",
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Zillow URL",
        accessor: "zillowURL",
        isURL: true,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Price",
        accessor: "price",
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Rent Estimate",
        accessor: "rentEstimate",
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Initial Costs",
        accessor: "initialCosts",
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
        detailedDescription: `downPaymentAmount + 
                        legalAndProfessionalFees + 
                        initialRepairCosts + 
                        travelingCosts + 
                        closingCosts + 
                        otherInitialExpenses`,
    },
    {
        header: "Loan Amount",
        accessor: "loanAmount",
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Down Payment",
        accessor: "downPaymentAmount",
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true
    },
    {
        header: "Annual Interest Rate",
        accessor: "annualInterestRate",
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        addSuffix: '%',
        isSortable: true,
    },
    {
        header: "ROI",
        accessor: "ROI",
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        addSuffix: '%',
        isSortable: true,
    },
    {
        header: "Cap Rate",
        accessor: "capRate",
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        addSuffix: '%',
        isSortable: true,
    },
    {
        header: "Recurring Costs",
        accessor: "recurringCosts",
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
        detailedDescription: `propertyManagementAmount + 
                        vacancyAmount +
                        maintenanceAmount +
                        otherExpensesAmount +
                        capExReserveAmount`,
    },
    {
        header: "Monthly Payment",
        accessor: "initialMonthlyAmount",
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
        detailedDescription: ` Mortgage Amount +
                                Property Tax Amount +
                                Monthly Home Insurance Amount +
                                Monthly HOA Fees Amount`,
    },
    {
        header: "Mortgage Amount",
        accessor: "mortgage",
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Monthly Cash Flow",
        accessor: "monthlyCashFlow",
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Yearly Cash Flow",
        accessor: "yearlyCashFlow",
        isURL: false,
        showColumn: true,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Number of Days On Market",
        accessor: "numberOfDaysOnMarket",
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Date Listed",
        accessor: "dateListed",
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Date Created",
        accessor: "dateCreated",
        isURL: false,
        showColumn: true,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "City",
        accessor: "city",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "County",
        accessor: "county",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Country",
        accessor: "country",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Street Address",
        accessor: "streetAddress",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Apartment Number",
        accessor: "apartmentNumber",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: false,
    },
    {
        header: "Number Of Days On Market",
        accessor: "numberOfDaysOnMarket",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Elementary School Rating",
        accessor: "elementarySchoolRating",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Middle School Rating",
        accessor: "middleSchoolRating",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "High School Rating",
        accessor: "highSchoolRating",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Number Of Bedrooms",
        accessor: "numberOfBedrooms",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Number Of Full Bathrooms",
        accessor: "numberOfFullBathrooms",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Number Of Half Bathrooms",
        accessor: "numberOfHalfBathrooms",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Square Feet",
        accessor: "squareFeet",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Acres",
        accessor: "acres",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Year Built",
        accessor: "yearBuilt",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Has Garage",
        accessor: "hasGarage",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Has Pool",
        accessor: "hasPool",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Has Basement",
        accessor: "hasBasement",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true,
    },
    {
        header: "Listing Price",
        accessor: "listingPrice",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: true
    },
    {
        header: "Zestimate",
        accessor: "zestimate",
        isURL: false,
        showColumn: false,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Zillow Rent Estimate",
        accessor: "zillowRentEstimate",
        isURL: false,
        showColumn: false,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Zillow Range Low",
        accessor: "zestimateRangeLow",
        isURL: false,
        showColumn: false,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Zillow Range High",
        accessor: "zestimateRangeHigh",
        isURL: false,
        showColumn: false,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Zillow Monthly Property Tax Amount",
        accessor: "zillowMonthlyPropertyTaxAmount",
        isURL: false,
        showColumn: false,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Zillow Monthly Home Insurance Amount",
        accessor: "zillowMonthlyHomeInsuranceAmount",
        isURL: false,
        showColumn: false,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Zillow Monthly HOA Fees Amount",
        accessor: "zillowMonthlyHOAFeesAmount",
        isURL: false,
        showColumn: false,
        isDollarAmount: true,
        isSortable: true,
    },
    {
        header: "Description",
        accessor: "description",
        isURL: false,
        showColumn: false,
        isDollarAmount: false,
        isSortable: false,
    },
    {
        header: "Investment Breakdown",
        accessor: "investmentBreakdown",
        isURL: false,
        showColumn: true,
        routeTo: 'investmentBreakdown',
        isDollarAmount: false,
        isSortable: false,
    }
];

export const createDefaultRowData = (property: ListingWithScenariosDTO): TableRow => {
    return {
        homeType: getHomeType(property),
        fullAddress: getFullAddress(property),
        state: getState(property),
        zipcode: getZipCode(property),
        zillowURL: getZillowURL(property),
        price: getPrice(property),
        rentEstimate: getRentEstimate(property),
        initialCosts: getInitialCosts(property),
        loanAmount: getLoanAmount(property),
        downPaymentAmount: getDownPaymentAmount(property),
        annualInterestRate: getAnnualInterestRate(property),
        ROI: getROI(property),
        capRate: getCapRate(property),
        recurringCosts: getRecurringCosts(property),
        initialMonthlyAmount: getInitialMonthlyAmount(property),
        mortgage: getMortgage(property),
        monthlyCashFlow: getMonthlyCashFlow(property),
        yearlyCashFlow: getYearlyCashFlow(property),
        city: getCity(property),
        county: getCounty(property),
        country: getCountry(property),
        streetAddress: getStreetAddress(property),
        apartmentNumber: getApartmentNumber(property),
        numberOfDaysOnMarket: getNumberOfDaysOnMarket(property),
        dateListed: getDateListed(property),
        dateCreated: getDateCreated(property),
        elementarySchoolRating: getElementarySchoolRating(property),
        middleSchoolRating: getMiddleSchoolRating(property),
        highSchoolRating: getHighSchoolRating(property),
        numberOfBedrooms: getNumberOfBedrooms(property),
        numberOfFullBathrooms: getNumberOfFullBathrooms(property),
        numberOfHalfBathrooms: getNumberOfHalfBathrooms(property),
        squareFeet: getSquareFeet(property),
        acres: getAcres(property),
        yearBuilt: getYearBuilt(property),
        hasGarage: hasGarage(property),
        hasPool: hasPool(property),
        hasBasement: hasBasement(property),
        listingPrice: getListingPrice(property),
        zestimate: getZestimate(property),
        zillowRentEstimate: getZillowRentEstimate(property),
        zestimateRangeLow: getZestimateRangeLow(property),
        zestimateRangeHigh: getZestimateRangeHigh(property),
        zillowMonthlyPropertyTaxAmount: getZillowMonthlyPropertyTaxAmount(property),
        zillowMonthlyHomeInsuranceAmount: getZillowMonthlyHomeInsuranceAmount(property),
        zillowMonthlyHOAFeesAmount: getZillowMonthlyHOAFeesAmount(property),
        description: getDescription(property),
        investmentBreakdown: 'View',
    };
};

export const getHomeType = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.homeType ?? "";
};

export const getFullAddress = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.address?.fullAddress ?? "";
};

export const getState = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.address?.state ?? "";
};

export const getZipCode = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.address?.zipcode ?? "";
};

export const getZillowURL = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.zillowURL;
};

export const getCity = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.address?.city ?? "";
};

export const getCounty = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.address?.county ?? "";
};

export const getCountry = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.address?.country ?? "";
};

export const getStreetAddress = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.address?.streetAddress ?? "";
};

export const getApartmentNumber = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.address?.apartmentNumber ?? "";
};

export const getNumberOfDaysOnMarket = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.numberOfDaysOnMarket ?? -1; //propertyDetails.numberOfDaysOnMarket ?? -1;
};

export const getDateListed = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.dateListed ?? new Date(0).toLocaleDateString('en-US');
};

export const getDateCreated = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.dateCreated ?? new Date(0).toLocaleDateString('en-US');
};

export const getElementarySchoolRating = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.schoolRating?.elementarySchoolRating ?? -1;
};

export const getMiddleSchoolRating = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.schoolRating?.middleSchoolRating ?? -1;
};

export const getHighSchoolRating = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.schoolRating?.highSchoolRating ?? -1;
};

export const getNumberOfBedrooms = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.numberOfBedrooms ?? -1;
};

export const getNumberOfFullBathrooms = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.numberOfFullBathrooms ?? -1;
};

export const getNumberOfHalfBathrooms = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.numberOfHalfBathrooms ?? -1;
};

export const getSquareFeet = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.squareFeet ?? -1;
};

export const getAcres = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.acres ?? -1;
};

export const getYearBuilt = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.yearBuilt ?? -1;
};

export const hasGarage = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.hasGarage?.toString() ?? "";
};

export const hasPool = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.hasPool?.toString() ?? "";
};

export const hasBasement = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.hasBasement?.toString() ?? "";
};

export const getListingPrice = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.listingPrice;
};

export const getZestimate = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.zillowMarketEstimates.zestimate ?? -1;
};

export const getZillowRentEstimate = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.zillowMarketEstimates.zillowRentEstimate ?? -1;
};

export const getZestimateRangeLow = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.zillowMarketEstimates.zestimateRange?.low ?? -1;
};

export const getZestimateRangeHigh = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.zillowMarketEstimates.zestimateRange?.high ?? -1;
};

export const getZillowMonthlyPropertyTaxAmount = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.zillowMarketEstimates.zillowMonthlyPropertyTaxAmount ?? -1;
};

export const getZillowMonthlyHomeInsuranceAmount = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount ?? -1;
};

export const getZillowMonthlyHOAFeesAmount = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.zillowMarketEstimates.zillowMonthlyHOAFeesAmount ?? -1;
};

export const getDescription = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.description ?? "";
};

export const getPMIRate = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails.Mortgage.breakdown.pmiRate;
};

export const getPMIDropoffPoint = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails.Mortgage.breakdown.pmiDropOffPoint;
};

export const getMonthlyPropertyTax = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Fixed Recurring Expense"].breakdown["Property Tax"].amount;
};

export const getMonthlyHomeInsuranceAmount = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Fixed Recurring Expense"].breakdown["Monthly Home Insurance"].amount;
};

export const getMonthlyHOAFeesAmount = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Fixed Recurring Expense"].breakdown["Monthly HOA Fee"].amount;
};

export const getTermInYears = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails.Mortgage.breakdown.termLength;
};

export const getInterestType = (property: ListingWithScenariosDTO): string => {
    return property.metrics.initialInvestmenDetails.Mortgage.breakdown.interestType;
};

export const getPropertyManagementRate = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Operational Recurring Expense"].breakdown["Property Management Expense"].percentage;
};

export const getVacancyRate = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Operational Recurring Expense"].breakdown["Vacancy Expense"].percentage;
    // return property.metrics[0].mortgageDetails.transactions.expenses.recurringExpenses.vacancyRate;
};

export const getMaintenanceRate = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Operational Recurring Expense"].breakdown["Maintenance Expense"].percentage;
    // return property.metrics[0].mortgageDetails.transactions.expenses.recurringExpenses.maintenanceRate;
};

export const getOtherExpensesRate = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Operational Recurring Expense"].breakdown["Other Expeneses"].percentage;
    // return property.metrics[0].mortgageDetails.transactions.expenses.recurringExpenses.otherExpensesRate;
};

export const getCapExReserveRate = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Operational Recurring Expense"].breakdown["Cap Ex Reserve Expense"].percentage;
    // return property.metrics[0].mortgageDetails.transactions.expenses.recurringExpenses.capExReserveRate;
};

export const getLegalAndProfessionalFees = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Initial Expense"].breakdown["Legal And Professional Fees"].amount;
    // return property.metrics[0].mortgageDetails.transactions.expenses.initialCosts.breakdown.legalAndProfessionalFees;
};

export const getInitialRepairCosts = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Initial Expense"].breakdown["Initial Repair Costs"].amount;
    // return property.metrics[0].mortgageDetails.transactions.expenses.initialCosts.breakdown.initialRepairCosts.amount;
};

export const getTravelingCosts = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Initial Expense"].breakdown["Traveling Costs"].amount;
    // return property.metrics[0].mortgageDetails.transactions.expenses.initialCosts.breakdown.travelingCosts;
};

export const getClosingCosts = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Initial Expense"].breakdown["Closing Costs"].amount;
    // return property.metrics[0].mortgageDetails.transactions.expenses.initialCosts.breakdown.closingCosts.amount;
};

export const getOtherInitialExpenses = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Initial Expense"].breakdown["Other Initial Expenses"].amount;
    // return property.metrics[0].mortgageDetails.transactions.expenses.initialCosts.breakdown.otherExpenses.amount;
};

export const getAnnualRentIncreaseRate = (property: ListingWithScenariosDTO): number => {
    return property.metrics.growthProjections.annualRentIncreaseRate;
};

export const getAnnualAppreciationRate = (property: ListingWithScenariosDTO): number => {
    return property.metrics.growthProjections.annualAppreciationRate;
};

export const getAnnualHOAFeesIncreaseRate = (property: ListingWithScenariosDTO): number => {
    return property.metrics.growthProjections.annualHOAFeesIncreaseRate ?? 0;
};

export const getAnnualTaxIncreaseRate = (property: ListingWithScenariosDTO): number => {
    return property.metrics.growthProjections.annualTaxIncreaseRate ?? 0;
};

export const getAnnualHomeInsuranceIncreaseRate = (property: ListingWithScenariosDTO): number => {
    return property.metrics.growthProjections.annualHomeInsuranceIncreaseRate ?? 0;
};

export const getParkingFees = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Income Streams"].breakdown["Parking Fees"].amount;
};

export const getLaundryServices = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Income Streams"].breakdown["Laundry Service"].amount;
};

export const getStorageUnitFees = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Income Streams"].breakdown["Storage Unit Fees"].amount;
};

export const getOtherAdditionalIncomeStreams = (property: ListingWithScenariosDTO): number => {
    return property.metrics.initialInvestmenDetails["Income Streams"].breakdown["Other Additional Incomes Streams"].amount;   
};

export const getTaxDepreciation = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].taxImplications.depreciation;
};

export const getMortgageInterest = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].taxImplications.mortgageInterest;
};

export const getOperatingExpenses = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].taxImplications.operatingExpenses;
};

export const getPropertyTaxes = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].taxImplications.propertyTaxes ?? -1;
};

export const getPrice = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].mortgageDetails.purchasePrice;
};

export const getRentEstimate = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].mortgageDetails.transactions.incomes.rentalIncome;
};

export const getInitialCosts = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].mortgageDetails.transactions.expenses.initialCosts.totalAmount;
};

export const getLoanAmount = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].mortgageDetails.loanAmount.amount;
};

export const getDownPaymentAmount = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].mortgageDetails.downpayment.amount;
};

export const getDownPaymentPercentage = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].mortgageDetails.downpayment.percentage;
};

export const getAnnualInterestRate = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].mortgageDetails.financingTerms.annualInterestRate;
};

export const getROI = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].investmentProjections.ROI;
};

export const getCapRate = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].investmentProjections.capRate;
};

export const getRecurringCosts = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].investmentProjections.recurringCosts;
};

export const getInitialMonthlyAmount = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].investmentProjections.monthlyPayment;
};

export const getMortgage = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].investmentProjections.mortgageAmount;
};

export const getMonthlyCashFlow = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].investmentProjections.monthlyCashFlow;
};

export const getYearlyCashFlow = (property: ListingWithScenariosDTO): number => {
    return property.metrics[0].investmentProjections.yearlyCashFlow;
};