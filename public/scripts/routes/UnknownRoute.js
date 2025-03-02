'use strict';

import BaseRoute from "./BaseRoute.js";

/**
 * @class UnknownRoute
 * @description Класс для обработки маршрута неизвестной страницы.
 * @extends BaseRoute
 */
export class UnknownRoute extends BaseRoute {
    process() {
        window.pageManager.renderPage('404', {});
    }
}