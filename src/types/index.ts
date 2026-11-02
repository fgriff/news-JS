export interface ViewDrawData<T> {
    draw: (data: T) => void;
}

interface NewsArticleSource {
    readonly id: string;
    readonly name: string;
}

export interface NewsArticle {
    readonly author: string;
    readonly content: string;
    readonly description: string;
    readonly publishedAt: string;
    readonly source: NewsArticleSource;
    readonly title: string;
    readonly url: string;
    readonly urlToImage: string;
}

export interface NewsArticlesResponse {
    status: 'ok' | 'error';
    articles?: NewsArticle[];
    totalResults?: number;
}

export interface NewsSource {
    readonly category: string;
    readonly country: string;
    readonly description: string;
    readonly id: string;
    readonly language: string;
    readonly name: string;
    readonly url: string;
}

interface NewsSources {
    sources: NewsSource[];
}

export interface NewsSourcesResponse extends Pick<NewsArticlesResponse, 'status'>, Partial<NewsSources> {}

export interface AppViewInterface {
    drawNews: (data: NewsArticlesResponse) => void;
    drawSources: (data: NewsSourcesResponse) => void;
}

export interface LoaderInterface {
    getResp: ({ endpoint, options }: RequestUrl, callback?: Callback) => void;
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

export interface RequestUrl {
    endpoint: Endpoint;
    options?: UrlOptions;
}

export type Callback = (data: NewsSourcesResponse | NewsArticlesResponse) => void;

export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
    TopHeadlines = 'top-headlines',
    TopHeadlinesSources = 'top-headlines/sources',
}

export interface UrlOptions {
    sources?: string;
}

export interface AppControllerInterface {
    getSources: (callback: Callback) => void;
    getNews: (e: Event, callback: Callback) => void;
}

export interface AppInterface {
    start: () => void;
}

export interface RippleEffect {
    applyRipple: (targetElement: HTMLElement, targetClass: string) => void;
}

export enum StatusCode {
    Unauthorized = 401,
    NotFound = 404,
}
