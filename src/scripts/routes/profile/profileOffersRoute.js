'use strict';

import BaseRoute from "../baseRoute.js";
import PageManager from "../../managers/pageManager.js";

/**
 * @class ProfileOffersRoute
 * @description Класс для обработки маршрута страницы профиля, вкладка с объявлениями.
 * @extends BaseRoute
 */
export class ProfileOffersRoute extends BaseRoute {
    process() {
        PageManager.renderPage('offers', {});
    }
}