import { AppViewInterface, NewsArticlesResponse, NewsSourcesResponse } from '../../types/index';
import News from './news/news';
import Sources from './sources/sources';

export class AppView implements AppViewInterface {
    private readonly news: News;
    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsArticlesResponse): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: NewsSourcesResponse): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
