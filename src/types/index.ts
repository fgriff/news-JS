export interface NewsClass {
    draw: (data: Article[]) => void;
}

interface Source {
    readonly id: string;
    readonly name: string;
}

export interface Article {
    readonly author: string;
    readonly content: string;
    readonly description: string;
    readonly publishedAt: string;
    readonly source: Source;
    readonly title: string;
    readonly url: string;
    readonly urlToImage: string;
}
