'use strict';

import BaseRoute from "../BaseRoute.js";
import PageManager from "../../managers/PageManager.js";

/**
 * @class OfferCreatePriceRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания цены.
 * @extends BaseRoute
 */
export class OfferCreatePriceRoute extends BaseRoute {
    process() {
        PageManager.renderPage('offerCreatePrice', {});
    }
}