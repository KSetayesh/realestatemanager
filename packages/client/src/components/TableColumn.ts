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
        initialCosts: getInitialCosts(),
        loanAmount: getLoanAmount(),
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
    return property.listingDetails.propertyDetails.homeType!;
};

export const getFullAddress = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.address!.fullAddress!;
};

export const getState = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.address!.state!;
};

export const getZipCode = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.address!.zipcode!;
};

export const getZillowURL = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.zillowURL;
};

export const getPrice = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.listingPrice;
};

export const getRentEstimate = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.zillowMarketEstimates.zillowRentEstimate!;
};

export const getInitialCosts = (): number => {
    return 0; // property.metrics[0].initialCosts.value;
};

export const getLoanAmount = (): number => {
    return 0; // property.metrics[0].loanAmount.amount;
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

export const getCity = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.address!.city!;
};

export const getCounty = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.address!.county!;
};

export const getCountry = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.address!.country!;
};

export const getStreetAddress = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.address!.streetAddress!;
};

export const getApartmentNumber = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.address!.apartmentNumber!;
};

export const getNumberOfDaysOnMarket = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.numberOfDaysOnMarket!;
};

export const getElementarySchoolRating = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.schoolRating!.elementarySchoolRating!;
};

export const getMiddleSchoolRating = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.schoolRating!.middleSchoolRating!;
};

export const getHighSchoolRating = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.schoolRating!.highSchoolRating!;
};

export const getNumberOfBedrooms = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.numberOfBedrooms!;
};

export const getNumberOfFullBathrooms = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.numberOfFullBathrooms!;
};

export const getNumberOfHalfBathrooms = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.numberOfHalfBathrooms!;
};

export const getSquareFeet = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.squareFeet!;
};

export const getAcres = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.acres!;
};

export const getYearBuilt = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.propertyDetails.yearBuilt!;
};

export const hasGarage = (property: ListingWithScenariosDTO): boolean => {
    return property.listingDetails.propertyDetails.hasGarage!;
};

export const hasPool = (property: ListingWithScenariosDTO): boolean => {
    return property.listingDetails.propertyDetails.hasPool!;
};

export const hasBasement = (property: ListingWithScenariosDTO): boolean => {
    return property.listingDetails.propertyDetails.hasBasement!;
};

export const getListingPrice = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.listingPrice;
};

export const getZestimate = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.zillowMarketEstimates.zestimate!;
};

export const getZillowRentEstimate = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.zillowMarketEstimates.zillowRentEstimate!;
};

export const getZestimateRangeLow = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.zillowMarketEstimates.zestimateRange!.low!;
};

export const getZestimateRangeHigh = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.zillowMarketEstimates.zestimateRange!.high!;
};

export const getZillowMonthlyPropertyTaxAmount = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.zillowMarketEstimates.zillowMonthlyPropertyTaxAmount!;
};

export const getZillowMonthlyHomeInsuranceAmount = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount!;
};

export const getZillowMonthlyHOAFeesAmount = (property: ListingWithScenariosDTO): number => {
    return property.listingDetails.zillowMarketEstimates.zillowMonthlyHOAFeesAmount!;
};

export const getDescription = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.description!;
};



