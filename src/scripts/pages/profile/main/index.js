'use strict'

import Page from '../../page.js';
import template from "./template.precompiled.js";

/**
 * @class ProfileMainPage
 * @description Основная страница профиля
 * @extends Page
 */
export default class ProfileMainPage extends Page {
    render({root}) {
        root.innerHTML = template();
        super.render(root);
    }

    destroy() {
        super.destroy();
    }
}