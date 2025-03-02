'use strict';

import BaseRoute from "./BaseRoute.js";

/**
 * @class IndexRoute
 * @description Класс для обработки маршрута главной страницы.
 * @extends BaseRoute
 */
export class IndexRoute extends BaseRoute {
    process() {
        window.pageManager.renderPage('index', {});
    }
}