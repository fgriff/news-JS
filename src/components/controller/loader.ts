import {
    Callback,
    Endpoint,
    LoaderInterface,
    NewsArticlesResponse,
    NewsSourcesResponse,
    RequestParams,
    RequestUrl,
    StatusCode,
    UrlOptions,
} from '../../types/index';

class Loader implements LoaderInterface {
    private readonly baseLink: string;
    private readonly options: RequestParams;

    constructor(baseLink: string, options: RequestParams) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: RequestUrl,
        callback: Callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response | never {
        if (!res.ok) {
            if (res.status === StatusCode.Unauthorized || res.status === StatusCode.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: UrlOptions, endpoint: Endpoint): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof RequestParams]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: Endpoint, callback: Callback, options: UrlOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: NewsSourcesResponse | NewsArticlesResponse) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
