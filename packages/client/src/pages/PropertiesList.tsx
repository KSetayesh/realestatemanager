import { ListingWithScenariosDTO } from '@realestatemanager/shared';
import '../styles/PropertiesList.css';
import { useEffect, useState } from 'react';

const PropertiesList: React.FC = () => {
    const [properties, setProperties] = useState<ListingWithScenariosDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/calc')
            .then(response => response.json())
            .then((data: ListingWithScenariosDTO[]) => {
                console.log("data:", data);
                setProperties(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching properties:', error);
                setIsLoading(false);
            });
    }, []);


    return (
        <div>
            <h2>Properties List</h2>
            {isLoading ? (
                <p>Loading properties...</p>
            ) : (
                <table className="properties-table">
                    <thead>
                        <tr>
                            <th>Home Type</th>
                            <th>Full Address</th>
                            <th>State</th>
                            <th>Zillow URL</th>
                            <th>Price</th>
                            <th>Rent Estimate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property: ListingWithScenariosDTO, index) => (
                            <tr key={index}>
                                <td>{property.listingDetails.propertyDetails.homeType}</td>
                                <td>{property.listingDetails.propertyDetails.address!.fullAddress}</td>
                                <td>{property.listingDetails.propertyDetails.address!.state}</td>
                                <td>
                                    <a href={property.listingDetails.zillowURL} target="_blank" rel="noopener noreferrer">
                                        View Listing
                                    </a>
                                </td>
                                <td>{property.listingDetails.listingPrice}</td>
                                <td>{property.listingDetails.zillowMarketEstimates?.zillowRentEstimate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );


};

export default PropertiesList;

