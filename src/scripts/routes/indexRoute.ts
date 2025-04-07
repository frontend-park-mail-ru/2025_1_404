
import BaseRoute from "./baseRoute.js";
import PageManager from "../managers/pageManager.js";

/**
 * @class IndexRoute
 * @description Класс для обработки маршрута главной страницы.
 * @augments BaseRoute
 */
export class IndexRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     */
    process() {
        PageManager.renderPage('index', {});
    }
}