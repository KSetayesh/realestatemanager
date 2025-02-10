import { ProjectDescription } from "@realestatemanager/types";
import { AppDescriptionApi } from "./appdescriptionapi";
import { AppDescriptionApiInterface } from "./appdescriptionapiinterface";
import { AppDescriptionTransformer } from "./appdescriptiondatatransformer";

export class AgentDescriptionService implements AppDescriptionApiInterface<ProjectDescription> {

    private api: AppDescriptionApi;
    private transformer: AppDescriptionTransformer;

    constructor() {
        this.api = new AppDescriptionApi();
        this.transformer = new AppDescriptionTransformer();
    }

    async getAppDescription(): Promise<ProjectDescription> {
        const projectDescription: ProjectDescription = await this.api.getAppDescription();
        return this.transformer.toClient(projectDescription);
    }

}