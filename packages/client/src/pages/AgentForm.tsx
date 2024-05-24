import React, { useState } from 'react';
import { CreateAgentRequest } from '@realestatemanager/shared';
import { AgentType, Country, State } from '../constants/Constant';
import { AgentApi } from '../api/agentapi';
import StandardForm, { FormProperty } from '../components/StandardForm';
import { AgentFormData, AgentFormDetails } from '../forms/AgentFormDetails';

const AgentForm: React.FC = () => {

    const agentApi: AgentApi = new AgentApi();

    const agentFormDetails: AgentFormDetails = new AgentFormDetails();

    const [formData, setFormData] = useState<AgentFormData>(agentFormDetails.getDefaultFormData());

    const getAgentRequest = (): CreateAgentRequest => {
        return {
            firstName: formData.firstName,
            lastName: formData.lastName,
            website: formData.website ?? '',
            companyName: formData.companyName,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            state: formData.state as State,
            country: formData.country as Country,
            agentType: formData.agentType as AgentType,
        };
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const postSuccess: boolean = await agentApi.addNewAgent(getAgentRequest());
        if (postSuccess) {
            alert('Agent has been successfully added!');
            window.location.reload();
        }
        else {
            alert('Failed to submit data.');
        }
    };

    const formDetails: FormProperty[] = agentFormDetails.getFormDetails(formData);

    return (
        <div>
            <h2> Add New Agent </h2>
            {formData && (
                <StandardForm
                    formDetails={formDetails}
                    // handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    setFormData={setFormData}
                    buttonTitle='Submit'
                />
            )}
        </div>
    );

};


export default AgentForm;