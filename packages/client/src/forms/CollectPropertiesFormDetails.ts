import {
    AddCollectPropertiesTitlesAndLabelsGetter,
    CollectPropertiesFormData,
    CreateRentCastApiRequest,
    PropertyStatus,
    PropertyType,
    State
} from "@realestatemanager/types";
import { FormInterface } from "./FormInterface";
import { InputType } from "../constants/Constant";
import { FormProperty } from "../components/StandardForm";
import {
    BasicCheckBoxForm,
    BasicNumberForm,
    BasicStringForm,
    GetOptionsForFormProperty,
    StateForm
} from "./ReusableFormFields";


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