import React, { useState } from 'react';
import {
    HighYeildSavingsResponseDTO,
    HighYeildSavingsRequest,
    HighYieldSavingsFormData
} from '@realestatemanager/types';
import ReusableTable from '../../oldCode/components/ReusableTable';
import StandardForm, { FormProperty } from '../../oldCode/components/StandardForm';
import {
    HighYieldSavingsFormDetails,
} from '../../oldCode/forms/HighYieldSavingsFormDetails';
import { HighYieldSavingsTable } from '../../oldCode/newtabledata/tabledata/HighYieldSavingsTable';
import { HighYeildSavingsCalcService } from '../../oldCode/api/highyieldsavingscalc/highyieldsavingscalcservice';
import { BasicTable, TableComponent } from 'react-ui-library-ks-dev';
import { CreateHighYieldSavingsTable } from './HighYieldSavingsTable';
// import { TableComponent } from 'react-ui-library-ks-dev';

// import { HighYieldSavingsTable } from '../tables/HighYieldSavingsTable';

const HighYieldSavings: React.FC = () => {

    const highYieldSavingsFormDetails: HighYieldSavingsFormDetails = new HighYieldSavingsFormDetails();
    const highYieldSavingsTable: HighYieldSavingsTable = new HighYieldSavingsTable();

    const getDefaultFormData = (): HighYieldSavingsFormData => {
        return highYieldSavingsFormDetails.getDefaultFormData();
    };

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<HighYieldSavingsFormData>(getDefaultFormData());
    const [metrics, setMetrics] = useState<HighYeildSavingsResponseDTO[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const getCalculateRequest = (): HighYeildSavingsRequest => {
            return highYieldSavingsFormDetails.createRequest(formData);
        };
        const highYieldSavingsCalcService: HighYeildSavingsCalcService = new HighYeildSavingsCalcService();

        setIsLoading(true);
        try {
            const data: HighYeildSavingsResponseDTO[] = await highYieldSavingsCalcService.highYieldSavingsCalculator(
                getCalculateRequest()
            );

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

    const createTable = (data: HighYeildSavingsResponseDTO[]): BasicTable<HighYeildSavingsResponseDTO> => {
        return new CreateHighYieldSavingsTable().createDefaultTable(data);
    }

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
                    <TableComponent
                        table={createTable(metrics)}
                    />
                    <ReusableTable
                        data={metrics}
                        tableHandler={highYieldSavingsTable}
                        onRowClick={undefined}
                        tableSeperatorDetails={undefined}
                    // exportIntoCSV={{
                    //     buttonTitle: 'Export CSV'
                    // }}
                    />
                </>
            )}
        </div>
    );
};

export default HighYieldSavings;