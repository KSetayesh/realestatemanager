import { RentCastDetails } from "./rentcastdetails.model";
import apiKeysConfig from '../../../config/apiKeysConfig';
import { RentCastDetailsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";

export class RentCastDetailsManager implements IDTOConvertible<RentCastDetailsDTO[]> {

    private rentCastDetailsMap: { [key: number]: string } = {
        1: apiKeysConfig.rentCastApiKey,
        2: apiKeysConfig.backUpRentCastApiKey,
    };

    private rentCastDetailsList: RentCastDetails[];

    constructor(rentCastDetailsList: RentCastDetails[]) {
        this.rentCastDetailsList = rentCastDetailsList.sort((a, b) => a.id - b.id);
        for (const rentCastDetail of this.rentCastDetailsList) {
            if (!(rentCastDetail.id in this.rentCastDetailsMap)) {
                throw new Error(`${rentCastDetail.id} not found! Need to update rentCastDetailsMap`);
            }
        }
    }

    canCallRentCastApi(): boolean {
        if (!apiKeysConfig.canMakeRentCastApiCall) {
            console.log(`"canMakeRentCastApiCall" is set to false in .env`);
            return false;
        }

        if (this.getRentCastDetailId() > -1) {
            return true;
        }

        console.log(`Number of rent cast api calls has reached its limit, cannot make api call`);
        return false;
    }

    getHeadersForRentCastApiCall() {
        const id = this.getRentCastDetailId();

        if (id < 0 || !(id in this.rentCastDetailsMap)) {
            throw new Error(`Cannot fetch header because there arent't any configs available to use`);
        }

        return {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-Api-Key': this.rentCastDetailsMap[id],
            }
        };
    }

    getRentCastDetailId(): number {
        for (const rentCastDetail of this.rentCastDetailsList) {
            if (rentCastDetail.canMakeFreeApiCall) {
                return rentCastDetail.id;
            }
        }
        return -1;
    }

    toDTO(): RentCastDetailsDTO[] {
        return this.rentCastDetailsList.map(rentCastDetails => rentCastDetails.toDTO());
    }


}