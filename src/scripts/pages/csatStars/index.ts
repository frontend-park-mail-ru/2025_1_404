import {Page, PageRenderInterface} from '../page';
import template from "./template.precompiled.js";

/**
 * @class CSATStarsPage
 * @description Главная страница
 * @augments Page
 */
export default class CSATStarsPage extends Page {
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    private root: HTMLElement | undefined;
    private rating: number = 1;
    private questionId: number | undefined;

    render({root, layout, props}: PageRenderInterface) {
        if (!props || !props.questionId || typeof(props.questionId) !== 'number') {
            return;
        }
        this.root = root;
        this.questionId = props.questionId;
        root.innerHTML = template({
            title: props.title
        });
        super.render({root, layout});
    }

    initListeners() {
        super.initListeners();

        this.initListener('csatCloseButton', 'click', this.closeButtonHandler);
        this.initListener('csatNextButton', 'click', this.nextButtonHandler);
        this.initListener('csat-stars', 'click', this.starClickHandler);
    }

    starClickHandler(e: Event) {
        const target = e.target as HTMLElement;
        if (!target || !target.parentElement) {
            return;
        }
        const parent = target.parentElement;
        if (!parent.dataset || !parent.dataset.id) {
            return;
        }
        this.rating = Number(parent.dataset.id);

    }

    nextButtonHandler() {
        window.parent.postMessage(JSON.stringify({
            'status': 'submit',
            'rating': this.rating,
            'questionId': this.questionId
        }));
    }

    closeButtonHandler() {
        window.parent.postMessage(JSON.stringify({
            'status': 'close'
        }));
    }
}