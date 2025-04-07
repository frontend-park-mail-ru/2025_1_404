'use strict';

import BaseRoute from "./baseRoute.js";
import PageManager from "../managers/pageManager.js";
import RouteManager from "../managers/routeManager/routeManager.js";
import User from "../models/user.js";

/**
 * @class SearchRoute
 * @description Класс для обработки маршрута страницы поиска объявлений.
 * @extends BaseRoute
 */
export class SearchRoute extends BaseRoute {
    process() {
        return PageManager.renderPage('search', {});
    }
}