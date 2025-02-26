'use strict'

import Page from '../page.js';
import template from './register.precompiled.js';

/**
 * @class RegisterPage
 * @description Страница регистрации
 * @extends Page
 */
export default class RegisterPage extends Page {

    /**
     * @method _switchButtonHandler
     * @description Обработчик события перехода на главную страницу
     * @private
     */
    _switchButtonHandler() {
        routeManager.navigateTo('/');
    }

    _switchButton = null;

    render(root, path) {
        root.innerHTML = template();
        this._switchButton = document.getElementById('switchButton');
        this._switchButton.addEventListener('click', () => this._switchButtonHandler(event));
    }

    destroy() {
        if (this._switchButton) {
            this._switchButton.removeEventListener('click', this._switchButtonHandler);
        }
    }
}