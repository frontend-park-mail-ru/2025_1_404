'use strict';

import HousingComlpexPage from "../pages/housing-complex/housing-complex.js";
import IndexPage from "../pages/index/index.js";
import RegisterPage from "../pages/register/register.js";

/**
 * @function registerPages
 * @description Регистрация страниц
 */
export default function registerPages() {
    window.pageManager.registerPage('index', new IndexPage());
    window.pageManager.registerPage('register', new RegisterPage());
    window.pageManager.registerPage('zhk', new HousingComlpexPage());
}