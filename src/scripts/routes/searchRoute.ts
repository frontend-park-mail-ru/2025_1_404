
import BaseRoute from "./baseRoute.ts";
import PageManager from "../managers/pageManager.ts";

/**
 * @class SearchRoute
 * @description Класс для обработки маршрута страницы поиска объявлений.
 * @augments BaseRoute
 */
export class SearchRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод обработки маршрута.
     */
    process() {
        PageManager.renderPage('search', {});
    }
}