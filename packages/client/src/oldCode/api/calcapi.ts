import appConfig from '../../oldCode/config/AppConfig';

export type ContentType = { 'Content-Type': string };

export abstract class CalcApi {

    // private baseURL = 'http://localhost:3000';
    private headers: ContentType = { 'Content-Type': 'application/json' };

    protected abstract getURL(): string;

    private baseApiUrl: string;

    constructor() {
        this.baseApiUrl = appConfig.apiUrl;
    }

    protected getBaseURL(): string {
        console.log('apiUrl:', this.baseApiUrl);
        if (!this.baseApiUrl) {
            throw new Error('Api Url is not set');
        }
        return this.baseApiUrl;
    }

    protected getHeaders(): ContentType {
        return this.headers;
    }
}