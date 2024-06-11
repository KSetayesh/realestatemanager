
export type ApiHeader = {
    method: string;
    headers: {
        accept: string;
        'X-Api-Key'?: string;
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
        body?: string,
        method: Method = Method.GET
    ): Promise<any> {
        try {
            console.log("URL for Api:", url);
            // console.log("body:", body);
            const options: ApiHeader = await this.getHeadersForRentCastApiCall(apiKey, body, method);
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Check if the response has a body before parsing it as JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                return data;
            } else {
                return; // or return an appropriate value if there's no JSON body
            }

        } catch (error) {
            console.error('Api Call Error:', error);
            throw error; // Re-throw the error if needed or handle it as needed
        }
    }


    private async getHeadersForRentCastApiCall(
        apiKey: string,
        body?: string,
        method: Method = Method.GET,
    ): Promise<ApiHeader> {

        const headers: ApiHeader = {
            method,
            headers: {
                accept: 'application/json',
            },
        };

        if (apiKey) {
            headers['X-Api-Key'] = apiKey;
        }

        if (method !== Method.GET && body) {
            headers.body = JSON.stringify(body);
        }

        return headers;
    }

}