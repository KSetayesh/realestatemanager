import { Controller, Get } from '@nestjs/common';
import { PhotosService } from '../services/photos.service';

@Controller('photos')
export class PhotosController {
    constructor(private readonly photosService: PhotosService) { }

    @Get()
    getPhotos(): string[] {
        return this.photosService.getPhotos();
    }
}
