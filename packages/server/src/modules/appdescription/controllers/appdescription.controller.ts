import { Controller, Get, HttpException, HttpStatus, Res } from '@nestjs/common';
import { AppdescriptionService } from '../service/appdescription.service';
import { Response } from 'express';
import { ProjectDescription } from '@realestatemanager/types';

@Controller('appdescription')
export class AppdescriptionController {

    constructor(private readonly appDescriptionService: AppdescriptionService) { }

    @Get()
    async getAppDescription(@Res() res: Response) {
        console.log('In getAppDescription()');
        try {
            const data: ProjectDescription = await this.appDescriptionService.fetchFile();
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', `inline; filename="${this.appDescriptionService.fileName}"`);
            res.json(data);
        } catch (error) {
            console.error('Error fetching file from S3:', error);
            throw new HttpException('Failed to fetch project descriptions', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
