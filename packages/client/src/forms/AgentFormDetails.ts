import { CreateAgentRequest } from "@realestatemanager/shared";
import { FormProperty } from "../components/StandardForm";
import { AgentType, Country, InputType, State } from "../constants/Constant";
import { FormInterface } from "./FormInterface";

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

export class AgentFormDetails implements FormInterface<AgentFormData, CreateAgentRequest> {

    createRequest(formData: AgentFormData): CreateAgentRequest {
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
    }

    // Create a state to store the form data.
    getDefaultFormData(): AgentFormData {
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
    }

    getFormDetails(formData: AgentFormData): FormProperty[] {
        return [
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
                title: 'Website',
                name: 'website',
                value: formData.website!,
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
    }

}

