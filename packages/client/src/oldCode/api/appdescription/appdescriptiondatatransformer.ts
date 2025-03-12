import { ProjectDescription } from "@realestatemanager/types";
import { Transformer } from "../transformer";

export class AppDescriptionTransformer implements Transformer<ProjectDescription, ProjectDescription> {

    toClient(projectDescription: ProjectDescription): ProjectDescription {
        return projectDescription;
    }

    toClientArray(): ProjectDescription[] {
        throw new Error('Method not implemented');
    }

}