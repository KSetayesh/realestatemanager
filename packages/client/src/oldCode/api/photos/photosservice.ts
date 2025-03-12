import { PhotosApi } from "./photosapi";
import { PhotosApiInterface } from "./photosapiinterface";
import { PhotosTransformer } from "./photostransformer";

export class PhotosService implements PhotosApiInterface {

    private api: PhotosApi;
    private transformer: PhotosTransformer;

    constructor() {
        this.api = new PhotosApi();
        this.transformer = new PhotosTransformer();
    }

    async getAllPhotoUrls(): Promise<string[]> {
        const photos: string[] = await this.api.getAllPhotoUrls();
        return this.transformer.toClientArray(photos);
    }

}