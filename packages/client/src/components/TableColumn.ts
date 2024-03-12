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

export const getPrice = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.listingPrice.toString();
};

export const getRentEstimate = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.zillowMarketEstimates.zillowRentEstimate?.toString() ?? "";
};

export const getInitialCosts = (): string => {
    return '0'; // property.metrics[0].initialCosts.value;
};

export const getLoanAmount = (): string => {
    return '0'; // property.metrics[0].loanAmount.amount;
};

export const getDownPaymentAmount = (property: ListingWithScenariosDTO): string => {
    return property.metrics[0].mortgageDetails.downpayment.amount.toString();
};

export const getDownPaymentPercentage = (property: ListingWithScenariosDTO): string => {
    console.log("hello");
    console.log('p1:', property);
    return property.metrics[0].mortgageDetails.downpayment.percentage.toString();
};

export const getAnnualInterestRate = (property: ListingWithScenariosDTO): string => {
    return property.metrics[0].mortgageDetails.financingTerms.annualInterestRate.toString();
};

export const getROI = (property: ListingWithScenariosDTO): string => {
    return property.metrics[0].investmentProjections.ROI.toString();
};

export const getCapRate = (property: ListingWithScenariosDTO): string => {
    return property.metrics[0].investmentProjections.capRate.toString();
};

export const getRecurringCosts = (property: ListingWithScenariosDTO): string => {
    return property.metrics[0].investmentProjections.recurringCosts.toString();
};

export const getInitialMonthlyAmount = (property: ListingWithScenariosDTO): string => {
    return property.metrics[0].investmentProjections.monthlyPayment.toString();
};

export const getMortgage = (property: ListingWithScenariosDTO): string => {
    return property.metrics[0].investmentProjections.mortgageAmount.toString();
};

export const getMonthlyCashFlow = (property: ListingWithScenariosDTO): string => {
    return property.metrics[0].investmentProjections.monthlyCashFlow.toString();
};

export const getYearlyCashFlow = (property: ListingWithScenariosDTO): string => {
    return property.metrics[0].investmentProjections.yearlyCashFlow.toString();
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

export const getNumberOfDaysOnMarket = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.numberOfDaysOnMarket?.toString() ?? "";
};

export const getElementarySchoolRating = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.schoolRating?.elementarySchoolRating?.toString() ?? "";
};

export const getMiddleSchoolRating = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.schoolRating?.middleSchoolRating?.toString() ?? "";
};

export const getHighSchoolRating = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.schoolRating?.highSchoolRating?.toString() ?? "";
};

export const getNumberOfBedrooms = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.numberOfBedrooms?.toString() ?? "";
};

export const getNumberOfFullBathrooms = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.numberOfFullBathrooms?.toString() ?? "";
};

export const getNumberOfHalfBathrooms = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.numberOfHalfBathrooms?.toString() ?? "";
};

export const getSquareFeet = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.squareFeet?.toString() ?? "";
};

export const getAcres = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.acres?.toString() ?? "";
};

export const getYearBuilt = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.yearBuilt?.toString() ?? "";
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

export const getListingPrice = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.listingPrice.toString();
};

export const getZestimate = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.zillowMarketEstimates.zestimate?.toString() ?? "";
};

export const getZillowRentEstimate = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.zillowMarketEstimates.zillowRentEstimate?.toString() ?? "";
};

export const getZestimateRangeLow = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.zillowMarketEstimates.zestimateRange?.low?.toString() ?? "";
};

export const getZestimateRangeHigh = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.zillowMarketEstimates.zestimateRange?.high?.toString() ?? "";
};

export const getZillowMonthlyPropertyTaxAmount = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.zillowMarketEstimates.zillowMonthlyPropertyTaxAmount?.toString() ?? "";
};

export const getZillowMonthlyHomeInsuranceAmount = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount?.toString() ?? "";
};

export const getZillowMonthlyHOAFeesAmount = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.zillowMarketEstimates.zillowMonthlyHOAFeesAmount?.toString() ?? "";
};

export const getDescription = (property: ListingWithScenariosDTO): string => {
    return property.listingDetails.propertyDetails.description ?? "";
};

export const getPMIRate = (property: ListingWithScenariosDTO): string => {
    return property.metrics[0].mortgageDetails.pmiDetails.pmiRate.toString();
};



