'use strict'

import Filter from "../../components/filter/index.js";
import Page from "../page.js";
import template from './template.precompiled.js';

/**
 * @class SearchPage
 * @description Страница поиска объявлений
 * @augments Page
 */
export default class SearchPage extends Page {
    /**
     * @function render
     * @description Метод рендеринга компонента
     * @param {HTMLElement} root корневой элемент страницы
     */
    render({root}) {
        root.innerHTML = template();
        super.render(root);

        this._filter = new Filter();
    }
}