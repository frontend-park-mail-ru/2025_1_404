'use strict'

import Page from '../page.js';
import template from './register.precompiled.js';

/**
 * @class RegisterPage
 * @description Страница регистрации
 * @extends Page
 */
export default class RegisterPage extends Page {

    render(root) {
        root.innerHTML = template();
        // TODO: Логика страницы регистрации
    }

    destroy() {

    }
}