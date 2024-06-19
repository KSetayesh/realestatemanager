import { Injectable } from '@nestjs/common';
import {
    ProjectDescription,
    ProjectInterface
} from '@realestatemanager/types';
import * as AWS from 'aws-sdk';
import s3Config from 'src/config/s3Config';

@Injectable()
export class AppDescriptionService {

    private s3: AWS.S3;
    private _fileName = 'realestatemanagerdetails.json';
    private key = this._fileName;
    private bucketName = 'projectdescriptions';
    private cache: ProjectDescription;
    private params: AWS.S3.GetObjectRequest;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: s3Config.accessKeyId,
            secretAccessKey: s3Config.secretAccessKey,
            region: '',
        });

        this.params = {
            Bucket: this.bucketName,
            Key: this.key,
        };
    }

    async fetchFile(): Promise<ProjectDescription> {
        try {
            if (!this.cache) {
                console.log('Fetching from cache');
                const dataFromS3 = await this.s3.getObject(this.params).promise();
                if (!dataFromS3.Body) {
                    throw new Error('File is empty');
                }
                const projectInterface: ProjectInterface = JSON.parse(dataFromS3.Body.toString('utf-8'));
                this.cache = projectInterface.Real_Estate_Manager.description;
                console.log('the data from s3 is:', this.cache);
            }
            return this.cache;
        } catch (error) {
            console.error('Error fetching file from S3:', error);
            throw new Error('Error fetching file from S3');
        }
    }

}
