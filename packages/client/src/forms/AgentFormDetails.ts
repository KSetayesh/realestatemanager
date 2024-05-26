import { CreateAgentRequest } from "@realestatemanager/shared";
import { FormProperty } from "../components/StandardForm";
import { AgentType, Country, InputType, State } from "../constants/Constant";
import { FormInterface } from "./FormInterface";
import { BasicStringForm, CountryForm, StateForm } from "./ReusableFormFields";

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
            BasicStringForm('First Name', 'firstName', formData.firstName),
            BasicStringForm('Last Name', 'lastName', formData.lastName),
            BasicStringForm('Website', 'website', formData.website),
            BasicStringForm('Company Name', 'companyName', formData.companyName),
            BasicStringForm('Phone Number', 'phoneNumber', formData.phoneNumber),
            BasicStringForm('Email', 'email', formData.email),
            CountryForm(formData.country),
            StateForm(formData.state),
            {
                title: 'Agent Type',
                values: [
                    {
                        name: 'agentType',
                        type: InputType.SELECT,
                        value: formData.agentType,
                        options: Object.values(AgentType).map((enumValue => {
                            return {
                                value: enumValue,
                                label: enumValue,
                            };
                        })),
                    },
                ],
            },
        ];
    }

}

