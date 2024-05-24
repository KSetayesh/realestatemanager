import React, { useState } from 'react';
import { HighYieldSavingsCalcApi } from '../api/highyeildsavingscalcapi';
import { HighYeildSavingsResponseDTO, HighYeildSavingsRequest } from '@realestatemanager/shared';
import { InputType } from '../constants/Constant';
import ReusableTable, { TableColumn, TableDataItem, TableRow } from '../components/ReusableTable';
import StandardForm, { FormProperty } from '../components/StandardForm';

type HighYieldSavingsFormData = {
    initialDeposit: number;
    annualInterestRate: number;
    years: number;
    monthlyDeposit?: number;
};

const HighYieldSavings: React.FC = () => {

    // Create a state to store the form data.
    const getHighYieldSavingsFormData = (): HighYieldSavingsFormData => {
        return {
            initialDeposit: 1000,
            annualInterestRate: 5,
            years: 30,
            monthlyDeposit: 0,
        };
    };

    const [formData, setFormData] = useState<HighYieldSavingsFormData>(getHighYieldSavingsFormData());

    const [metrics, setMetrics] = useState<HighYeildSavingsResponseDTO[]>();

    const getCalculateRequest = (): HighYeildSavingsRequest => {
        return {
            initialDeposit: formData.initialDeposit,
            annualInterestRate: formData.annualInterestRate,
            years: formData.years,
            monthlyDeposit: formData.monthlyDeposit,
        };
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const highYieldSavingsCalcApi: HighYieldSavingsCalcApi = new HighYieldSavingsCalcApi();
        const data: HighYeildSavingsResponseDTO[] = await highYieldSavingsCalcApi.highYieldSavingsCalculator(getCalculateRequest());
        console.log("Calculation result:", data);
        setMetrics(data);
    };

    const formDetails: FormProperty[] = [
        {
            title: 'Initial Deposit',
            name: 'initialDeposit',
            value: formData.initialDeposit,
            type: InputType.NUMBER,
        },
        {
            title: 'Annual Interest Rate (%)',
            name: 'annualInterestRate',
            value: formData.annualInterestRate,
            type: InputType.NUMBER,
        },
        {
            title: 'Years',
            name: 'years',
            value: formData.years,
            type: InputType.NUMBER,
        },
        {
            title: 'Monthly Deposit',
            name: 'monthlyDeposit',
            value: formData.monthlyDeposit ?? 0,
            type: InputType.NUMBER,
        },
    ];

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