import { AddFormTitlesAndLabel, CollectPropertiesFormData, CreateRentCastApiRequest } from "@realestatemanager/shared";
import { FormInterface } from "./FormInterface";
import { InputType, PropertyStatus, PropertyType, State } from "../constants/Constant";
import { FormProperty } from "../components/StandardForm";
import {
    BasicCheckBoxForm,
    BasicNumberForm,
    BasicStringForm,
    GetOptionsForFormProperty,
    StateForm
} from "./ReusableFormFields";

export const AddCollectPropertiesTitlesAndLabels: AddFormTitlesAndLabel<CollectPropertiesFormData> = {
    address: {
        title: "Address",
        name: "address"
    },
    city: {
        title: "City",
        name: "city"
    },
    state: {
        title: "State",
        name: "state"
    },
    zipcode: {
        title: "Zipcode",
        name: "zipcode"
    },
    latitude: {
        title: "Latitude",
        name: "latitude"
    },
    longitude: {
        title: "Longitude",
        name: "longitude"
    },
    radius: {
        title: "Radius",
        name: "radius"
    },
    propertyType: {
        title: "Property Type",
        name: "propertyType"
    },
    bedrooms: {
        title: "Bedrooms",
        name: "bedrooms"
    },
    bathrooms: {
        title: "Bathrooms",
        name: "bathrooms"
    },
    status: {
        title: "Status",
        name: "status"
    },
    daysOld: {
        title: "Days Old",
        name: "daysOld"
    },
    limit: {
        title: "Limit",
        name: "limit"
    },
    offset: {
        title: "Offset",
        name: "offset"
    },
    retrieveExtraData: {
        title: "Retrieve Extra Data",
        name: "retrieveExtraData"
    },
};

export class AddCollectPropertiesTitlesAndLabelsGetter {
    get addressTitle(): string {
        return AddCollectPropertiesTitlesAndLabels.address.title;
    }

    get addressName(): string {
        return AddCollectPropertiesTitlesAndLabels.address.name;
    }

    get cityTitle(): string {
        return AddCollectPropertiesTitlesAndLabels.city.title;
    }

    get cityName(): string {
        return AddCollectPropertiesTitlesAndLabels.city.name;
    }

    get stateTitle(): string {
        return AddCollectPropertiesTitlesAndLabels.state.title;
    }

    get stateName(): string {
        return AddCollectPropertiesTitlesAndLabels.state.name;
    }

    get zipcodeTitle(): string {
        return AddCollectPropertiesTitlesAndLabels.zipcode.title;
    }

    get zipcodeName(): string {
        return AddCollectPropertiesTitlesAndLabels.zipcode.name;
    }

    get latitudeTitle(): string {
        return AddCollectPropertiesTitlesAndLabels.latitude.title;
    }

    get latitudeName(): string {
        return AddCollectPropertiesTitlesAndLabels.latitude.name;
    }

    get longitudeTitle(): string {
        return AddCollectPropertiesTitlesAndLabels.longitude.title;
    }

    get longitudeName(): string {
        return AddCollectPropertiesTitlesAndLabels.longitude.name;
    }

    get radiusTitle(): string {
        return AddCollectPropertiesTitlesAndLabels.radius.title;
    }

    get radiusName(): string {
        return AddCollectPropertiesTitlesAndLabels.radius.name;
    }

    get propertyTypeTitle(): string {
        return AddCollectPropertiesTitlesAndLabels.propertyType.title;
    }

    get propertyTypeName(): string {
        return AddCollectPropertiesTitlesAndLabels.propertyType.name;
    }

    get bedroomsTitle(): string {
        return AddCollectPropertiesTitlesAndLabels.bedrooms.title;
    }

    get bedroomsName(): string {
        return AddCollectPropertiesTitlesAndLabels.bedrooms.name;
    }

    get bathroomsTitle(): string {
        return AddCollectPropertiesTitlesAndLabels.bathrooms.title;
    }

    get bathroomsName(): string {
        return AddCollectPropertiesTitlesAndLabels.bathrooms.name;
    }

    get statusTitle(): string {
        return AddCollectPropertiesTitlesAndLabels.status.title;
    }

    get statusName(): string {
        return AddCollectPropertiesTitlesAndLabels.status.name;
    }

    get daysOldTitle(): string {
        return AddCollectPropertiesTitlesAndLabels.daysOld.title;
    }

    get daysOldName(): string {
        return AddCollectPropertiesTitlesAndLabels.daysOld.name;
    }

    get limitTitle(): string {
        return AddCollectPropertiesTitlesAndLabels.limit.title;
    }

    get limitName(): string {
        return AddCollectPropertiesTitlesAndLabels.limit.name;
    }

    get offsetTitle(): string {
        return AddCollectPropertiesTitlesAndLabels.offset.title;
    }

    get offsetName(): string {
        return AddCollectPropertiesTitlesAndLabels.offset.name;
    }

    get retrieveExtraDataTitle(): string {
        return AddCollectPropertiesTitlesAndLabels.retrieveExtraData.title;
    }

    get retrieveExtraDataName(): string {
        return AddCollectPropertiesTitlesAndLabels.retrieveExtraData.name;
    }

};

export class CollectPropertiesFormDetails implements FormInterface<CollectPropertiesFormData, CreateRentCastApiRequest> {

    getDefaultFormData(): CollectPropertiesFormData {
        return {
            address: '',
            city: '',
            state: State.AL,
            zipcode: '',
            latitude: NaN,
            longitude: NaN,
            radius: NaN,
            propertyType: PropertyType.SINGLE_FAMILY,
            bedrooms: NaN,
            bathrooms: NaN,
            status: PropertyStatus.ACTIVE,
            daysOld: NaN,
            limit: 5,
            offset: NaN,
            retrieveExtraData: false,
        };
    }

    getFormDetails(formData: CollectPropertiesFormData): FormProperty[] {
        const getterInstance: AddCollectPropertiesTitlesAndLabelsGetter = new AddCollectPropertiesTitlesAndLabelsGetter();
        return [
            BasicStringForm(
                getterInstance.addressTitle,
                getterInstance.addressName,
                formData.city
            ),
            BasicStringForm(
                getterInstance.cityTitle,
                getterInstance.cityName,
                formData.city
            ),
            StateForm(
                formData.state
            ),
            BasicStringForm(
                getterInstance.zipcodeTitle,
                getterInstance.zipcodeName,
                formData.zipcode
            ),
            BasicNumberForm(
                getterInstance.latitudeTitle,
                getterInstance.latitudeName,
                formData.latitude
            ),
            BasicNumberForm(
                getterInstance.longitudeTitle,
                getterInstance.longitudeName,
                formData.longitude
            ),
            BasicNumberForm(
                getterInstance.radiusTitle,
                getterInstance.radiusName,
                formData.radius
            ),
            {
                title: getterInstance.propertyTypeTitle,
                values: [
                    {
                        name: getterInstance.propertyTypeName,
                        type: InputType.SELECT,
                        value: formData.propertyType,
                        options: GetOptionsForFormProperty(PropertyType),
                    },
                ],
            },
            BasicNumberForm(
                getterInstance.bedroomsTitle,
                getterInstance.bedroomsName,
                formData.bedrooms
            ),
            BasicNumberForm(
                getterInstance.bathroomsTitle,
                getterInstance.bathroomsName,
                formData.bathrooms
            ),
            {
                title: getterInstance.statusTitle,
                values: [
                    {
                        name: getterInstance.statusName,
                        type: InputType.SELECT,
                        value: formData.status,
                        options: GetOptionsForFormProperty(PropertyStatus),
                    },
                ],
            },
            BasicNumberForm(
                getterInstance.daysOldTitle,
                getterInstance.daysOldName,
                formData.daysOld
            ),
            BasicNumberForm(
                getterInstance.limitTitle,
                getterInstance.limitName,
                formData.limit
            ),
            BasicNumberForm(
                getterInstance.offsetTitle,
                getterInstance.offsetName,
                formData.offset
            ),
            BasicCheckBoxForm(
                getterInstance.retrieveExtraDataTitle,
                getterInstance.retrieveExtraDataName,
                formData.retrieveExtraData
            ),
        ];
    }

    createRequest(formData: CollectPropertiesFormData): CreateRentCastApiRequest {
        return {
            address: formData.address,
            city: formData.city,
            state: formData.state as State,
            zipCode: formData.zipcode,
            latitude: formData.latitude,
            longitude: formData.longitude,
            radius: formData.radius,
            propertyType: formData.propertyType as PropertyType,
            bedrooms: formData.bedrooms,
            bathrooms: formData.bathrooms,
            status: formData.status as PropertyStatus,
            daysOld: formData.daysOld,
            limit: formData.limit,
            offset: formData.offset,
            retrieveExtraData: formData.retrieveExtraData,
        };
    }

}