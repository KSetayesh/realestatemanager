import axios from "axios";
import { CalcApi } from "./calcapi";

export class PhotosApi extends CalcApi {

    async getPhotos(): Promise<string[]> {

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