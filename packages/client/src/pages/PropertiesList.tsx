//import { ListingInformationDTO } from '@realestatemanager/shared';
// import { useEffect, useState } from 'react';

const PropertiesList: React.FC = () => {
    // const [properties, setProperties] = useState<ListingInformationDTO[]>([]);
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     fetch('http://localhost:3000/calc')
    //         .then(response => response.json())
    //         .then((data: ListingInformationDTO[]) => { 
    //             setProperties(data);
    //             setIsLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching properties:', error);
    //             setIsLoading(false);
    //         });
    // }, []);

    // return (
    //     <div>
    //         <h2>Properties List</h2>
    //         {isLoading ? (
    //             <p>Loading properties...</p>
    //         ) : (
    //             <table>
    //                 <thead>
    //                     <tr>
    //                         <th>Full Address</th>
    //                         <th>State</th>
    //                         <th>Zillow URL</th>
    //                         <th>Price</th>
    //                         <th>Rent Estimate</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {properties.map((property: ListingInformationDTO, index) => (
    //                         <tr key={index}>
    //                             <td>{property.propertyInformation.address!.fullAddress}</td>
    //                             <td>{property.propertyInformation.address!.state}</td>
    //                             <td>
    //                                 <a href={property.zillowURL} target="_blank" rel="noopener noreferrer">
    //                                     View Listing
    //                                 </a>
    //                             </td>
    //                             <td>{property.listingPriceInformation.price}</td>
    //                             <td>{property.listingPriceInformation.rentEstimate}</td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         )}
    //     </div>
    // );

    return (<div><h1>Hi there</h1></div>);
};

export default PropertiesList;
