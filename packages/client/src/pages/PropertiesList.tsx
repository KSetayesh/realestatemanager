import React, { useState, useEffect } from 'react';
import { ListingWithScenariosDTO } from '@realestatemanager/shared';
import PropertyDetailsModal from './PropertyDetailsModal';
import '../styles/PropertiesList.css';
import ReusableTable, { TableColumn } from '../components/ReusableTable';

const PropertiesList: React.FC = () => {
    const [properties, setProperties] = useState<ListingWithScenariosDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosDTO | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/calc')
            .then(response => response.json())
            .then((data: ListingWithScenariosDTO[]) => {
                setProperties(data);
                console.log("data:", data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching properties:', error);
                setIsLoading(false);
            });
    }, []);

    const handleRowClick = (property: ListingWithScenariosDTO) => {
        setSelectedProperty(property);
    };

    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    const columns: TableColumn[] = [
        { header: "Home Type", accessor: "homeType", isURL: false, showColumn: true },
        { header: "Full Address", accessor: "fullAddress", isURL: false, showColumn: true },
        { header: "State", accessor: "state", isURL: false, showColumn: true },
        { header: "Zip Code", accessor: "zipcode", isURL: false, showColumn: true },
        { header: "Zillow URL", accessor: "zillowURL", isURL: true, showColumn: true },
        { header: "Price", accessor: "price", isURL: false, showColumn: true },
        { header: "Rent Estimate", accessor: "rentEstimate", isURL: false, showColumn: true },
        { header: "Initial Costs", accessor: "initialCosts", isURL: false, showColumn: true },
        { header: "Loan Amount", accessor: "loanAmount", isURL: false, showColumn: true },
        { header: "Down Payment", accessor: "downPaymentAmount", isURL: false, showColumn: true },
        { header: "Annual Interest Rate", accessor: "annualInterestRate", isURL: false, showColumn: true },
        { header: "ROI", accessor: "ROI", isURL: false, showColumn: true },
        { header: "Cap Rate", accessor: "capRate", isURL: false, showColumn: true },
        { header: "Mortgage", accessor: "mortgage", isURL: false, showColumn: true },
        { header: "Monthly Cash Flow", accessor: "monthlyCashFlow", isURL: false, showColumn: true },
        { header: "Yearly Cash Flow", accessor: "yearlyCashFlow", isURL: false, showColumn: true },
        { header: "City", accessor: "city", isURL: false, showColumn: false },
        { header: "County", accessor: "county", isURL: false, showColumn: false },
        { header: "Country", accessor: "country", isURL: false, showColumn: false },
        { header: "Street Address", accessor: "streetAddress", isURL: false, showColumn: false },
        { header: "Apartment Number", accessor: "apartmentNumber", isURL: false, showColumn: false },
        { header: "Number Of Days On Market", accessor: "numberOfDaysOnMarket", isURL: false, showColumn: false },
        { header: "Elementary School Rating", accessor: "elementarySchoolRating", isURL: false, showColumn: false },
        { header: "Middle School Rating", accessor: "middleSchoolRating", isURL: false, showColumn: false },
        { header: "High School Rating", accessor: "highSchoolRating", isURL: false, showColumn: false },
        { header: "Number Of Bedrooms", accessor: "numberOfBedrooms", isURL: false, showColumn: false },
        { header: "Number Of Full Bathrooms", accessor: "numberOfFullBathrooms", isURL: false, showColumn: false },
        { header: "Number Of Half Bathrooms", accessor: "numberOfHalfBathrooms", isURL: false, showColumn: false },
        { header: "Square Feet", accessor: "squareFeet", isURL: false, showColumn: false },
        { header: "Acres", accessor: "acres", isURL: false, showColumn: false },
        { header: "Year Built", accessor: "yearBuilt", isURL: false, showColumn: false },
        { header: "Has Garage", accessor: "hasGarage", isURL: false, showColumn: false },
        { header: "Has Pool", accessor: "hasPool", isURL: false, showColumn: false },
        { header: "Has Basement", accessor: "hasBasement", isURL: false, showColumn: false },
        { header: "Listing Price", accessor: "listingPrice", isURL: false, showColumn: false },
        { header: "Zestimate", accessor: "zestimate", isURL: false, showColumn: false },
        { header: "Zillow Rent Estimate", accessor: "zillowRentEstimate", isURL: false, showColumn: false },
        { header: "Zillow Range Low", accessor: "zestimateRangeLow", isURL: false, showColumn: false },
        { header: "Zillow Range High", accessor: "zestimateRangeHigh", isURL: false, showColumn: false },
        { header: "Zillow Monthly Property Tax Amount", accessor: "zillowMonthlyPropertyTaxAmount", isURL: false, showColumn: false },
        { header: "Zillow Monthly Home Insurance Amount", accessor: "zillowMonthlyHomeInsuranceAmount", isURL: false, showColumn: false },
        { header: "Zillow Monthly HOA Fees Amount", accessor: "zillowMonthlyHOAFeesAmount", isURL: false, showColumn: false },
        { header: "Description", accessor: "description", isURL: false, showColumn: false },
    ];

    const rows = properties.map(property => ({
        homeType: property.listingDetails.propertyDetails.homeType,
        fullAddress: property.listingDetails.propertyDetails.address!.fullAddress,
        state: property.listingDetails.propertyDetails.address!.state,
        zipcode: property.listingDetails.propertyDetails.address!.zipcode,
        zillowURL: property.listingDetails.zillowURL,
        price: property.listingDetails.listingPrice,
        rentEstimate: property.listingDetails.zillowMarketEstimates.zillowRentEstimate,
        initialCosts: property.metrics[0].initialCosts,
        loanAmount: property.metrics[0].loanAmount,
        downPaymentAmount: property.metrics[0].downPaymentAmount,
        annualInterestRate: property.metrics[0].investmentScenario.mortgageDetails.annualInterestRate,
        ROI: property.metrics[0].ROI,
        capRate: property.metrics[0].capRate,
        mortgage: property.metrics[0].mortgage,
        monthlyCashFlow: property.metrics[0].monthlyCashFlow,
        yearlyCashFlow: property.metrics[0].yearlyCashFlow,
        city: property.listingDetails.propertyDetails.address?.city,
        county: property.listingDetails.propertyDetails.address?.county,
        country: property.listingDetails.propertyDetails.address?.country,
        streetAddress: property.listingDetails.propertyDetails.address?.streetAddress,
        apartmentNumber: property.listingDetails.propertyDetails.address?.apartmentNumber,
        numberOfDaysOnMarket: property.listingDetails.propertyDetails.numberOfDaysOnMarket,
        elementarySchoolRating: property.listingDetails.propertyDetails.schoolRating?.elementarySchoolRating,
        middleSchoolRating: property.listingDetails.propertyDetails.schoolRating?.middleSchoolRating,
        highSchoolRating: property.listingDetails.propertyDetails.schoolRating?.highSchoolRating,
        numberOfBedrooms: property.listingDetails.propertyDetails.numberOfBedrooms,
        numberOfFullBathrooms: property.listingDetails.propertyDetails.numberOfFullBathrooms,
        numberOfHalfBathrooms: property.listingDetails.propertyDetails.numberOfHalfBathrooms,
        squareFeet: property.listingDetails.propertyDetails.squareFeet,
        acres: property.listingDetails.propertyDetails.acres,
        yearBuilt: property.listingDetails.propertyDetails.yearBuilt,
        hasGarage: property.listingDetails.propertyDetails.hasGarage,
        hasPool: property.listingDetails.propertyDetails.hasPool,
        hasBasement: property.listingDetails.propertyDetails.hasBasement,
        listingPrice: property.listingDetails.listingPrice,
        zestimate: property.listingDetails.zillowMarketEstimates.zestimate,
        zillowRentEstimate: property.listingDetails.zillowMarketEstimates.zillowRentEstimate,
        zestimateRangeLow: property.listingDetails.zillowMarketEstimates.zestimateRange?.low,
        zestimateRangeHigh: property.listingDetails.zillowMarketEstimates.zestimateRange?.high,
        zillowMonthlyPropertyTaxAmount: property.listingDetails.zillowMarketEstimates.zillowMonthlyPropertyTaxAmount,
        zillowMonthlyHomeInsuranceAmount: property.listingDetails.zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount,
        zillowMonthlyHOAFeesAmount: property.listingDetails.zillowMarketEstimates.zillowMonthlyHOAFeesAmount,
        description: property.listingDetails.propertyDetails.description,
    }));

    // Inside PropertiesList component

    // Assuming your ReusableTable component and TableColumn interface are set up to handle this
    return (
        <div>
            {isLoading ? (
                <p>Loading properties...</p>
            ) : (
                <>
                    <ReusableTable
                        columns={columns} // Filter columns based on showColumn
                        tableData={rows}
                        onRowClick={handleRowClick}
                    />
                    {selectedProperty && <PropertyDetailsModal
                        property={selectedProperty}
                        onClose={handleCloseModal}
                        columns={columns}
                    />}
                </>
            )}
        </div>
    );
};


export default PropertiesList;
