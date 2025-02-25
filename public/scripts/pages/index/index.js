'use strict'

import Page from '../page.js';
import template from "./index.precompiled.js";

// Главная страница
export default class IndexPage extends Page {

    _switchButtonHandler() {
        pageManager.navigateTo('register');
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