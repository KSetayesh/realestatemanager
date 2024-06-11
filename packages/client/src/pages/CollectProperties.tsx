import React, { useEffect, useState } from 'react';
import { CreateRentCastApiRequest, RentCastDetailsResponseDTO } from '@realestatemanager/shared';
import { RentCastApi } from '../api/rentcastapi';
import { CollectPropertiesFormDetails } from '../forms/CollectPropertiesFormDetails';
import StandardForm, { FormProperty } from '../components/StandardForm';
import ReusableTable from '../components/ReusableTable';
import { RentCastDetailsTable } from '../tables/RentCastDetailsTable';

const CollectProperties: React.FC = () => {
    const rentCastApi: RentCastApi = new RentCastApi();
    const collectPropertiesFormDetails: CollectPropertiesFormDetails = new CollectPropertiesFormDetails();
    const rentCastTableHandler: RentCastDetailsTable = new RentCastDetailsTable();

    const [rentCastDetails, setRentCastDetails] = useState<RentCastDetailsResponseDTO[]>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const rentCastDetails: RentCastDetailsResponseDTO[] = await rentCastApi.getRentCastApiDetails();
                // For now just show the first rentCastDetails in the list
                setRentCastDetails(rentCastDetails);
                console.log("Fetched data:", rentCastDetails);
            } catch (error) {
                // Error handling if fetchProperties fails
                console.error('Failed to fetch rentCastApi details:', error);
            } finally {
                setIsLoading(false); // Ensure loading state is updated regardless of success or failure
            }
        })();
    }, []); // Empty dependency array means this effect runs once on mount

    const [formData, setFormData] = useState(collectPropertiesFormDetails.getDefaultFormData()); //useState(initialFormState);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dataToSubmit: CreateRentCastApiRequest = getRequestData();
        console.log('dataToSubmit:', dataToSubmit);

        const postSuccess = await rentCastApi.addNewPropertyWithRentCastAPI(dataToSubmit);
        if (postSuccess) {
            alert('Data submitted successfully!');
            window.location.reload();
        }
        else {
            alert('Failed to submit data.');
        }
    };

    const getRequestData = (): CreateRentCastApiRequest => {
        return collectPropertiesFormDetails.createRequest(formData);
    };

    const getFormDetails = (): FormProperty[] => {
        return collectPropertiesFormDetails.getFormDetails(formData);
    };

    const buttonDisableLogic = (): boolean => {
        if (!rentCastDetails) {
            return true;
        }
        for (const rentCastDetail of rentCastDetails) {
            if (rentCastDetail?.canMakeApiCalls) {
                return false;
            }
        }
        return true;
    };

    // Content based on loading state
    const getPageContent = () => {
        let content;
        if (isLoading) {
            content = <p>Loading Rent Cast Api Details...</p>;
        } else {
            content = (
                <>
                    <div>
                        <hr></hr>
                        {rentCastDetails && <ReusableTable
                            data={rentCastDetails}
                            tableHandler={rentCastTableHandler}
                        />
                        }
                        <br />
                        <hr></hr>
                        <br />

                        {formData && <StandardForm
                            formDetails={getFormDetails()}
                            handleSubmit={handleSubmit}
                            setFormData={setFormData}
                            buttonTitle='Submit'
                            columnsPerRow={3}
                            buttonDisableLogic={buttonDisableLogic}
                        />}
                    </div>
                </>
            );
        }

        return content;
    };

    return (
        <div className="container">
            <h2>Collect Properties Request Form</h2>
            {getPageContent()}
        </div>
    );

};

export default CollectProperties;
