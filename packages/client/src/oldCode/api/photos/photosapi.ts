import axios from "axios";
import { CalcApi } from "../calcapi";
import { PhotosApiInterface } from "./photosapiinterface";

export class PhotosApi extends CalcApi implements PhotosApiInterface {

    async getAllPhotoUrls(): Promise<string[]> {

        try {
            const response = await axios.get(this.getURL());
            return response.data;
        } catch (error) {
            const message = `Error sending form data to backend:", ${error}`;
            console.error(message);
            throw new Error(message);
        }
    }

    protected getURL(): string {
        return `${this.getBaseURL()}/photos`;
    }

}