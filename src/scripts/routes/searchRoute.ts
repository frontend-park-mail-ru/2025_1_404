
import BaseRoute from "./baseRoute.js";
import PageManager from "../managers/pageManager.js";

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
        return PageManager.renderPage('search', {});
    }
}