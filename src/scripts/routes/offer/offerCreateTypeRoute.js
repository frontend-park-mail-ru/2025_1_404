'use strict';

import BaseRoute from "../baseRoute.js";
import PageManager from "../../managers/pageManager.js";

/**
 * @class OfferCreateTypeRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания типа.
 * @augments BaseRoute
 */
export class OfferCreateTypeRoute extends BaseRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super();
        this._pageName = 'type';
    }

    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     */
    process() {
        PageManager.renderPage(this._pageName, {});
    }
}