'use strict'

import BaseMiddleware from "./baseMiddleware.js";
import RouteManager from "../managers/routeManager/routeManager.js";
import User from "../models/user.js";

/**
 * @class AuthMiddleware
 * @description Middleware для проверки авторизации пользователя.
 * @augments BaseMiddleware
 */
export default class AuthMiddleware extends BaseMiddleware {
    /**
     * @function check
     * @description Метод предварительной обработки маршрута.
     * @param {Route} route маршрут.
     * @returns {{process: ((function(*): (*))|*)}} Итоговый метод обработки маршрута.
     */
    check(route) {
        return {
            process: (params) => {
                if (User.isLoaded() && !User.isAuthenticated()) {
                    return RouteManager.navigateTo('/login');
                }
                return super.check(route).process(params);
            }
        }
    }
}