'use strict';

import BaseRoute from "../baseRoute.js";
import PageManager from "../../managers/pageManager.js";

/**
 * @class OfferCreatePriceRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания цены.
 * @augments BaseRoute
 */
export class OfferCreatePriceRoute extends BaseRoute {
    /**
     * @description Конструктор класса.c
     */
    constructor() {
        super();
        this._pageName = 'price';
    }

    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     */
    process() {
        PageManager.renderPage(this._pageName, {});
    }
}