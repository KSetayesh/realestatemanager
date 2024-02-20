import React, { useState, useEffect } from 'react';
import { ListingWithScenariosDTO } from '@realestatemanager/shared';
import PropertyDetailsModal from './PropertyDetailsModal';
import '../styles/PropertiesList.css';

const PropertiesList: React.FC = () => {
    const [properties, setProperties] = useState<ListingWithScenariosDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState<ListingWithScenariosDTO | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/calc')
            .then(response => response.json())
            .then((data: ListingWithScenariosDTO[]) => {
                setProperties(data);
                console.log(data);
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

    return (
        <div>
            <h2>Properties List</h2>
            <></>
            {isLoading ? (
                <p>Loading properties...</p>
            ) : (
                <>
                    <table className="properties-table">
                        <thead>
                            <tr>
                                <th>Home Type</th>
                                <th>Full Address</th>
                                <th>State</th>
                                <th>Zillow URL</th>
                                <th>Price</th>
                                <th>Rent Estimate</th>
                                <th>Initial Costs</th>
                                <th>Loan Amount</th>
                                <th>Down Payment Amount</th>
                                <th>Annual Interest Rate</th>
                                <th>ROI</th>
                                <th>Cap Rate</th>
                                <th>Mortgage</th>
                                <th>Monthly Cash Flow</th>
                                <th>Yearly Cash Flow</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((property, index) => (
                                <tr key={index} onClick={() => handleRowClick(property)} style={{ cursor: 'pointer' }}>
                                    <td>{property.listingDetails.propertyDetails.homeType}</td>
                                    <td>{property.listingDetails.propertyDetails.address!.fullAddress}</td>
                                    <td>{property.listingDetails.propertyDetails.address!.state}</td>
                                    <td>
                                        <a href={property.listingDetails.zillowURL} target="_blank" rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}>
                                            View Listing
                                        </a>
                                    </td>
                                    <td>{property.listingDetails.listingPrice}</td>
                                    <td>{property.listingDetails.zillowMarketEstimates.zillowRentEstimate}</td>
                                    <td>{property.metrics[0].initialCosts}</td>
                                    <td>{property.metrics[0].loanAmount}</td>
                                    <td>{property.metrics[0].downPaymentAmount}</td>
                                    <td>{property.metrics[0].investmentScenario.mortgageDetails.annualInterestRate}%</td>
                                    <td>{property.metrics[0].ROI}%</td>
                                    <td>{property.metrics[0].capRate}%</td>
                                    <td>{property.metrics[0].mortgage}</td>
                                    <td>{property.metrics[0].monthlyCashFlow}</td>
                                    <td>{property.metrics[0].yearlyCashFlow}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <PropertyDetailsModal property={selectedProperty} onClose={handleCloseModal} />
                </>
            )}
        </div>
    );
};

export default PropertiesList;
