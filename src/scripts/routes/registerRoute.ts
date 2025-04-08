
import BaseRoute from "./baseRoute.ts";
import PageManager from "../managers/pageManager.ts";
import RouteManager from "../managers/routeManager/routeManager.ts";
import User from "../models/user.ts";

/**
 * @class RegisterRoute
 * @description Класс для обработки маршрута страницы регистрации.
 * @augments BaseRoute
 */
export class RegisterRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     */
    process() {
        if (User.isAuthenticated()) {
            return RouteManager.navigateTo('/');
        }
        return PageManager.renderPage('register', {});
    }
}