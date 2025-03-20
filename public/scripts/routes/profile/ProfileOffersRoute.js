'use strict';

import BaseRoute from "../BaseRoute.js";
import PageManager from "../../managers/PageManager.js";

/**
 * @class ProfileOffersRoute
 * @description Класс для обработки маршрута страницы профиля, вкладка с объявлениями.
 * @extends BaseRoute
 */
export class ProfileOffersRoute extends BaseRoute {
    process(params) {
        PageManager.renderPage('profileMyOffers', {});
    }
}