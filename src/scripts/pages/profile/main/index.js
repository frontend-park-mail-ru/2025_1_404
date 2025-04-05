'use strict'

import Page from '../../page.js';
import template from "./template.precompiled.js";

/**
 * @class ProfileMainPage
 * @description Основная страница профиля
 * @augments Page
 */
export default class ProfileMainPage extends Page {
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({root}) {
        root.innerHTML = template();
        super.render(root);
    }
}