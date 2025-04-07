'use strict';

import BaseRoute from "../baseRoute.js";
import PageManager from "../../managers/pageManager.js";

/**
 * @class OfferCreateParamsRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания параметров.
 * @augments BaseRoute
 */
export class OfferCreateParamsRoute extends BaseRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super();
        this._pageName = 'params';
    }

    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     */
    process() {
        PageManager.renderPage(this._pageName, {});
    }
}