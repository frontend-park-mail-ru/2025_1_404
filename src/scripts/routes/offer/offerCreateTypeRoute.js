'use strict';

import BaseRoute from "../baseRoute.js";
import PageManager from "../../managers/pageManager.js";

/**
 * @class OfferCreateTypeRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания типа.
 * @extends BaseRoute
 */
export class OfferCreateTypeRoute extends BaseRoute {
    constructor() {
        super();
        this._pageName = 'type';
    }

    process() {
        PageManager.renderPage(this._pageName, {});
    }
}