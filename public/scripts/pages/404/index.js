'use strict'

import Page from '../page.js';
import template from "./template.precompiled.js";

/**
 * @class UnknownPage
 * @description Страница 404
 * @extends Page
 */
export default class UnknownPage extends Page {
    render(root) {
        root.innerHTML = template();

        super.render(root);
    }
}