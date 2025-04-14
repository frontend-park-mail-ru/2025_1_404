
import BaseRoute from "./baseRoute.ts";
import PageManager from "../managers/pageManager.ts";

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