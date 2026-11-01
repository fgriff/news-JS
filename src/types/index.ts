import type News from '../components/view/news/news';
import type Sources from '../components/view/sources/sources';

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

export interface ISource {
    readonly category: string;
    readonly country: string;
    readonly description: string;
    readonly id: string;
    readonly language: string;
    readonly name: string;
    readonly url: string;
}

export interface IAppView {
    readonly news: News;
    readonly sources: Sources;
    drawNews: (data: INewsResponse) => void;
    drawSources: (data: ISourcesResponse) => void;
}

export interface INewsResponse {
    status: string;
    articles?: IArticle[];
    totalResults?: number;
}

interface ISources {
    sources: ISource[];
}

export interface ISourcesResponse extends Partial<ISources> {
    status: string;
}

export interface ILoader {
    readonly baseLink: string;
    readonly options: RequestParams;
    getResp: ({ endpoint, options }: IResponse, callback?: Callback) => void;
    errorHandler: (res: Response) => Response | never;
    makeUrl: (options: IOptions, endpoint: Endpoints) => string;
    load: (method: string, endpoint: Endpoints, callback: Callback, options: IOptions) => void;
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
    endpoint: Endpoints;
    options?: IOptions;
}

export type Callback = (data: ISourcesResponse | INewsResponse) => void;

export type Endpoints = 'sources' | 'everything' | 'top-headlines' | 'top-headlines/sources';

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
