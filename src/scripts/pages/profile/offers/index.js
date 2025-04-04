'use strict'

import Page from '../../page.js';
import template from "./template.precompiled.js";

/**
 * @class ProfileMyOffersPage
 * @description Страница "мои объявления" в профиле
 * @extends Page
 */
export default class ProfileMyOffersPage extends Page {
    render({root}) {
        root.innerHTML = template();
        super.render(root);
    }

    destroy() {
        super.destroy();
    }
}