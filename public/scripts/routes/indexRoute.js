'use strict';

import BaseRoute from "./baseRoute.js";
import PageManager from "../managers/pageManager.js";

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