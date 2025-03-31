'use strict';

import BaseRoute from "../baseRoute.js";
import PageManager from "../../managers/pageManager.js";

/**
 * @class OfferCreateParamsRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания параметров.
 * @extends BaseRoute
 */
export class OfferCreateParamsRoute extends BaseRoute {
    constructor() {
        super();
        this._pageName = 'params';
    }

    process() {
        PageManager.renderPage(this._pageName, {});
    }
}