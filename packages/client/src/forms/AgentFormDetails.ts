import { AddFormTitlesAndLabel, AgentFormData, CreateAgentRequest } from "@realestatemanager/shared";
import { FormProperty } from "../components/StandardForm";
import { AgentType, Country, InputType, State } from "../constants/Constant";
import { FormInterface } from "./FormInterface";
import {
    BasicStringForm,
    CountryForm,
    GetOptionsForFormProperty,
    StateForm
} from "./ReusableFormFields";

export const AddAgentTitlesAndLabels: AddFormTitlesAndLabel<AgentFormData> = {
    firstName: {
        title: "First Name",
        name: "firstName"
    },
    lastName: {
        title: "Last Name",
        name: "lastName"
    },
    website: {
        title: "Website",
        name: "website"
    },
    companyName: {
        title: "Company Name",
        name: "companyName"
    },
    phoneNumber: {
        title: "Phone Number",
        name: "phoneNumber"
    },
    email: {
        title: "Email",
        name: "email"
    },
    country: {
        title: "Country",
        name: "country"
    },
    state: {
        title: "State",
        name: "state"
    },
    agentType: {
        title: "Agent Type",
        name: "agentType"
    }
};

export class AddAgentTitlesAndLabelsGetter {
    get firstNameTitle(): string {
        return AddAgentTitlesAndLabels.firstName.title;
    }

    get firstNameName(): string {
        return AddAgentTitlesAndLabels.firstName.name;
    }

    get lastNameTitle(): string {
        return AddAgentTitlesAndLabels.lastName.title;
    }

    get lastNameName(): string {
        return AddAgentTitlesAndLabels.lastName.name;
    }

    get websiteTitle(): string {
        return AddAgentTitlesAndLabels.website.title;
    }

    get websiteName(): string {
        return AddAgentTitlesAndLabels.website.name;
    }

    get companyNameTitle(): string {
        return AddAgentTitlesAndLabels.companyName.title;
    }

    get companyNameName(): string {
        return AddAgentTitlesAndLabels.companyName.name;
    }

    get phoneNumberTitle(): string {
        return AddAgentTitlesAndLabels.phoneNumber.title;
    }

    get phoneNumberName(): string {
        return AddAgentTitlesAndLabels.phoneNumber.name;
    }

    get emailTitle(): string {
        return AddAgentTitlesAndLabels.email.title;
    }

    get emailName(): string {
        return AddAgentTitlesAndLabels.email.name;
    }

    get countryTitle(): string {
        return AddAgentTitlesAndLabels.country.title;
    }

    get countryName(): string {
        return AddAgentTitlesAndLabels.country.name;
    }

    get stateTitle(): string {
        return AddAgentTitlesAndLabels.state.title;
    }

    get stateName(): string {
        return AddAgentTitlesAndLabels.state.name;
    }

    get agentTypeTitle(): string {
        return AddAgentTitlesAndLabels.agentType.title;
    }

    get agentTypeName(): string {
        return AddAgentTitlesAndLabels.agentType.name;
    }
}

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

