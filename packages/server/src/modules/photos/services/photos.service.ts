import { Injectable } from '@nestjs/common';
import { FileObject } from 'imagekit/dist/libs/interfaces';
import { ImageKitApiClient } from 'src/modules/realestatecalc/api/image.kit.api.client';

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
            console.log('Fetching photos from cache');
            const images: FileObject[] = await this.imageKitApiClient.getAllImages(this.folderName);
            this.imagesCache.push(...images);
        }
        return this.imagesCache.map(fileObj => fileObj.url);
    }

}
