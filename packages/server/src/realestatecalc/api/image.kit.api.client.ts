import dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';
import { FileObject } from 'imagekit/dist/libs/interfaces';

dotenv.config();

export type ImageInfo = {
    fileId: string,
    name: string,
    filePath: string,
    url: string,
    thumbnailUrl: string,
};

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

    async getAllImages(folderName: string): Promise<string[]> {

        const fileObjects: FileObject[] = await this.imageKit.listFiles({
            path: folderName,
        });

        return fileObjects.map(fileObject => fileObject.url);
    }


} 
