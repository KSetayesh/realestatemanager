import { Injectable } from '@nestjs/common';
import ImageKit from 'imagekit';
import { FileObject } from 'imagekit/dist/libs/interfaces';
import imageKitConfig from 'src/config/imageKitConfig';

@Injectable()
export class ImageKitApiClient {

    private imageKit: ImageKit;

    constructor() {
        this.imageKit = new ImageKit({
            publicKey: imageKitConfig.imageKitPublicKey, //process.env.IMAGE_KIT_PUBLIC_KEY,
            privateKey: imageKitConfig.imageKitPrivateKey, // process.env.IMAGE_KIT_PRIVATE_KEY,
            urlEndpoint: `https://ik.imagekit.io/${imageKitConfig.imageKitId}`, // `https://ik.imagekit.io/${process.env.IMAGE_KIT_ID}`,
        });

    }

    async getAllImages(folderName: string): Promise<FileObject[]> {
        return this.imageKit.listFiles({
            path: folderName,
        });
    }


} 
