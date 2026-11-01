import { IApp, INewsResponse, ISourcesResponse } from '../../types/index';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App implements IApp {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sources = document.querySelector('.sources');

        if (sources) {
            (sources as HTMLElement).addEventListener('click', (e) =>
                this.controller.getNews(e, (data: INewsResponse) => this.view.drawNews(data))
            );
            this.controller.getSources((data: ISourcesResponse) => this.view.drawSources(data));
        }
    }
}

export default App;
