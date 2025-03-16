'use strict';

import IndexPage from "../pages/index/index.js";
import RegisterPage from "../pages/register/register.js";
import ProfilePage from "../pages/profile/profileMain/profileMain.js";
import ProfileMainPage from "../pages/profile/profileMain/profileMain.js";
import ProfileMyOffersPage from "../pages/profile/profileMyOffers/profileMyOffers.js";

/**
 * @function registerPages
 * @description Регистрация страниц
 */
export default function registerPages() {
    window.pageManager.registerPage('index', new IndexPage());
    window.pageManager.registerPage('register', new RegisterPage());
    window.pageManager.registerPage('profileMain', new ProfileMainPage());
    window.pageManager.registerPage('profileMyOffers', new ProfileMyOffersPage());
}