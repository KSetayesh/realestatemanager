import React, { useState } from 'react';
import { AgentFormData, CreateAgentRequest } from '@realestatemanager/types';
import StandardForm, { FormProperty } from '../components/StandardForm';
import { AgentFormDetails } from '../forms/AgentFormDetails';
import { AgentService } from '../api/agent/agentservice';

const AgentForm: React.FC = () => {

    const agentservice: AgentService = new AgentService();

    const agentFormDetails: AgentFormDetails = new AgentFormDetails();

    const [formData, setFormData] = useState<AgentFormData>(agentFormDetails.getDefaultFormData());

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const getAgentRequest = (): CreateAgentRequest => {
            return agentFormDetails.createRequest(formData);
        };

        const postSuccess: boolean = await agentservice.addNewAgent(getAgentRequest());

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