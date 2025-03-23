'use strict';

import BaseRoute from "./BaseRoute.js";
import PageManager from "../managers/PageManager.js";
import RouteManager from "../managers/RouteManager/RouteManager.js";
import User from "../models/User.js";

/**
 * @class RegisterRoute
 * @description Класс для обработки маршрута страницы регистрации.
 * @extends BaseRoute
 */
export class RegisterRoute extends BaseRoute {
    process() {
        if (User.isAuthenticated()) {
            return RouteManager.navigateTo('/');
        }
        return PageManager.renderPage('register', {});
    }
}