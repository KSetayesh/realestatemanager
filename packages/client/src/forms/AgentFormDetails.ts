import { CreateAgentRequest } from "@realestatemanager/shared";
import { FormProperty, FormPropertyMap } from "../components/StandardForm";
import { AgentType, InputType } from "../constants/Constant";
import { FormInterface } from "./FormInterface";
import { BasicStringForm, CountryForm, GetOptionsForFormProperty, StateForm } from "./ReusableFormFields";

// export type AgentFormData = {
//     firstName: string;
//     lastName: string;
//     website?: string;
//     companyName: string,
//     phoneNumber: string;
//     email: string;
//     country: string;
//     state: string;
//     agentType: string;
// };

export type AgentFormData = {
    firstName: FormProperty;
    lastName: FormProperty;
    website?: FormProperty;
    companyName: FormProperty;
    phoneNumber: FormProperty;
    email: FormProperty;
    country: FormProperty;
    state: FormProperty;
    agentType: FormProperty;
};

export class AgentFormDetails implements FormInterface<AgentFormData, CreateAgentRequest> {

    // createRequest(formData: AgentFormData): CreateAgentRequest {
    //     return {
    //         firstName: formData.firstName,
    //         lastName: formData.lastName,
    //         website: formData.website ?? '',
    //         companyName: formData.companyName,
    //         phoneNumber: formData.phoneNumber,
    //         email: formData.email,
    //         state: formData.state as State,
    //         country: formData.country as Country,
    //         agentType: formData.agentType as AgentType,
    //     };
    // }

    // // Create a state to store the form data.
    // getDefaultFormData(): AgentFormData {
    //     return {
    //         firstName: '',
    //         lastName: '',
    //         companyName: '',
    //         phoneNumber: '',
    //         email: '',
    //         country: Country.UnitedStates,
    //         state: State.AL,
    //         agentType: AgentType.REAL_ESTATE_AGENT,
    //     };
    // }

    // getDefaultFormData(): AgentFormData {
    //     const formDetails: FormPropertyMap<AgentFormData> = this.getFormDetails();
    //     return {
    //         firstName: formDetails.firstName.values.firstName.defaultValue?.toString() ?? '',
    //         lastName: formDetails.lastName.values.lastName.defaultValue?.toString() ?? '',
    //         companyName: formDetails.companyName.values.companyName.defaultValue?.toString() ?? '',
    //         phoneNumber: formDetails.phoneNumber.values.phoneNumber.defaultValue?.toString() ?? '',
    //         email: formDetails.email.values.email.defaultValue?.toString() ?? '',
    //         country: formDetails.country.values.country.defaultValue?.toString() ?? '',
    //         state: formDetails.state.values.state.defaultValue?.toString() ?? '',
    //         agentType: AgentType.REAL_ESTATE_AGENT,
    //     };
    // }

    getDefaultFormData() {
        const formDetails = this.getFormDetails();
        const initialData: Partial<AgentFormData> = {};

        Object.keys(formDetails).forEach(key => {
            const formProperty = formDetails[key as keyof AgentFormData]!;
            Object.keys(formProperty.values).forEach(valueKey => {
                const formValue = formProperty.values[valueKey];
                initialData[key as keyof AgentFormData] = {
                    ...formProperty,
                    values: {
                        [valueKey]: {
                            ...formValue,
                            value: formValue.defaultValue
                        }
                    }
                };
            });
        });

        return initialData as AgentFormData;
    };

    getFormDetails(): FormPropertyMap<AgentFormData> { //[] {
        return {
            firstName: BasicStringForm('First Name', 'firstName'), //formData.firstName),
            lastName: BasicStringForm('Last Name', 'lastName'), //formData.lastName),
            website: BasicStringForm('Website', 'website'), //formData.website),
            companyName: BasicStringForm('Company Name', 'companyName'), //formData.companyName),
            phoneNumber: BasicStringForm('Phone Number', 'phoneNumber'), //formData.phoneNumber),
            email: BasicStringForm('Email', 'email'), //formData.email),
            country: CountryForm(), //formData.country),
            state: StateForm(), //formData.state),
            agentType: {
                title: 'Agent Type',
                values: {
                    agentType: {
                        name: 'agentType',
                        type: InputType.SELECT,
                        value: undefined,
                        defaultValue: AgentType.REAL_ESTATE_AGENT,
                        options: GetOptionsForFormProperty(AgentType),
                    },
                },
            },
        };
    }

    // getFormDetails(formData: AgentFormData): FormProperty[] {
    //     return [
    //         BasicStringForm('First Name', 'firstName', formData.firstName),
    //         BasicStringForm('Last Name', 'lastName', formData.lastName),
    //         BasicStringForm('Website', 'website', formData.website),
    //         BasicStringForm('Company Name', 'companyName', formData.companyName),
    //         BasicStringForm('Phone Number', 'phoneNumber', formData.phoneNumber),
    //         BasicStringForm('Email', 'email', formData.email),
    //         CountryForm(formData.country),
    //         StateForm(formData.state),
    //         {
    //             title: 'Agent Type',
    //             values: [
    //                 {
    //                     name: 'agentType',
    //                     type: InputType.SELECT,
    //                     // value: formData.agentType,
    //                     defaultValue: AgentType.REAL_ESTATE_AGENT,
    //                     options: GetOptionsForFormProperty(AgentType),
    //                 },
    //             ],
    //         },
    //     ];
    // }

}

