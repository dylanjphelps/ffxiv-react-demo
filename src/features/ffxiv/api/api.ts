export interface IFinalFantasyXIVClient {
    getFreeCompanyData(name: string, server: string): Promise<FreeCompany>;

}

export class FinalFantasyXIVClient implements IFinalFantasyXIVClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "https://xivapi.com/";
    }

    getFreeCompanyData(name: string, server: string): Promise<FreeCompany> {
        let url_ = this.baseUrl + `freecompany/search?name=${name}&server=${server}`;
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetFreeCompanyData(_response);
        });
    }  

    protected processGetFreeCompanyData(response: Response): Promise<FreeCompany> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            const responseObject = JSON.parse(_responseText);            

            const result = JSON.stringify(responseObject.Results[0]);
            
            let resultData200 = _responseText === "" ? null : JSON.parse(result, this.jsonParseReviver);
            return resultData200;
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
            return throwException("A server side error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FreeCompany>(null as any);
    }
}

export class FreeCompany implements IFreeCompany {
    Crest?: string[];
    ID?: string;
    Name?: string;
    Server?: string;

    constructor(data?: IFreeCompany) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (this as any)[property] = (data as any)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.ID = _data["ID"];
            this.Name = _data["Name"];
            this.Server = _data["Server"];
            if (Array.isArray(_data["Crest"])) {
                this.Crest = [] as any;
                for (let item of _data["Crest"])
                    this.Crest!.push(item);
            }
        }
    }

    static fromJS(data: any): FreeCompany {
        data = typeof data === 'object' ? data : {};
        let result = new FreeCompany();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["ID"] = this.ID;
        data["Name"] = this.Name;
        data["Server"] = this.Server;
        if (Array.isArray(this.Crest)) {
            data["Crest"] = [];
            for (let item of this.Crest)
                data["Crest"].push(item);
        }

        return data;
    }
}


export interface IFreeCompany {
    Crest?: string[];
    Id?: string;
    Name?: string;
    Server?: string;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}


