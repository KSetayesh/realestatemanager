import { Injectable } from '@nestjs/common';

@Injectable()
export class PhotosService {

    // Move this to database
    private photoUrls: string[] = [
        'https://ik.imagekit.io/kh8wilm0d/Real_Estate_Images/alexander-andrews-A3DPhhAL6Zg-unsplash.jpg?updatedAt=1716347787567',
        'https://ik.imagekit.io/kh8wilm0d/Real_Estate_Images/brian-babb-XbwHrt87mQ0-unsplash.jpg?updatedAt=1716347787161',
        'https://ik.imagekit.io/kh8wilm0d/Real_Estate_Images/jason-briscoe-UV81E0oXXWQ-unsplash.jpg?updatedAt=1716347787177',
        'https://ik.imagekit.io/kh8wilm0d/Real_Estate_Images/sean-pollock-PhYq704ffdA-unsplash.jpg?updatedAt=1716347786741',
        'https://ik.imagekit.io/kh8wilm0d/Real_Estate_Images/webaliser-_TPTXZd9mOo-unsplash.jpg?updatedAt=1716347786222',
        'https://ik.imagekit.io/kh8wilm0d/Real_Estate_Images/lotus-design-n-print-5O-KFVmKSjY-unsplash.jpg?updatedAt=1716347785200',
        'https://ik.imagekit.io/kh8wilm0d/Real_Estate_Images/naomi-hebert-MP0bgaS_d1c-unsplash.jpg?updatedAt=1716347784538',
    ];

    getPhotos(): string[] {
        return this.photoUrls;
    }
}
