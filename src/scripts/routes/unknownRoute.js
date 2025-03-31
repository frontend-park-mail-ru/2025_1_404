'use strict';

import BaseRoute from "./baseRoute.js";
import PageManager from "../managers/pageManager.js";

/**
 * @class UnknownRoute
 * @description Класс для обработки маршрута неизвестной страницы.
 * @extends BaseRoute
 */
export class UnknownRoute extends BaseRoute {
    process() {
        PageManager.renderPage('404', {});
    }
}