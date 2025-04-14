
import BaseRoute from "./baseRoute.ts";
import PageManager from "../managers/pageManager.ts";

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