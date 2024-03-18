
export type ContentType = { 'Content-Type': string };

export abstract class CalcApi {
    
    private baseURL = 'http://localhost:3000';
    private headers: ContentType = { 'Content-Type': 'application/json' };

    protected abstract getURL(): string;

    protected getBaseURL(): string {
        return this.baseURL;
    }

    protected getHeaders(): ContentType {
        return this.headers;
    }
}