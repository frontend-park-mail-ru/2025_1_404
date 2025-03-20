'use strict';

import BaseRoute from "./BaseRoute.js";
import PageManager from "../managers/PageManager.js";

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