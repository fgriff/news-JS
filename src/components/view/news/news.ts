import { NewsArticle, ViewDrawData } from '../../../types/index';
import imagePlaceholder from '../../../assets/no-image-placeholder.jpg';
import './news.css';

class News implements ViewDrawData<NewsArticle[]> {
    public draw(data: NewsArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item, idx) => {
            if (newsItemTemp) {
                const newsClone = <HTMLElement>newsItemTemp.content.cloneNode(true);

                if (idx % 2) {
                    const newsCloneItem = newsClone.querySelector<HTMLElement>('.news__item');

                    if (newsCloneItem) {
                        newsCloneItem.classList.add('alt');
                    }
                }

                const newsClonePhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');

                if (newsClonePhoto) {
                    newsClonePhoto.style.backgroundImage = `url(${item.urlToImage || imagePlaceholder})`;
                }

                const newsCloneAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');

                if (newsCloneAuthor) {
                    newsCloneAuthor.textContent = item.author || item.source.name;
                }

                const newsCloneDate = newsClone.querySelector<HTMLElement>('.news__meta-date');

                if (newsCloneDate) {
                    newsCloneDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                }

                const newsCloneTitle = newsClone.querySelector<HTMLElement>('.news__description-title');

                if (newsCloneTitle) {
                    newsCloneTitle.textContent = item.title;
                }

                const newsCloneSource = newsClone.querySelector<HTMLElement>('.news__description-source');

                if (newsCloneSource) {
                    newsCloneSource.textContent = item.source.name;
                }

                const newsCloneContent = newsClone.querySelector<HTMLElement>('.news__description-content');

                if (newsCloneContent) {
                    newsCloneContent.textContent = item.description;
                }

                const newsCloneReadMore = newsClone.querySelector<HTMLElement>('.news__read-more a');

                if (newsCloneReadMore) {
                    newsCloneReadMore.setAttribute('href', item.url);
                }

                fragment.append(newsClone);
            }
        });

        const newsElement = document.querySelector<HTMLElement>('.news');

        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
