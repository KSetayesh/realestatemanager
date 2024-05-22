import { Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';
import { FileObject } from 'imagekit/dist/libs/interfaces';

@Injectable()
export class ImageKitApiClient {

    private imageKit: ImageKit;

    constructor() {
        this.imageKit = new ImageKit({
            publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
            privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
            urlEndpoint: `https://ik.imagekit.io/${process.env.IMAGE_KIT_ID}`,
        });

    }

    async getAllImages(folderName: string): Promise<FileObject[]> {
        return this.imageKit.listFiles({
            path: folderName,
        });
    }


} 
