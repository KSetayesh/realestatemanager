import {
    AddAgentTitlesAndLabelsGetter,
    AgentFormData,
    CreateAgentRequest
} from "@realestatemanager/shared";
import { FormProperty } from "../components/StandardForm";
import { AgentType, Country, InputType, State } from "../constants/Constant";
import { FormInterface } from "./FormInterface";
import {
    BasicStringForm,
    CountryForm,
    GetOptionsForFormProperty,
    StateForm
} from "./ReusableFormFields";

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
            website: '',
            companyName: '',
            phoneNumber: '',
            email: '',
            country: Country.UnitedStates,
            state: State.AL,
            agentType: AgentType.REAL_ESTATE_AGENT,
        };
    }

    getFormDetails(formData: AgentFormData): FormProperty[] {
        const getterInstance: AddAgentTitlesAndLabelsGetter = new AddAgentTitlesAndLabelsGetter();
        return [
            BasicStringForm(
                getterInstance.firstNameTitle,
                getterInstance.firstNameName,
                formData.firstName
            ),
            BasicStringForm(
                getterInstance.lastNameTitle,
                getterInstance.lastNameName,
                formData.lastName
            ),
            BasicStringForm(
                getterInstance.websiteTitle,
                getterInstance.websiteName,
                formData.website
            ),
            BasicStringForm(
                getterInstance.companyNameTitle,
                getterInstance.companyNameName,
                formData.companyName
            ),
            BasicStringForm(
                getterInstance.phoneNumberTitle,
                getterInstance.phoneNumberName,
                formData.phoneNumber
            ),
            BasicStringForm(
                getterInstance.emailTitle,
                getterInstance.emailName,
                formData.email
            ),
            CountryForm(    // Update to pass in data
                formData.country
            ),
            StateForm(      // Update to pass in data
                formData.state
            ),
            {
                title: getterInstance.agentTypeTitle,
                values: [
                    {
                        name: getterInstance.agentTypeName,
                        type: InputType.SELECT,
                        value: formData.agentType,
                        options: GetOptionsForFormProperty(AgentType),
                    },
                ],
            },
        ];
    }

}

