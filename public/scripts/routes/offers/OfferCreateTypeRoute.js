'use strict';

import BaseRoute from "../BaseRoute.js";
import PageManager from "../../managers/PageManager.js";

/**
 * @class OfferCreateTypeRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания типа.
 * @extends BaseRoute
 */
export class OfferCreateTypeRoute extends BaseRoute {
    process() {
        PageManager.renderPage('offerCreateType', {});
    }
}