import React, { useState } from 'react';
import {
    HighYeildSavingsResponseDTO,
    HighYeildSavingsRequest,
} from '@realestatemanager/types';
import { BasicTable, TableComponent } from 'react-ui-library-ks-dev';
import { CreateHighYieldSavingsTable } from './Tables/HighYieldSavingsTable';
import { HighYeildSavingsCalcService } from '../../oldCode/api/highyieldsavingscalc/highyieldsavingscalcservice';
import HighYieldSavingsForm from './Forms/HighYieldSavingsForm';

// Interface to match the form component's data structure
interface HighYieldSavingsData {
    initialDeposit: number;
    annualInterestRate: number;
    years: number;
    monthlyDeposit: number;
}

const HighYieldSavings: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [metrics, setMetrics] = useState<HighYeildSavingsResponseDTO[]>([]);

    // Handle data from the form component
    const handleFormSubmit = async (formData: HighYieldSavingsData): Promise<boolean> => {
        const highYieldSavingsCalcService = new HighYeildSavingsCalcService();

        // Convert from form data to API request format
        const request: HighYeildSavingsRequest = {
            initialDeposit: formData.initialDeposit,
            annualInterestRate: formData.annualInterestRate,
            years: formData.years,
            monthlyDeposit: formData.monthlyDeposit
        };

        setIsLoading(true);
        try {
            const data = await highYieldSavingsCalcService.highYieldSavingsCalculator(request);
            setMetrics(data);
            console.log("Calculation result:", data);
            return true; // Success indicator
        } catch (error) {
            console.error('Failed to submit data.', error);
            return false; // Failure indicator
        } finally {
            setIsLoading(false);
        }
    };

    // Create table from metrics data
    const createTable = (data: HighYeildSavingsResponseDTO[]): BasicTable<HighYeildSavingsResponseDTO> => {
        return new CreateHighYieldSavingsTable().createDefaultTable(data);
    };

    return (
        <div>
            <h2>Investment Breakdown</h2>
            <HighYieldSavingsForm onSubmit={handleFormSubmit} />
            <br />
            <hr />
            <br />
            {isLoading ? (
                <p>Loading calculations...</p>
            ) : (
                <>
                    {metrics.length > 0 && (
                        <TableComponent
                            table={createTable(metrics)}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default HighYieldSavings;