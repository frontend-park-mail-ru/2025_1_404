'use strict';

import BaseRoute from "./baseRoute.js";
import PageManager from "../managers/pageManager.js";

/**
 * @class OfferDetailsRoute
 * @description Класс для обработки маршрута страницы подробностей об объявлении.
 * @augments BaseRoute
 */
export class OfferDetailsRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     * @param {number} id ID объявления.
     */
    process({id}) {
        PageManager.renderPage('offerDetails', {id});
    }
}