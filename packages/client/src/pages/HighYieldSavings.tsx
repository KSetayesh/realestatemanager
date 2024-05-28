import React, { useState } from 'react';
import ReusableTable, { TableColumn } from '../components/ReusableTable';
import StandardForm, { FormPropertyMap } from '../components/StandardForm';
import {
    HighYieldSavingsFormData,
    HighYieldSavingsFormDetails,
} from '../forms/HighYieldSavingsFormDetails';
import { HighYieldSavingsTable } from '../tables/HighYieldSavingsTable';
import { DefaultTableType } from './AgentsList';


const HighYieldSavings: React.FC = () => {

    const highYieldSavingsFormDetails: HighYieldSavingsFormDetails = new HighYieldSavingsFormDetails();
    const highYieldSavingsTable: HighYieldSavingsTable = new HighYieldSavingsTable();

    const getFormDetails = (): FormPropertyMap<HighYieldSavingsFormData> => {
        return highYieldSavingsFormDetails.getFormDetails();
    };

    const [formData, setFormData] = useState<HighYieldSavingsFormData>(getFormDetails());

    // const [metrics, setMetrics] = useState<HighYeildSavingsResponseDTO[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const getCalculateRequest = (): HighYeildSavingsRequest => {
        //     return highYieldSavingsFormDetails.createRequest(formData);
        // };
        // const highYieldSavingsCalcApi: HighYieldSavingsCalcApi = new HighYieldSavingsCalcApi();
        // const data: HighYeildSavingsResponseDTO[] = await highYieldSavingsCalcApi.highYieldSavingsCalculator(getCalculateRequest());
        // console.log("Calculation result:", data);
        // setMetrics(data);
    };

    // const getTableData = (): TableDataItem<HighYeildSavingsResponseDTO>[] => {
    //     return highYieldSavingsTable.getTableData(metrics, DefaultTableType.DEFAULT);
    // };

    const getTableColumns = (): TableColumn[] => {
        return highYieldSavingsTable.getTablesConfig()[DefaultTableType.DEFAULT].columns;
    };

    return (
        <div>
            <h2> Investment Breakdown </h2>
            {formData && <StandardForm<HighYieldSavingsFormData>
                formPropertyMap={getFormDetails()}
                handleSubmit={handleSubmit}
                setFormData={setFormData}
                buttonTitle='Calculate'
            />
            }
            <br />
            <hr />
            <br />
            <ReusableTable
                columns={getTableColumns()} // Adjust based on your needs
                tableData={[]} //getTableData()}
                includeTableSeparator={true}
            />
        </div>
    );
};

export default HighYieldSavings;