import React, { useState } from 'react';
import { AgentFormDetails, AgentFormData } from '../forms/AgentFormDetails';
import StandardForm, { FormPropertyMap } from '../components/StandardForm';

const AgentForm: React.FC = () => {
    const agentFormDetails: AgentFormDetails = new AgentFormDetails();

    const getFormDetails = (): FormPropertyMap<AgentFormData> => {
        return agentFormDetails.getFormDetails();
    };

    const [formData, setFormData] = useState<AgentFormData>(agentFormDetails.getDefaultFormData());

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div>
            <h2> Add New Agent </h2>
            {formData && (
                <StandardForm<AgentFormData>
                    formPropertyMap={getFormDetails()}
                    handleSubmit={handleSubmit}
                    setFormData={setFormData}
                    buttonTitle="Submit"
                />
            )}
        </div>
    );
};

export default AgentForm;
