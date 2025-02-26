import BaseRoute from "./BaseRoute.js";

/**
 * @class UnknownRoute
 * @description Класс для обработки маршрута неизвестной страницы.
 * @extends BaseRoute
 */
export class UnknownRoute extends BaseRoute {
    process(path) {
        pageManager.renderPage('404', {});
    }
}