'use strict';

import BaseRoute from "./baseRoute.js";
import PageManager from "../managers/pageManager.js";
import RouteManager from "../managers/routeManager/routeManager.js";
import User from "../models/user.js";

/**
 * @class RegisterRoute
 * @description Класс для обработки маршрута страницы регистрации.
 * @augments BaseRoute
 */
export class RegisterRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     * @returns {void}
     */
    process() {
        if (User.isAuthenticated()) {
            return RouteManager.navigateTo('/');
        }
        return PageManager.renderPage('register', {});
    }
}