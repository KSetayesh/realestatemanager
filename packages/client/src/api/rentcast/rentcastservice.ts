import { CreateRentCastApiRequest, RentCastDetails, RentCastDetailsResponseDTO } from "@realestatemanager/types";
import { RentCastApi } from "./rentcastapi";
import { RentCastApiInterface } from "./rentcastapiinterface";
import { RentCastTransformer } from "./rentcasttransformer";

export class RentCastService implements RentCastApiInterface<RentCastDetails> {

    private api: RentCastApi;
    private transformer: RentCastTransformer;

    constructor() {
        this.api = new RentCastApi();
        this.transformer = new RentCastTransformer();
    }

    async getRentCastApiDetails(): Promise<RentCastDetails[]> {
        const rentCastDetails: RentCastDetailsResponseDTO[] = await this.api.getRentCastApiDetails();
        return this.transformer.toClientArray(rentCastDetails);
    }

    async addNewPropertyWithRentCastAPI(dataToSubmit: CreateRentCastApiRequest): Promise<boolean> {
        return this.api.addNewPropertyWithRentCastAPI(dataToSubmit);
    }

}
