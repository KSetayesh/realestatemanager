import { RentCastApiRequestDTO, State, Utility } from "@realestatemanager/shared";

export class RentClassApiUrlCreator {

    createURL(endpoint: string, rentCastApiRequest: RentCastApiRequestDTO): string {
        let appendToUrl = '';
        let firstAppended = true;
        if (rentCastApiRequest.address) {
            appendToUrl += this.appendUrlParameter('address', rentCastApiRequest.address, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.city) {
            appendToUrl += this.appendUrlParameter('city', rentCastApiRequest.city, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.state) {
            const state = Utility.getEnumNameFromValue(State, rentCastApiRequest.state) ?? '';
            appendToUrl += this.appendUrlParameter('state', state, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.zipCode) {
            appendToUrl += this.appendUrlParameter('zipCode', rentCastApiRequest.zipCode, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.latitude) {
            appendToUrl += this.appendUrlParameter('latitude', rentCastApiRequest.latitude.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.longitude) {
            appendToUrl += this.appendUrlParameter('longitude', rentCastApiRequest.longitude.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.radius) {
            appendToUrl += this.appendUrlParameter('radius', rentCastApiRequest.radius.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.propertyType) {
            appendToUrl += this.appendUrlParameter('propertyType', rentCastApiRequest.propertyType, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.bedrooms) {
            appendToUrl += this.appendUrlParameter('bedrooms', rentCastApiRequest.bedrooms.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.bathrooms) {
            appendToUrl += this.appendUrlParameter('bathrooms', rentCastApiRequest.bathrooms.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.status) {
            appendToUrl += this.appendUrlParameter('status', rentCastApiRequest.status, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.daysOld) {
            appendToUrl += this.appendUrlParameter('daysOld', rentCastApiRequest.daysOld.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.limit) {
            appendToUrl += this.appendUrlParameter('limit', rentCastApiRequest.limit.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.offset) {
            appendToUrl += this.appendUrlParameter('offset', rentCastApiRequest.offset.toString(), firstAppended);
            firstAppended = false;
        }
        return `${endpoint}${appendToUrl}`;
    }

    private appendUrlParameter(
        property: string,
        value: string,
        firstAppended: boolean,
    ): string {
        const space = '%20';
        value = value.replace(/ /g, space);
        const returnValue = `${property}=${value}`;
        if (firstAppended) {
            return `?${returnValue}`;
        }
        else {
            return `&${returnValue}`;
        }
    }
}