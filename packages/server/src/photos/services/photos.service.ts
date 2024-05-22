import { Injectable } from '@nestjs/common';
import { ImageKitApiClient } from 'src/realestatecalc/api/image.kit.api.client';
import { FileObject } from 'imagekit/dist/libs/interfaces';

@Injectable()
export class PhotosService {

    private imageKitApiClient: ImageKitApiClient;
    private imagesCache: FileObject[];
    private folderName = 'Real_Estate_Images';

    constructor() {
        this.imageKitApiClient = new ImageKitApiClient();
        this.imagesCache = [];
    }

    async getAllPhotoUrls(): Promise<string[]> {
        if (this.imagesCache.length === 0) {
            const images: FileObject[] = await this.imageKitApiClient.getAllImages(this.folderName);
            this.imagesCache.push(...images);
        }
        return this.imagesCache.map(fileObj => fileObj.url);
    }

}
