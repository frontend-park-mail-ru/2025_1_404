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

    render({root, layout, props}: PageRenderInterface) {
        if (!props) {
            return;
        }
        this.root = root;
        root.innerHTML = template({
            title: props.title
        });
        super.render({root, layout});
    }

    initListeners() {
        super.initListeners();

        this.initListener('csatCloseButton', 'click', this.closeButtonHandler);
    }

    closeButtonHandler() {
        if (!this.root) {
            return;
        }
        window.parent.postMessage('close');
    }
}