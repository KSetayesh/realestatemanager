import appConfig from '../config/AppConfig';

export type ContentType = { 'Content-Type': string };

export abstract class CalcApi {

    // private baseURL = 'http://localhost:3000';
    private headers: ContentType = { 'Content-Type': 'application/json' };

    protected abstract getURL(): string;

    // protected getBaseURL(): string {
    //     return this.baseURL;
    // }


    protected getBaseURL(): string {
        const apiUrl = appConfig.apiUrl;
        console.log('apiUrl:', apiUrl);
        if (!apiUrl) {
            throw new Error('Api Url is not set');
        }
        return apiUrl;
    }

    protected getHeaders(): ContentType {
        return this.headers;
    }
}