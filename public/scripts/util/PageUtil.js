'use strict';

import IndexPage from "../pages/index/index.js";
import RegisterPage from "../pages/register/register.js";

/**
 * @function registerPages
 * @description Регистрация страниц
 */
export default function registerPages() {
    window.pageManager.registerPage('index', new IndexPage());
    window.pageManager.registerPage('register', new RegisterPage());
}