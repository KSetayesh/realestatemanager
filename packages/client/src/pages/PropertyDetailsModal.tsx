import { ListingWithScenariosDTO } from "@realestatemanager/shared";
import '../styles/PropertyDetailsModal.css';

const PropertyDetailsModal: React.FC<{ property: ListingWithScenariosDTO | null; onClose: () => void }> = ({ property, onClose }) => {
    if (!property) return null; // Don't render the modal if there's no property selected

    // Function to stop propagation for modal content clicks
    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            {/* Add onClick event to stop propagation */}
            <div className="modal" onClick={stopPropagation}>
                <h2>Property Details</h2>
                {/* Display property details here. Adjust according to your data structure */}
                <p>
                    <span className="modal-label">Zillow URL:</span>
                    <a href={property.listingDetails.zillowURL} target="_blank" rel="noopener noreferrer">
                        View Listing
                    </a>
                </p>
                <p><span className="modal-label">Full Address:</span> {property.listingDetails.propertyDetails.address!.fullAddress}</p>
                <p><span className="modal-label">State:</span> {property.listingDetails.propertyDetails.address!.state}</p>
                <p><span className="modal-label">ZipCode:</span> {property.listingDetails.propertyDetails.address!.zipcode}</p>
                <p><span className="modal-label">City:</span> {property.listingDetails.propertyDetails.address!.city}</p>
                <p><span className="modal-label">County:</span> {property.listingDetails.propertyDetails.address!.county}</p>
                <p><span className="modal-label">Country:</span> {property.listingDetails.propertyDetails.address!.country}</p>
                <p><span className="modal-label">Street Address:</span> {property.listingDetails.propertyDetails.address!.streetAddress}</p>
                <p><span className="modal-label">Apartment Number:</span> {property.listingDetails.propertyDetails.address!.apartmentNumber}</p>
                <p><span className="modal-label">Number Of Days On Market:</span> {property.listingDetails.propertyDetails.numberOfDaysOnMarket}</p>
                <p><span className="modal-label">Elementary School Rating:</span> {property.listingDetails.propertyDetails.schoolRating!.elementarySchoolRating}</p>
                <p><span className="modal-label">Middle School Rating:</span> {property.listingDetails.propertyDetails.schoolRating!.middleSchoolRating}</p>
                <p><span className="modal-label">High School Rating:</span> {property.listingDetails.propertyDetails.schoolRating!.highSchoolRating}</p>
                <p><span className="modal-label">Number Of Bedrooms:</span> {property.listingDetails.propertyDetails.numberOfBedrooms}</p>
                <p><span className="modal-label">Number Of Full Bathrooms:</span> {property.listingDetails.propertyDetails.numberOfFullBathrooms}</p>
                <p><span className="modal-label">Number Of Half Bathrooms:</span> {property.listingDetails.propertyDetails.numberOfHalfBathrooms}</p>
                <p><span className="modal-label">Square Feet:</span> {property.listingDetails.propertyDetails.squareFeet}</p>
                <p><span className="modal-label">Acres:</span> {property.listingDetails.propertyDetails.acres}</p>
                <p><span className="modal-label">Year Built:</span> {property.listingDetails.propertyDetails.yearBuilt}</p>
                <p><span className="modal-label">Has Garage:</span> {property.listingDetails.propertyDetails.hasGarage}</p>
                <p><span className="modal-label">Has Pool:</span> {property.listingDetails.propertyDetails.hasPool}</p>
                <p><span className="modal-label">Has Basement:</span> {property.listingDetails.propertyDetails.hasBasement}</p>
                <p><span className="modal-label">Home Type:</span> {property.listingDetails.propertyDetails.homeType}</p>
                <p><span className="modal-label">Listing Price:</span> {property.listingDetails.listingPrice}</p>
                <p><span className="modal-label">Zestimate:</span> {property.listingDetails.zillowMarketEstimates.zestimate}</p>
                <p><span className="modal-label">Zillow Rent Estimate:</span> {property.listingDetails.zillowMarketEstimates.zillowRentEstimate}</p>
                <p><span className="modal-label">Zillow Rent Estimate:</span> {property.listingDetails.zillowMarketEstimates.zillowRentEstimate}</p>
                <p><span className="modal-label">Zillow Range Low:</span> {property.listingDetails.zillowMarketEstimates.zestimateRange?.low}</p>
                <p><span className="modal-label">Zillow Range High:</span> {property.listingDetails.zillowMarketEstimates.zestimateRange?.high}</p>
                <p><span className="modal-label">Zillow Monthly Property Tax Amount:</span> {property.listingDetails.zillowMarketEstimates.zillowMonthlyPropertyTaxAmount}</p>
                <p><span className="modal-label">Zillow Monthly Home Insurance Amount:</span> {property.listingDetails.zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount}</p>
                <p><span className="modal-label">Zillow Monthly HOA Fees Amount:</span> {property.listingDetails.zillowMarketEstimates.zillowMonthlyHOAFeesAmount}</p>
                <p><span className="modal-label">Description:</span> {property.listingDetails.propertyDetails.description}</p>
                {/* Close button */}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PropertyDetailsModal;
