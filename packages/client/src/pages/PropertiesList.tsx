// import '../styles/PropertiesList.css';
// // import { ListingDTO } from '@realestatemanager/shared';
// import { useEffect, useState } from 'react';
// import { HomeType, State } from '../constants/Constant';

// const PropertiesList: React.FC = () => {
//     const [properties, setProperties] = useState<ListingDTO[]>([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         fetch('http://localhost:3000/calc')
//             .then(response => response.json())
//             .then((data: ListingDTO[]) => {
//                 setProperties(data);
//                 setIsLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching properties:', error);
//                 setIsLoading(false);
//             });
//     }, []);

//     function getFullStateName(abbreviation: string | undefined): string {
//         if (abbreviation && abbreviation in State) {
//             return State[abbreviation as keyof typeof State];
//         }
//         return '';
//     }

//     return (
//         <div>
//             <h2>Properties List</h2>
//             {isLoading ? (
//                 <p>Loading properties...</p>
//             ) : (
//                 <table className="properties-table">
//                     <thead>
//                         <tr>
//                             <th>Home Type</th>
//                             <th>Full Address</th>
//                             <th>State</th>
//                             <th>Zillow URL</th>
//                             <th>Price</th>
//                             <th>Rent Estimate</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {properties.map((property: ListingDTO, index) => (
//                             <tr key={index}>
//                                 <td>{HomeType[property.listingInformation.propertyInformation.homeType as keyof typeof HomeType]}</td>
//                                 <td>{property.listingInformation.propertyInformation.address!.fullAddress}</td>
//                                 <td>{getFullStateName(property.listingInformation.propertyInformation.address!.state)}</td>
//                                 <td>
//                                     <a href={property.listingInformation.zillowURL} target="_blank" rel="noopener noreferrer">
//                                         View Listing
//                                     </a>
//                                 </td>
//                                 <td>{property.listingInformation.listingPriceInformation.price}</td>
//                                 <td>{property.listingInformation.listingPriceInformation.rentEstimate}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );


// };

// export default PropertiesList;

const PropertiesList: React.FC = () => {
    return (
        <div><h2>On Properties List Page</h2></div>
    );
};

export default PropertiesList;