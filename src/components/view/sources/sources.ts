import { Source, ViewDrawData } from '../../../types/index';
import './sources.css';

class Sources implements ViewDrawData<Source[]> {
    draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            if (sourceItemTemp) {
                const sourceClone = (sourceItemTemp as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;

                const sourceCloneName = sourceClone.querySelector('.source__item-name');

                if (sourceCloneName) {
                    (sourceCloneName as HTMLElement).textContent = item.name;
                }

                const sourceCloneButton = sourceClone.querySelector('.source__item');

                if (sourceCloneButton) {
                    (sourceCloneButton as HTMLElement).setAttribute('data-source-id', item.id);
                }

                fragment.append(sourceClone);
            }
        });

        const sourcesContainer = document.querySelector('.sources');

        if (sourcesContainer) {
            (sourcesContainer as HTMLElement).append(fragment);
        }
    }
}

export default Sources;
