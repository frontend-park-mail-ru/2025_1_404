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
     * @method _registerButtonHandler
     * @description Обработчик события перехода на страницу регистрации
     * @private
     */
    _registerButtonHandler() {
        routeManager.navigateTo('/register');
    }

    _loginButtonHandler() {
        document.querySelector(".login").classList.add('active');
        document.querySelector(".overlay").classList.add('active');
    }

    _loginCloseButtonHandler() {
        document.querySelector(".login").classList.remove('active');
        document.querySelector(".overlay").classList.remove('active');
    }

    _registerButton = null;
    _loginButton = null;
    _loginCloseButton = null;

    render(root, path) {
        root.innerHTML = template();
        this._registerButton = document.getElementById('registerButton');
        this._registerButton.addEventListener('click', () => this._registerButtonHandler());

        this._loginButton = document.getElementById('loginButton');
        this._loginButton.addEventListener('click', () => this._loginButtonHandler())

        this._loginCloseButton = document.getElementById('loginCloseButton');
        this._loginCloseButton.addEventListener('click', () => this._loginCloseButtonHandler())

    }

    destroy() {
        if (this._switchButton) {
            this._switchButton.removeEventListener('click', this._switchButtonHandler);
        }
        if (this._loginButton) {
            this._loginButton.removeEventListener('click', this._loginButtonHandler);
        }
        if (this._loginCloseButton) {
            this._loginCloseButton.removeEventListener('click', this._loginCloseButtonHandler);
        }
    }
}