import { Transformer } from "../transformer";

export class PhotosTransformer implements Transformer<string, string> {

    toClient(): string {
        throw new Error('Method not implemented');
    }

    toClientArray(photos: string[]): string[] {
        return photos;
    }

}