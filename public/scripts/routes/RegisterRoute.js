'use strict';

import BaseRoute from "./BaseRoute.js";

/**
 * @class RegisterRoute
 * @description Класс для обработки маршрута страницы регистрации.
 * @extends BaseRoute
 */
export class RegisterRoute extends BaseRoute {
    process() {
        window.pageManager.renderPage('register', {});
    }
}