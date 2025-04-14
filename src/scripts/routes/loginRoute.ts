
import BaseRoute from "./baseRoute.ts";
import PageManager from "../managers/pageManager.ts";

/**
 * @class LoginRoute
 * @description Класс для обработки маршрута аутентификации.
 * @augments BaseRoute
 */
export class LoginRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     */
    process() {
        PageManager.renderPage('index', {
            showLogin: true
        });
    }
}