'use strict';

import BaseRoute from "../BaseRoute.js";
import PageManager from "../../managers/PageManager.js";

/**
 * @class ProfileMainRoute
 * @description Класс для обработки маршрута страницы профиля, главная вкладка.
 * @extends BaseRoute
 */
export class ProfileMainRoute extends BaseRoute {
    process(params) {
        PageManager.renderPage('profileMain', {});
    }
}