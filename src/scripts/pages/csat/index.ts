import {Page, PageRenderInterface} from '../page';
import template from "./template.precompiled.js";

/**
 * @class CSATPage
 * @description Главная страница
 * @augments Page
 */
export default class CSATPage extends Page {
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({root, layout}: PageRenderInterface) {
        root.innerHTML = template();
        super.render({root, layout});
    }
}