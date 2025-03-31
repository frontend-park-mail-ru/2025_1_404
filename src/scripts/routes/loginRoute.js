'use strict';

import BaseRoute from "./baseRoute.js";
import PageManager from "../managers/pageManager.js";

/**
 * @class LoginRoute
 * @description Класс для обработки маршрута аутентификации.
 * @extends BaseRoute
 */
export class LoginRoute extends BaseRoute {
    process() {
        PageManager.renderPage('index', {
            showLogin: true
        });
    }
}