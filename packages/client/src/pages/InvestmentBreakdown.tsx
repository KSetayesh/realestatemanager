import { ListingWithScenariosDTO } from '@realestatemanager/shared';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReusableTable, { TableColumn, TableDataItem, TableRow } from '../components/ReusableTable';
import PropertyDetailsModal from './PropertyDetailsModal';

const InvestmentBreakdown: React.FC = () => {
    const [properties, setProperties] = useState<ListingWithScenariosDTO[]>([]);
    const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosDTO | null>(null);
    const location = useLocation();
    const state = location.state as { data: ListingWithScenariosDTO }; // Type assertion here
    if (!state || !state.data) {
        // Handle the case where the state or property is not available
        return <div>Property data is missing</div>;
    }

    useEffect(() => {
        const { data } = state;
        setProperties([data]);
    }, []);

    const handleRowClick = (property: ListingWithScenariosDTO) => {
        setSelectedProperty(property);
    };

    const handleCloseModal = () => {
        setSelectedProperty(null);
    };

    const booleanToYesNo = (value: boolean | undefined) => value ? 'Yes' : 'No';

    // Function to render the cell data based on its type
    const renderCellData = (cellData: any): string => {
        if (typeof cellData === 'boolean') {
            return booleanToYesNo(cellData);
        } else if (typeof cellData === 'string' || typeof cellData === 'number') {
            return cellData.toString();
        } else if (Array.isArray(cellData)) {
            return cellData.join(', '); // Example: array to comma-separated string
        } else if (typeof cellData === 'object' && cellData !== null) {
            return JSON.stringify(cellData); // Or extract specific properties to render
        }
        return ''; // Fallback for undefined or null
    };

    const createRowData = (property: ListingWithScenariosDTO): TableRow => {
        return {
            homeType: renderCellData(property.listingDetails.propertyDetails.homeType!),
            fullAddress: renderCellData(property.listingDetails.propertyDetails.address!.fullAddress),
            state: renderCellData(property.listingDetails.propertyDetails.address!.state),
            zipcode: renderCellData(property.listingDetails.propertyDetails.address!.zipcode),
            zillowURL: renderCellData(property.listingDetails.zillowURL),
            price: renderCellData(property.listingDetails.listingPrice),
            rentEstimate: renderCellData(property.listingDetails.zillowMarketEstimates.zillowRentEstimate!),
            initialCosts: renderCellData(property.metrics[0].initialCosts),
            loanAmount: renderCellData(property.metrics[0].loanAmount),
            downPaymentAmount: renderCellData(property.metrics[0].downPaymentAmount),
            annualInterestRate: renderCellData(property.metrics[0].investmentScenario.mortgageDetails.annualInterestRate),
            ROI: renderCellData(property.metrics[0].ROI),
            capRate: renderCellData(property.metrics[0].capRate),
            mortgage: renderCellData(property.metrics[0].mortgage),
            monthlyCashFlow: renderCellData(property.metrics[0].monthlyCashFlow),
            yearlyCashFlow: renderCellData(property.metrics[0].yearlyCashFlow),
            city: renderCellData(property.listingDetails.propertyDetails.address!.city),
            county: renderCellData(property.listingDetails.propertyDetails.address!.county),
            country: renderCellData(property.listingDetails.propertyDetails.address!.country),
            streetAddress: renderCellData(property.listingDetails.propertyDetails.address!.streetAddress),
            apartmentNumber: renderCellData(property.listingDetails.propertyDetails.address!.apartmentNumber),
            numberOfDaysOnMarket: renderCellData(property.listingDetails.propertyDetails.numberOfDaysOnMarket!),
            elementarySchoolRating: renderCellData(property.listingDetails.propertyDetails.schoolRating!.elementarySchoolRating!),
            middleSchoolRating: renderCellData(property.listingDetails.propertyDetails.schoolRating!.middleSchoolRating!),
            highSchoolRating: renderCellData(property.listingDetails.propertyDetails.schoolRating!.highSchoolRating!),
            numberOfBedrooms: renderCellData(property.listingDetails.propertyDetails.numberOfBedrooms!),
            numberOfFullBathrooms: renderCellData(property.listingDetails.propertyDetails.numberOfFullBathrooms!),
            numberOfHalfBathrooms: renderCellData(property.listingDetails.propertyDetails.numberOfHalfBathrooms!),
            squareFeet: renderCellData(property.listingDetails.propertyDetails.squareFeet!),
            acres: renderCellData(property.listingDetails.propertyDetails.acres!),
            yearBuilt: renderCellData(property.listingDetails.propertyDetails.yearBuilt!),
            hasGarage: renderCellData(property.listingDetails.propertyDetails.hasGarage!),
            hasPool: renderCellData(property.listingDetails.propertyDetails.hasPool!),
            hasBasement: renderCellData(property.listingDetails.propertyDetails.hasBasement!),
            listingPrice: renderCellData(property.listingDetails.listingPrice),
            zestimate: renderCellData(property.listingDetails.zillowMarketEstimates.zestimate!),
            zillowRentEstimate: renderCellData(property.listingDetails.zillowMarketEstimates.zillowRentEstimate!),
            zestimateRangeLow: renderCellData(property.listingDetails.zillowMarketEstimates.zestimateRange!.low!),
            zestimateRangeHigh: renderCellData(property.listingDetails.zillowMarketEstimates.zestimateRange!.high!),
            zillowMonthlyPropertyTaxAmount: renderCellData(property.listingDetails.zillowMarketEstimates.zillowMonthlyPropertyTaxAmount!),
            zillowMonthlyHomeInsuranceAmount: renderCellData(property.listingDetails.zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount!),
            zillowMonthlyHOAFeesAmount: renderCellData(property.listingDetails.zillowMarketEstimates.zillowMonthlyHOAFeesAmount!),
            description: renderCellData(property.listingDetails.propertyDetails.description),
        }
    }

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

    // const tableData: { [key: string]: string }[] = properties.map(property => ({
    const tableData: TableDataItem<ListingWithScenariosDTO>[] = properties.map(property => ({
        objectData: {
            key: property,
        },
        rowData: createRowData(property),
    }
    ));

    return (
        <div>
            <h2> Investment Breakdown </h2>
            <ReusableTable
                columns={columns} // Filter columns based on showColumn
                tableData={tableData}
                onRowClick={handleRowClick}
            />
            {selectedProperty && <PropertyDetailsModal
                property={selectedProperty}
                rowData={createRowData(selectedProperty)}
                onClose={handleCloseModal}
                columns={columns}
            />}
            <br></br>
            <ReusableTable
                columns={columns} // Filter columns based on showColumn
                tableData={tableData}
            />
        </div>
    );


};



export default InvestmentBreakdown;


