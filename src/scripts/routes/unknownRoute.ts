
import BaseRoute from "./baseRoute.js";
import PageManager from "../managers/pageManager.js";

/**
 * @class UnknownRoute
 * @description Класс для обработки маршрута неизвестной страницы.
 * @augments BaseRoute
 */
export class UnknownRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     */
    process() {
        PageManager.renderPage('404', {});
    }
}