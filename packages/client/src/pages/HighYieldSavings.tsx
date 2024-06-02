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
import { DefaultTableType } from '../constants/Constant';

const HighYieldSavings: React.FC = () => {

    const highYieldSavingsFormDetails: HighYieldSavingsFormDetails = new HighYieldSavingsFormDetails();
    const highYieldSavingsTable: HighYieldSavingsTable = new HighYieldSavingsTable();

    const [formData, setFormData] = useState<HighYieldSavingsFormData>(highYieldSavingsFormDetails.getDefaultFormData());

    const [metrics, setMetrics] = useState<HighYeildSavingsResponseDTO[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const getCalculateRequest = (): HighYeildSavingsRequest => {
            return highYieldSavingsFormDetails.createRequest(formData);
        };
        const highYieldSavingsCalcApi: HighYieldSavingsCalcApi = new HighYieldSavingsCalcApi();
        const data: HighYeildSavingsResponseDTO[] = await highYieldSavingsCalcApi.highYieldSavingsCalculator(getCalculateRequest());
        console.log("Calculation result:", data);
        setMetrics(data);
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
            <ReusableTable
                data={metrics}
                tableHandler={highYieldSavingsTable}
                tableType={DefaultTableType.DEFAULT}
                onRowClick={undefined}
                includeTableSeparator={true}
                canExportIntoCSV={true}
            />
        </div>
    );
};

export default HighYieldSavings;