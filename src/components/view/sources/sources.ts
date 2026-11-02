import { IRipple, ISource, IViewDrawData } from '../../../types/index';
import './sources.css';

class Sources implements IViewDrawData<ISource[]>, IRipple {
    public draw(data: ISource[]): void {
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

                    this.applyRipple(sourceCloneButton as HTMLElement, 'source__item');
                }

                fragment.append(sourceClone);
            }
        });

        const sourcesContainer = document.querySelector('.sources');

        if (sourcesContainer) {
            (sourcesContainer as HTMLElement).append(fragment);
        }
    }

    public applyRipple(targetElement: HTMLElement, targetClass: string): void {
        let rippleElement: HTMLSpanElement;

        targetElement.addEventListener('click', (e: MouseEvent) => {
            let target = e.target as HTMLElement;

            if (!target.classList.contains(targetClass)) {
                const button = target.closest(`.${targetClass}`);

                if (button) {
                    target = button as HTMLElement;
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
