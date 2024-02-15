import '../styles/PropertiesList.css';
import { ListingInformationDTO } from '@realestatemanager/shared';
import { useEffect, useState } from 'react';
import { HomeType, State } from '../constants/Constant';

const PropertiesList: React.FC = () => {
    const [properties, setProperties] = useState<ListingInformationDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/calc')
            .then(response => response.json())
            .then((data: ListingInformationDTO[]) => {
                setProperties(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching properties:', error);
                setIsLoading(false);
            });
    }, []);

    function getFullStateName(abbreviation: string | undefined): string {
        if (abbreviation && abbreviation in State) {
            return State[abbreviation as keyof typeof State];
        }
        return '';
    }

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
                        {properties.map((property: ListingInformationDTO, index) => (
                            <tr key={index}>
                                <td>{HomeType[property.propertyInformation.homeType as keyof typeof HomeType]}</td>
                                <td>{property.propertyInformation.address!.fullAddress}</td>
                                <td>{getFullStateName(property.propertyInformation.address!.state)}</td>
                                <td>
                                    <a href={property.zillowURL} target="_blank" rel="noopener noreferrer">
                                        View Listing
                                    </a>
                                </td>
                                <td>{property.listingPriceInformation.price}</td>
                                <td>{property.listingPriceInformation.rentEstimate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );


};

export default PropertiesList;
