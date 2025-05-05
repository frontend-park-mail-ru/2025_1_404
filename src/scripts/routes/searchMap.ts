
import BaseRoute from "./baseRoute.ts";
import PageManager from "../managers/pageManager.ts";

/**
 * @class SearchMapRoute
 * @description Класс для обработки маршрута страницы поиска объявлений с картой.
 * @augments BaseRoute
 */
export class SearchMapRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод обработки маршрута.
     */
    process() {
        PageManager.renderPage('searchMap', {});
    }
}