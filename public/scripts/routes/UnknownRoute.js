'use strict';

import BaseRoute from "./BaseRoute.js";
import PageManager from "../managers/PageManager.js";

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