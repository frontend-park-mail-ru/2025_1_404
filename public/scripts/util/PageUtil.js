'use strict';

import RegisterPage from "../pages/register/register.js";
import IndexPage from "../pages/index/index.js";

/**
 * @description Регистрация страниц
 */
export default function registerPages() {
    pageManager.registerPage('index', new IndexPage());
    pageManager.registerPage('register', new RegisterPage());
}