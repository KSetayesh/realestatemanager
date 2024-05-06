import { RealEstateCalcApi } from "../api/realestatecalcapi";

const CollectProperties: React.FC = () => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const dataToSubmit: ListingDetailsDTO = getRequestData();

        const realEstateCalcApi: RealEstateCalcApi = new RealEstateCalcApi();
        const postSuccess = await realEstateCalcApi.addNewPropertyWithRentCastAPI();
        if (postSuccess) {
            alert('Data submitted successfully!');
            window.location.reload();
        }
        else {
            alert('Failed to submit data.');
        }
    };

    return (
        <div className="form-container">
            <h2>Property Listing Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="submit-button-container">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CollectProperties;