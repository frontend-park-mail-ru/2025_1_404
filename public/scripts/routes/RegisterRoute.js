'use strict';

import BaseRoute from "./BaseRoute.js";
import RouteManager from "../managers/RouteManager.js";
import PageManager from "../managers/PageManager.js";

/**
 * @class RegisterRoute
 * @description Класс для обработки маршрута страницы регистрации.
 * @extends BaseRoute
 */
export class RegisterRoute extends BaseRoute {
    process() {
        if (window.currentUser !== null) {
            return RouteManager.navigateTo('/');
        }
        return PageManager.renderPage('register', {});
    }
}