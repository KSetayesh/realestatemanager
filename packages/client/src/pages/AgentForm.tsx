import React, { useState } from 'react';
import { CreateAgentRequest } from '@realestatemanager/shared';
import { AgentApi } from '../api/agentapi';
import StandardForm, { FormProperty } from '../components/StandardForm';
import { AgentFormData, AgentFormDetails } from '../forms/AgentFormDetails';

const AgentForm: React.FC = () => {

    const agentApi: AgentApi = new AgentApi();

    const agentFormDetails: AgentFormDetails = new AgentFormDetails();

    const [formData, setFormData] = useState<AgentFormData>(agentFormDetails.getDefaultFormData());

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const getAgentRequest = (): CreateAgentRequest => {
            return agentFormDetails.createRequest(formData);
        };

        const postSuccess: boolean = await agentApi.addNewAgent(getAgentRequest());

        if (postSuccess) {
            alert('Agent has been successfully added!');
            window.location.reload();
        }
        else {
            alert('Failed to submit data.');
        }
    };

    const getFormDetails = (): FormProperty[] => {
        return agentFormDetails.getFormDetails(formData);
    };

    return (
        <div>
            <h2> Add New Agent </h2>
            {formData && (
                <StandardForm
                    formDetails={getFormDetails()}
                    handleSubmit={handleSubmit}
                    setFormData={setFormData}
                    buttonTitle='Submit'
                />
            )}
        </div>
    );

};

export default AgentForm;