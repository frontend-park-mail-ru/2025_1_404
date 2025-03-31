'use strict';

import BaseRoute from "../baseRoute.js";
import PageManager from "../../managers/pageManager.js";

/**
 * @class ProfileMainRoute
 * @description Класс для обработки маршрута страницы профиля, главная вкладка.
 * @extends BaseRoute
 */
export class ProfileMainRoute extends BaseRoute {
    process() {
        PageManager.renderPage('main', {});
    }
}