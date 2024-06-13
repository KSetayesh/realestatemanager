
export type ApiHeader = {
    method: Method;
    headers: {
        accept: string;
        'X-Api-Key'?: string;
        'Content-Type': string;
    },
    body?: string;
};

export enum Method {
    GET = 'GET',
    POST = 'POST',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
};

export abstract class ApiClient {

    private _baseApiUrl: string;
    private _canMakeApiCall: boolean;

    constructor(baseApiUrl: string, canMakeApiCall: boolean = true) {
        this._baseApiUrl = baseApiUrl;
        this._canMakeApiCall = canMakeApiCall;
    }

    protected get baseApiUrl(): string {
        if (!this._baseApiUrl) {
            throw new Error('Api Url is not set');
        }
        return this._baseApiUrl;
    }

    protected get canMakeApiCall(): boolean {
        return this._canMakeApiCall;
    }

    protected async makeApiCall(
        apiKey: string,
        url: string,
        requestBody?: string,
        method: Method = Method.GET,
    ): Promise<Response> {
        try {
            console.log("URL for Api:", url);
            const options: ApiHeader = this.getHeadersForRentCastApiCall(apiKey, requestBody, method);
            const response = await fetch(url, options);

            // response.ok checks to see if the status code falls between 200-299
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;

        } catch (error) {
            console.error('Api Call Error:', error);
            throw error; // Re-throw the error if needed or handle it as needed
        }
    }


    private getHeadersForRentCastApiCall(
        apiKey: string,
        requestBody?: string,
        method: Method = Method.GET,
    ): ApiHeader {

        const reqHeader: ApiHeader = {
            method: method,
            headers: {
                accept: 'application/json',
                "Content-Type": "application/json"
            },
        };

        if (apiKey) {
            reqHeader.headers['X-Api-Key'] = apiKey;
        }

        if (method !== Method.GET && requestBody) {
            reqHeader.body = requestBody;
        }

        return reqHeader;
    }

}