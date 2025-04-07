
import {Page, PageRenderInterface} from '../../page';
import template from "./template.precompiled.js";

/**
 * @class ProfileMyOffersPage
 * @description Страница "мои объявления" в профиле
 * @augments Page
 */
export default class ProfileMyOffersPage extends Page {
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root} : PageRenderInterface) {
        root.innerHTML = template();
        super.render({layout, root});
    }
}