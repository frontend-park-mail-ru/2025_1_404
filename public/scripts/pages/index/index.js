'use strict'

import Page from '../page.js';
import template from "./index.precompiled.js";

/**
 * @class IndexPage
 * @description Страница входа
 * @extends Page
 */
export default class IndexPage extends Page {

    /**
     * @method _switchButtonHandler
     * @description Обработчик события перехода на страницу регистрации
     * @private
     */
    _switchButtonHandler() {
        routeManager.navigateTo('/register');
    }

    _switchButton = null;

    render(root, path) {
        root.innerHTML = template();
        this._switchButton = document.getElementById('switchButton');
        this._switchButton.addEventListener('click', () => this._switchButtonHandler());
    }

    destroy() {
        if (this._switchButton) {
            this._switchButton.removeEventListener('click', this._switchButtonHandler);
        }
    }
}