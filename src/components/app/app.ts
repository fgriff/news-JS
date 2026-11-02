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
        const sourceContainer = document.querySelector<HTMLElement>('.sources');

        if (sourceContainer) {
            sourceContainer.addEventListener('click', (e: Event) => {
                const sources = document.querySelectorAll<HTMLElement>('.source__item');

                if (sources) {
                    sources.forEach((source) => source.classList.remove('active'));
                }

                this.controller.getNews(e, (data: NewsArticlesResponse) => this.view.drawNews(data));
            });

            this.controller.getSources((data: NewsSourcesResponse) => {
                this.view.drawSources(data);

                const source = document.querySelector<HTMLElement>('.source__item');

                if (source) {
                    source.click();
                }
            });
        }
    }
}

export default App;
