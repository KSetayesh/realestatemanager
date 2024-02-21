import { ListingWithScenariosDTO } from '@realestatemanager/shared';
import React from 'react';
import { useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const InvestmentBreakdown: React.FC = () => {
    // const location = useLocation();
    // const { propertyData } = location.state;
    const location = useLocation();
    const state = location.state as { data: ListingWithScenariosDTO }; // Type assertion here
    console.log("state is:", state);
    if (!state || !state.data) {
        // Handle the case where the state or property is not available
        return <div>Property data is missing</div>;
    }

    const { data } = state;

    // Use the property object as needed in your component
    return (
        <div>
            <br></br>
            <h1>Welcome to the Investment Breakdown Page</h1>
            <p>This is a simple home component.</p>
            <p>Listing Price: {data.listingDetails.listingPrice}</p>
            {/* <Link to="/propertyForm">Go to Property Form Page</Link>
            <Link to="/propertiesList">Go to Properties List Page</Link> */}
        </div>
    );
};



export default InvestmentBreakdown;


