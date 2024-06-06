import React, { useState } from 'react';
import { HighYieldSavingsCalcApi } from '../api/highyeildsavingscalcapi';
import { HighYeildSavingsResponseDTO, HighYeildSavingsRequest } from '@realestatemanager/shared';
import ReusableTable from '../components/ReusableTable';
import StandardForm, { FormProperty } from '../components/StandardForm';
import {
    HighYieldSavingsFormData,
    HighYieldSavingsFormDetails,
} from '../forms/HighYieldSavingsFormDetails';
import { HighYieldSavingsTable } from '../tables/HighYieldSavingsTable';

const HighYieldSavings: React.FC = () => {

    const highYieldSavingsFormDetails: HighYieldSavingsFormDetails = new HighYieldSavingsFormDetails();
    const highYieldSavingsTable: HighYieldSavingsTable = new HighYieldSavingsTable();

    const getDefaultFormData = (): HighYieldSavingsFormData => {
        return highYieldSavingsFormDetails.getDefaultFormData();
    }

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<HighYieldSavingsFormData>(getDefaultFormData());
    const [metrics, setMetrics] = useState<HighYeildSavingsResponseDTO[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const getCalculateRequest = (): HighYeildSavingsRequest => {
            return highYieldSavingsFormDetails.createRequest(formData);
        };
        const highYieldSavingsCalcApi: HighYieldSavingsCalcApi = new HighYieldSavingsCalcApi();

        setIsLoading(true);
        try {
            const data: HighYeildSavingsResponseDTO[] = await highYieldSavingsCalcApi.highYieldSavingsCalculator(getCalculateRequest());
            setMetrics(data);
            console.log("Calculation result:", data);
            // window.location.reload();
        } catch (error) {
            console.error('Failed to submit data.', error);
            alert('Failed to submit data.');
        } finally {
            setFormData(getDefaultFormData());
            setIsLoading(false);
        }
    };

    const getFormDetails = (): FormProperty[] => {
        return highYieldSavingsFormDetails.getFormDetails(formData);
    };

    return (
        <div>
            <h2> Investment Breakdown </h2>
            {formData && <StandardForm
                formDetails={getFormDetails()}
                handleSubmit={handleSubmit}
                setFormData={setFormData}
                buttonTitle='Calculate'
            />
            }
            <br />
            <hr />
            <br />
            {isLoading ? (
                <p>Loading properties...</p>
            ) : (
                <>
                    <ReusableTable
                        data={metrics}
                        tableHandler={highYieldSavingsTable}
                        // tableType={DefaultTableType.DEFAULT}
                        // setTableType={undefined}
                        onRowClick={undefined}
                        tableSeperatorDetails={undefined}
                        exportIntoCSV={{
                            buttonTitle: 'Export CSV'
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default HighYieldSavings;