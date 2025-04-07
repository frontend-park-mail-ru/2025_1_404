
import {Page, PageRenderInterface} from '../page';
import template from "./template.precompiled.js";

/**
 * @class UnknownPage
 * @description Страница 404
 * @augments Page
 */
export default class UnknownPage extends Page {
    /**
     * @function render
     * @description Метод рендеринга страницы 404.
     * @param {HTMLElement} root корневой элемент страницы
     */
    render({root}: PageRenderInterface) {
        root.innerHTML = template();

        super.render({root});
    }
}