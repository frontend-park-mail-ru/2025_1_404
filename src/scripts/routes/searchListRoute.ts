
import BaseRoute from "./baseRoute.ts";
import PageManager from "../managers/pageManager.ts";

/**
 * @class SearchListRoute
 * @description Класс для обработки маршрута страницы поиска объявлений.
 * @augments BaseRoute
 */
export class SearchListRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод обработки маршрута.
     */
    process() {
        PageManager.renderPage('searchList', {});
    }
}