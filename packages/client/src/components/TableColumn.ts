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
        homeType: property.listingDetails.propertyDetails.homeType!,
        fullAddress: property.listingDetails.propertyDetails.address!.fullAddress,
        state: property.listingDetails.propertyDetails.address!.state,
        zipcode: property.listingDetails.propertyDetails.address!.zipcode,
        zillowURL: property.listingDetails.zillowURL,
        price: property.listingDetails.listingPrice,
        rentEstimate: property.listingDetails.zillowMarketEstimates.zillowRentEstimate!,
        initialCosts: property.metrics[0].initialCosts.value,
        loanAmount: property.metrics[0].loanAmount.value,
        downPaymentAmount: property.metrics[0].downPaymentAmount.value,
        annualInterestRate: property.metrics[0].annualInterestRate.value,
        ROI: property.metrics[0].ROI.value,
        capRate: property.metrics[0].capRate.value,
        recurringCosts: property.metrics[0].recurringCosts.value,
        initialMonthlyAmount: property.metrics[0].monthlyPayment.value,
        mortgage: property.metrics[0].mortgageAmount.value,
        monthlyCashFlow: property.metrics[0].monthlyCashFlow.value,
        yearlyCashFlow: property.metrics[0].yearlyCashFlow.value,
        city: property.listingDetails.propertyDetails.address!.city,
        county: property.listingDetails.propertyDetails.address!.county,
        country: property.listingDetails.propertyDetails.address!.country,
        streetAddress: property.listingDetails.propertyDetails.address!.streetAddress,
        apartmentNumber: property.listingDetails.propertyDetails.address!.apartmentNumber,
        numberOfDaysOnMarket: property.listingDetails.propertyDetails.numberOfDaysOnMarket!,
        elementarySchoolRating: property.listingDetails.propertyDetails.schoolRating!.elementarySchoolRating!,
        middleSchoolRating: property.listingDetails.propertyDetails.schoolRating!.middleSchoolRating!,
        highSchoolRating: property.listingDetails.propertyDetails.schoolRating!.highSchoolRating!,
        numberOfBedrooms: property.listingDetails.propertyDetails.numberOfBedrooms!,
        numberOfFullBathrooms: property.listingDetails.propertyDetails.numberOfFullBathrooms!,
        numberOfHalfBathrooms: property.listingDetails.propertyDetails.numberOfHalfBathrooms!,
        squareFeet: property.listingDetails.propertyDetails.squareFeet!,
        acres: property.listingDetails.propertyDetails.acres!,
        yearBuilt: property.listingDetails.propertyDetails.yearBuilt!,
        hasGarage: property.listingDetails.propertyDetails.hasGarage!,
        hasPool: property.listingDetails.propertyDetails.hasPool!,
        hasBasement: property.listingDetails.propertyDetails.hasBasement!,
        listingPrice: property.listingDetails.listingPrice,
        zestimate: property.listingDetails.zillowMarketEstimates.zestimate!,
        zillowRentEstimate: property.listingDetails.zillowMarketEstimates.zillowRentEstimate!,
        zestimateRangeLow: property.listingDetails.zillowMarketEstimates.zestimateRange!.low!,
        zestimateRangeHigh: property.listingDetails.zillowMarketEstimates.zestimateRange!.high!,
        zillowMonthlyPropertyTaxAmount: property.listingDetails.zillowMarketEstimates.zillowMonthlyPropertyTaxAmount!,
        zillowMonthlyHomeInsuranceAmount: property.listingDetails.zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount!,
        zillowMonthlyHOAFeesAmount: property.listingDetails.zillowMarketEstimates.zillowMonthlyHOAFeesAmount!,
        description: property.listingDetails.propertyDetails.description,
        investmentBreakdown: 'View',
    };
};