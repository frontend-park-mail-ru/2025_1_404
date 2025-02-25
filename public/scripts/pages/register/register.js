'use strict'

import Page from '../page.js';
import template from './register.precompiled.js';

// Страница регистрации
export default class RegisterPage extends Page {
    _switchButtonHandler() {
        pageManager.navigateTo('index');
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