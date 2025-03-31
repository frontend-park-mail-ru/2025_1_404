'use strict';

import BaseRoute from "../baseRoute.js";
import PageManager from "../../managers/pageManager.js";

/**
 * @class OfferCreateAddressRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания адреса.
 * @extends BaseRoute
 */
export class OfferCreateAddressRoute extends BaseRoute {

    constructor() {
        super();
        this._pageName = 'address';
    }

    process() {
        PageManager.renderPage(this._pageName, {});
    }
}