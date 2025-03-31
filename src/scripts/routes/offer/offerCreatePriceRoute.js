'use strict';

import BaseRoute from "../baseRoute.js";
import PageManager from "../../managers/pageManager.js";

/**
 * @class OfferCreatePriceRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания цены.
 * @extends BaseRoute
 */
export class OfferCreatePriceRoute extends BaseRoute {
    constructor() {
        super();
        this._pageName = 'price';
    }

    process() {
        PageManager.renderPage(this._pageName, {});
    }
}