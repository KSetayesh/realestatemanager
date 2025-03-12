import { ProjectDescription } from "@realestatemanager/types";
import axios from "axios";
import { CalcApi } from "../calcapi";
import { AppDescriptionApiInterface } from "./appdescriptionapiinterface";

export class AppDescriptionApi extends CalcApi implements AppDescriptionApiInterface<ProjectDescription> {

    async getAppDescription(): Promise<ProjectDescription> {

        try {
            const response = await axios.get<ProjectDescription>(this.getURL());
            return response.data;
        } catch (error) {
            const message = `Error sending form data to backend:", ${error}`;
            console.error(message);
            throw new Error(message);
        }
    }

    protected getURL(): string {
        return `${this.getBaseURL()}/appdescription`;
    }

}