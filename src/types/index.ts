export interface IViewDrawData<T> {
    draw: (data: T) => void;
}

interface IArticleSource {
    readonly id: string;
    readonly name: string;
}

export interface IArticle {
    readonly author: string;
    readonly content: string;
    readonly description: string;
    readonly publishedAt: string;
    readonly source: IArticleSource;
    readonly title: string;
    readonly url: string;
    readonly urlToImage: string;
}

export interface INewsResponse {
    status: 'ok' | 'error';
    articles?: IArticle[];
    totalResults?: number;
}

export interface ISource {
    readonly category: string;
    readonly country: string;
    readonly description: string;
    readonly id: string;
    readonly language: string;
    readonly name: string;
    readonly url: string;
}

interface ISources {
    sources: ISource[];
}

export interface ISourcesResponse extends Pick<INewsResponse, 'status'>, Partial<ISources> {}

export interface IAppView {
    drawNews: (data: INewsResponse) => void;
    drawSources: (data: ISourcesResponse) => void;
}

export interface ILoader {
    getResp: ({ endpoint, options }: IResponse, callback?: Callback) => void;
}

export type RequestParams = {
    apiKey: string;
    q?: string;
    searchIn?: 'title' | 'description' | 'content';
    sources?: string;
    domains?: string;
    excludeDomains?: string;
    from?: string;
    to?: string;
    language?: string;
    sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
    pageSize?: number;
    page?: number;
};

export interface IResponse {
    endpoint: Endpoint;
    options?: IOptions;
}

export type Callback = (data: ISourcesResponse | INewsResponse) => void;

export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
    TopHeadlines = 'top-headlines',
    TopHeadlinesSources = 'top-headlines/sources',
}

export interface IOptions {
    sources?: string;
}

export interface IAppController {
    getSources: (callback: Callback) => void;
    getNews: (e: Event, callback: Callback) => void;
}

export interface IApp {
    start: () => void;
}

export interface IRipple {
    applyRipple: (targetElement: HTMLElement, targetClass: string) => void;
}

export enum StatusCode {
    Unauthorized = 401,
    NotFound = 404,
}
