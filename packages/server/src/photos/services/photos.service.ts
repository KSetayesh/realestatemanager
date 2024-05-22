import { Injectable } from '@nestjs/common';
import imageKitConfig from '../../config/imageKitConfig';
import { ImageKitApiClient } from 'src/realestatecalc/api/image.kit.api.client';

@Injectable()
export class PhotosService {

    private imageKitApiClient: ImageKitApiClient;
    private imageCache: string[];
    private folderName = 'Real_Estate_Images';

    constructor() {
        this.imageKitApiClient = new ImageKitApiClient();
        this.imageCache = [];
    }

    async getPhotos(): Promise<string[]> {
        if (this.imageCache.length > 0) {
            return this.imageCache;
        }
        const images: string[] = await this.imageKitApiClient.getAllImages(this.folderName);
        this.imageCache.push(...images);
        return images;
    }

}
