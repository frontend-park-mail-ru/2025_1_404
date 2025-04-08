
import Filter from "../../components/filter";
import {Page, PageRenderInterface} from "../page.ts";
import template from './template.precompiled.js';

/**
 * @class SearchPage
 * @description Страница поиска объявлений
 * @augments Page
 */
export default class SearchPage extends Page {
    private _filter: Filter | undefined;
    /**
     * @function render
     * @description Метод рендеринга компонента
     * @param {HTMLElement} root корневой элемент страницы
     */
    render({root, layout}: PageRenderInterface) {
        root.innerHTML = template();
        super.render({root, layout});

        this._filter = new Filter({page: this, layout});
    }
}