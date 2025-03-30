'use strict';

import BaseRoute from "../baseRoute.js";
import PageManager from "../../managers/pageManager.js";

/**
 * @class OfferCreateDescriptionRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе описания.
 * @extends BaseRoute
 */
export class OfferCreateDescriptionRoute extends BaseRoute {
    constructor() {
        super();
        this._pageName = 'description';
    }

    process() {
        PageManager.renderPage(this._pageName, {});
    }
}