/*
    Точка входа приложения в браузере.
    Инициализирует менеджер страниц, регистрирует компоненты для использования в шаблоназиторах и регистрирует страницы.
*/

'use strict';

import {PageManager} from "./managers/PageManager.js";
import IndexPage from "./pages/index/index.js";
import RegisterPage from "./pages/register/register.js";
import registerComponents from "./util/ComponentUtil.js";

window.pageManager = new PageManager();

function init() {
    window.root = document.getElementById('root');

    registerComponents();

    pageManager.registerPage('index', new IndexPage());
    pageManager.registerPage('register', new RegisterPage());

    pageManager.renderPage('index')
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}