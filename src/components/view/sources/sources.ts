import { NewsSource, RippleEffect, ViewDrawData } from '../../../types/index';
import './sources.css';

class Sources implements ViewDrawData<NewsSource[]>, RippleEffect {
    public draw(data: NewsSource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            if (sourceItemTemp) {
                const sourceClone = <HTMLElement>sourceItemTemp.content.cloneNode(true);

                const sourceCloneName = sourceClone.querySelector<HTMLElement>('.source__item-name');

                if (sourceCloneName) {
                    sourceCloneName.textContent = item.name;
                }

                const sourceCloneButton = sourceClone.querySelector<HTMLElement>('.source__item');

                if (sourceCloneButton) {
                    sourceCloneButton.setAttribute('data-source-id', item.id);

                    this.applyRipple(sourceCloneButton, 'source__item');
                }

                fragment.append(sourceClone);
            }
        });

        const sourcesContainer = document.querySelector<HTMLElement>('.sources');

        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }

    public applyRipple(targetElement: HTMLElement, targetClass: string): void {
        let rippleElement: HTMLSpanElement;

        targetElement.addEventListener('click', (e: MouseEvent) => {
            let target = <HTMLElement>e.target;

            if (!target.classList.contains(targetClass)) {
                const button = target.closest<HTMLElement>(`.${targetClass}`);

                if (button) {
                    target = button;
                }
            }

            const left = e.clientX - target.getBoundingClientRect().left;
            const top = e.clientY - target.getBoundingClientRect().top;

            rippleElement = document.createElement('span');
            rippleElement.classList.add('ripple');
            rippleElement.style.left = `${left}px`;
            rippleElement.style.top = `${top}px`;

            targetElement.append(rippleElement);
        });
    }
}

export default Sources;
