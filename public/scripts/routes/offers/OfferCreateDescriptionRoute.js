'use strict';

import BaseRoute from "../BaseRoute.js";
import PageManager from "../../managers/PageManager.js";

/**
 * @class OfferCreateDescriptionRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе описания.
 * @extends BaseRoute
 */
export class OfferCreateDescriptionRoute extends BaseRoute {
    process(params) {
        PageManager.renderPage('offerCreateDescription', {});
    }
}