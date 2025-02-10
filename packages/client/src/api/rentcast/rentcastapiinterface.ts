import { CreateRentCastApiRequest } from "@realestatemanager/types";

export interface RentCastApiInterface<T> {
    getRentCastApiDetails(): Promise<T[]>;
    addNewPropertyWithRentCastAPI(dataToSubmit: CreateRentCastApiRequest): Promise<boolean>;
};