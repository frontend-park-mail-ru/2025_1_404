'use strict'

import Page from "../page.js";
import template from './template.precompiled.js';
import Filter from "../../components/filter/index.js";

/**
 * @class SearchPage
 * @description Страница поиска объявлений
 * @extends Page
 */
export default class SearchPage extends Page {
    render({root}) {
        root.innerHTML = template();
        super.render(root);

        this._filter = new Filter();
    }
}