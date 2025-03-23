'use strict';

import BaseRoute from "../BaseRoute.js";
import PageManager from "../../managers/PageManager.js";

/**
 * @class OfferCreateAddressRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания адреса.
 * @extends BaseRoute
 */
export class OfferCreateAddressRoute extends BaseRoute {
    process() {
        PageManager.renderPage('offerCreateAddress', {});
    }
}