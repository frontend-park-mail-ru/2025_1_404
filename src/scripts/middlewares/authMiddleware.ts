
import BaseMiddleware from "./baseMiddleware";
import RouteManager from "../managers/routeManager/routeManager.ts";
import User from "../models/user.ts";
import BaseRoute from "../routes/baseRoute.ts";

/**
 * @class AuthMiddleware
 * @description Middleware для проверки авторизации пользователя.
 * @augments BaseMiddleware
 */
export default class AuthMiddleware extends BaseMiddleware {
    /**
     * @function check
     * @description Метод предварительной обработки маршрута.
     * @param {BaseRoute} route маршрут.
     * @returns {{process: ((function(*): (*))|*)}} Итоговый метод обработки маршрута.
     */
    check(route: BaseRoute) {
        return {
            process: (params?: unknown) => {
                if (User.isLoaded() && !User.isAuthenticated()) {
                    return RouteManager.navigateTo('/login');
                }
                return super.check(route).process(params);
            }
        }
    }
}