import React, { useState } from 'react';
import { AgentsDTO } from '@realestatemanager/shared';
import CalculateForm, { FormProperty } from '../components/CalculateForm';
import { AgentType, Country, InputType, State } from '../constants/Constant';
import { AgentApi } from '../api/agentapi';

type AgentFormData = {
    firstName: string;
    lastName: string;
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

    const getAgentRequest = (): AgentsDTO => {
        return {
            firstName: formData.firstName,
            lastName: formData.lastName,
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


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        if (InputType.RADIO === type) {
            // Radio buttons have names like "{propertyName}_radio"
            // Extract the propertyName to update the corresponding state 

            const propertyName = name.replace("_radio", "");
            setFormData((prevFormData: AgentFormData) => ({
                ...prevFormData,
                [propertyName]: value,
            }));
        } else {
            // For number and select inputs, simply update based on name and value
            setFormData((prevFormData: AgentFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const formDetails: FormProperty[] = [
        {
            title: 'First Name',
            name: 'firstName',
            value: formData.firstName,
            type: InputType.STRING,
        },
        {
            title: 'Last Name',
            name: 'lastName',
            value: formData.lastName,
            type: InputType.STRING,
        },
        {
            title: 'Company Name',
            name: 'companyName',
            value: formData.companyName,
            type: InputType.STRING,
        },
        {
            title: 'Phone Number',
            name: 'phoneNumber',
            value: formData.phoneNumber,
            type: InputType.STRING,
        },
        {
            title: 'Email',
            name: 'email',
            value: formData.email,
            type: InputType.STRING,
        },
        {
            title: 'Country',
            name: 'country',
            value: formData.country,
            type: InputType.SELECT,
            options: Object.values(Country).map((enumValue => {
                return {
                    value: enumValue,
                    label: enumValue,
                };
            })),
        },
        {
            title: 'State',
            name: 'state',
            value: formData.state,
            type: InputType.SELECT,
            options: Object.values(State).map((enumValue => {
                return {
                    value: enumValue,
                    label: enumValue,
                };
            })),
        },
        {
            title: 'Agent Type',
            name: 'agentType',
            value: formData.agentType,
            type: InputType.SELECT,
            options: Object.values(AgentType).map((enumValue => {
                return {
                    value: enumValue,
                    label: enumValue,
                };
            })),
        },
    ];

    return (
        <div>
            <h2> Add New Agent </h2>
            {formData && (
                <CalculateForm
                    formDetails={formDetails}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    buttonTitle='Submit'
                />
            )}
        </div>
    );

};


export default AgentForm;