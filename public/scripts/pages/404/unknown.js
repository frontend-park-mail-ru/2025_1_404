'use strict'

import Page from '../page.js';
import template from "./unknown.precompiled.js";

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

    destroy() {
        super.destroy();
    }
}