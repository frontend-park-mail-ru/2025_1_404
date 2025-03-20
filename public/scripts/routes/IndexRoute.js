'use strict';

import BaseRoute from "./BaseRoute.js";
import PageManager from "../managers/PageManager.js";

/**
 * @class IndexRoute
 * @description Класс для обработки маршрута главной страницы.
 * @extends BaseRoute
 */
export class IndexRoute extends BaseRoute {
    process() {
        PageManager.renderPage('index', {});
    }
}