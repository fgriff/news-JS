import { Article, NewsClass } from '../../../types/index';
import './news.css';

class News implements NewsClass {
    draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            if (newsItemTemp) {
                const newsClone = (newsItemTemp as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;

                if (idx % 2) {
                    const newsCloneItem = newsClone.querySelector('.news__item');

                    if (newsCloneItem) {
                        (newsCloneItem as HTMLElement).classList.add('alt');
                    }
                }

                const newsClonePhoto = newsClone.querySelector('.news__meta-photo');

                if (newsClonePhoto) {
                    (newsClonePhoto as HTMLElement).style.backgroundImage =
                        `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }

                const newsCloneAuthor = newsClone.querySelector('.news__meta-author');

                if (newsCloneAuthor) {
                    (newsCloneAuthor as HTMLElement).textContent = item.author || item.source.name;
                }

                const newsCloneDate = newsClone.querySelector('.news__meta-date');

                if (newsCloneDate) {
                    (newsCloneDate as HTMLElement).textContent = item.publishedAt
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('-');
                }

                const newsCloneTitle = newsClone.querySelector('.news__description-title');

                if (newsCloneTitle) {
                    (newsCloneTitle as HTMLElement).textContent = item.title;
                }

                const newsCloneSource = newsClone.querySelector('.news__description-source');

                if (newsCloneSource) {
                    (newsCloneSource as HTMLElement).textContent = item.source.name;
                }

                const newsCloneContent = newsClone.querySelector('.news__description-content');

                if (newsCloneContent) {
                    (newsCloneContent as HTMLElement).textContent = item.description;
                }

                const newsCloneReadMore = newsClone.querySelector('.news__read-more a');

                if (newsCloneReadMore) {
                    (newsCloneReadMore as HTMLElement).setAttribute('href', item.url);
                }

                fragment.append(newsClone);
            }
        });

        const newsElement = document.querySelector('.news');

        if (newsElement) {
            (newsElement as HTMLElement).innerHTML = '';
            (newsElement as HTMLElement).appendChild(fragment);
        }
    }
}

export default News;
