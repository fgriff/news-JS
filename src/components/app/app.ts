import { AppInterface, NewsArticlesResponse, NewsSourcesResponse } from '../../types/index';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App implements AppInterface {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sources = document.querySelector<HTMLElement>('.sources');

        if (sources) {
            sources.addEventListener('click', (e) =>
                this.controller.getNews(e, (data: NewsArticlesResponse) => this.view.drawNews(data))
            );
            this.controller.getSources((data: NewsSourcesResponse) => this.view.drawSources(data));
        }
    }
}

export default App;
