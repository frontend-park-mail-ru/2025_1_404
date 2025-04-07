'use strict';

import BaseRoute from "../baseRoute.js";
import PageManager from "../../managers/pageManager.js";

/**
 * @class OfferCreateAddressRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания адреса.
 * @augments BaseRoute
 */
export class OfferCreateAddressRoute extends BaseRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super();
        this._pageName = 'address';
    }

    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     */
    process() {
        PageManager.renderPage(this._pageName, {});
    }
}