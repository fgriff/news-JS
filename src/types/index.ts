export interface ViewDrawData<T> {
    draw: (data: T) => void;
}

interface ArticleSource {
    readonly id: string;
    readonly name: string;
}

export interface Article {
    readonly author: string;
    readonly content: string;
    readonly description: string;
    readonly publishedAt: string;
    readonly source: ArticleSource;
    readonly title: string;
    readonly url: string;
    readonly urlToImage: string;
}

export interface Source {
    readonly category: string;
    readonly country: string;
    readonly description: string;
    readonly id: string;
    readonly language: string;
    readonly name: string;
    readonly url: string;
}
