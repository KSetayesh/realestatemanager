import { AddFormTitlesAndLabel, AgentFormData } from "../types/ClientTypes";

const AddAgentTitlesAndLabels: AddFormTitlesAndLabel<AgentFormData> = {
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