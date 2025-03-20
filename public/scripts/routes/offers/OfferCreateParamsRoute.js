'use strict';

import BaseRoute from "../BaseRoute.js";
import PageManager from "../../managers/PageManager.js";

/**
 * @class OfferCreateParamsRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания параметров.
 * @extends BaseRoute
 */
export class OfferCreateParamsRoute extends BaseRoute {
    process(params) {
        PageManager.renderPage('offerCreateParams', {});
    }
}