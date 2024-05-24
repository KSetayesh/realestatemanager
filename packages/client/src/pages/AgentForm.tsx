import React, { useState } from 'react';
import { CreateAgentRequest } from '@realestatemanager/shared';
import { AgentType, Country, State } from '../constants/Constant';
import { AgentApi } from '../api/agentapi';
import StandardForm, { FormProperty } from '../components/StandardForm';
import { getAgentFormDetails } from '../constants/FormFields';

export type AgentFormData = {
    firstName: string;
    lastName: string;
    website?: string;
    companyName: string,
    phoneNumber: string;
    email: string;
    country: string;
    state: string;
    agentType: string;
};

const AgentForm: React.FC = () => {

    const agentApi: AgentApi = new AgentApi();

    // Create a state to store the form data.
    const getAgentFormData = (): AgentFormData => {
        return {
            firstName: '',
            lastName: '',
            companyName: '',
            phoneNumber: '',
            email: '',
            country: Country.UnitedStates,
            state: State.AL,
            agentType: AgentType.REAL_ESTATE_AGENT,
        };
    };

    const [formData, setFormData] = useState<AgentFormData>(getAgentFormData());

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

    const formDetails: FormProperty[] = getAgentFormDetails(formData);

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