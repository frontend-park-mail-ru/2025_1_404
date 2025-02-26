'use strict'

import Page from '../page.js';
import template from "./index.precompiled.js";

// Главная страница
export default class IndexPage extends Page {

    _registerButtonHandler() {
        pageManager.renderPage('register');
    }

    _registerButton = null;

    render(root) {
        root.innerHTML = template();
        this._registerButton = document.getElementById('registerButton');
        this._registerButton.addEventListener('click', () => this._registerButtonHandler());

    }

    destroy() {
        if (this._switchButton) {
            this._switchButton.removeEventListener('click', this._switchButtonHandler);
        }
    }
}