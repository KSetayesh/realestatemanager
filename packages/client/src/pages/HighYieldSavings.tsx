import React, { useState } from 'react';
import { HighYieldSavingsCalcApi } from '../api/highyeildsavingscalcapi';
import { HighYeildSavingsResponseDTO, HighYeildSavingsRequest } from '@realestatemanager/shared';
import ReusableTable, { TableColumn, TableDataItem, TableRow } from '../components/ReusableTable';
import StandardForm, { FormProperty } from '../components/StandardForm';
import {
    HighYieldSavingsFormData,
    HighYieldSavingsFormDetails,
} from '../forms/HighYieldSavingsFormDetails';


const HighYieldSavings: React.FC = () => {

    const highYieldSavingsFormDetails: HighYieldSavingsFormDetails = new HighYieldSavingsFormDetails();

    const [formData, setFormData] = useState<HighYieldSavingsFormData>(highYieldSavingsFormDetails.getDefaultFormData());

    const [metrics, setMetrics] = useState<HighYeildSavingsResponseDTO[]>();

    const getCalculateRequest = (): HighYeildSavingsRequest => {
        return highYieldSavingsFormDetails.createRequest(formData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const highYieldSavingsCalcApi: HighYieldSavingsCalcApi = new HighYieldSavingsCalcApi();
        const data: HighYeildSavingsResponseDTO[] = await highYieldSavingsCalcApi.highYieldSavingsCalculator(getCalculateRequest());
        console.log("Calculation result:", data);
        setMetrics(data);
    };

    const formDetails: FormProperty[] = highYieldSavingsFormDetails.getFormDetails(formData);

    const columnsForMetrics: TableColumn[] = [
        {
            header: "Year",
            accessor: "year",
            isURL: false,
            showColumn: true,
            isDollarAmount: false,
            isSortable: false,
        },
        {
            header: "Month",
            accessor: "month",
            isURL: false,
            showColumn: true,
            isDollarAmount: false,
            isSortable: false,
        },
        {
            header: "Date",
            accessor: "date",
            isURL: false,
            showColumn: true,
            isDollarAmount: false,
            isSortable: false,
        },

        {
            header: "Start Principal",
            accessor: "startPrincipal",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false,
        },
        {
            header: "Start Balance",
            accessor: "startBalance",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false,
        },
        {
            header: "Interest",
            accessor: "interest",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false,
        },
        {
            header: "Accumulated Interest",
            accessor: "accumulatedInterest",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false,
        },
        {
            header: "End Balance",
            accessor: "endBalance",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false,
        },
        {
            header: "End Principal",
            accessor: "endPrincipal",
            isURL: false,
            showColumn: true,
            isDollarAmount: true,
            isSortable: false,
        },
    ];

    const createRowDataForMetrics = (highYeildSavingsData: HighYeildSavingsResponseDTO): TableRow => {
        return {
            year: highYeildSavingsData.year,
            month: highYeildSavingsData.month,
            date: highYeildSavingsData.date,
            startPrincipal: highYeildSavingsData.startPrincipal,
            startBalance: highYeildSavingsData.startBalance,
            interest: highYeildSavingsData.interest,
            accumulatedInterest: highYeildSavingsData.accumulatedInterest,
            endBalance: highYeildSavingsData.endBalance,
            endPrincipal: highYeildSavingsData.endPrincipal,
        };
    };

    const createTableDataForMetrics = (): TableDataItem<HighYeildSavingsResponseDTO>[] => {
        if (!metrics) {
            return [];
        }
        const highYeildSavings: HighYeildSavingsResponseDTO[] = metrics;
        return highYeildSavings.map(metrics => ({
            objectData: {
                key: metrics,
            },
            rowData: createRowDataForMetrics(metrics),
        }));
    };

    return (
        <div>
            <h2> Investment Breakdown </h2>
            {formData && <StandardForm
                formDetails={formDetails}
                handleSubmit={handleSubmit}
                setFormData={setFormData}
                buttonTitle='Calculate'
            />
            }
            <br />
            <hr />
            <br />
            <ReusableTable
                columns={columnsForMetrics} // Adjust based on your needs
                tableData={createTableDataForMetrics()}
                includeTableSeparator={true}
            />
        </div>
    );
};

export default HighYieldSavings;