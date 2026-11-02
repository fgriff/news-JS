import {
    Callback,
    Endpoints,
    ILoader,
    IOptions,
    IResponse,
    INewsResponse,
    RequestParams,
    ISourcesResponse,
    StatusCode,
} from '../../types/index';

class Loader implements ILoader {
    baseLink: string;
    options: RequestParams;

    constructor(baseLink: string, options: RequestParams) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: IResponse,
        callback: Callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response | never {
        if (!res.ok) {
            if (res.status === StatusCode.Unauthorized || res.status === StatusCode.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: IOptions, endpoint: Endpoints): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof RequestParams]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: Endpoints, callback: Callback, options: IOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: ISourcesResponse | INewsResponse) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
