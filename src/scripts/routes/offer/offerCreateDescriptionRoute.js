'use strict';

import BaseRoute from "../baseRoute.js";
import PageManager from "../../managers/pageManager.js";

/**
 * @class OfferCreateDescriptionRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе описания.
 * @augments BaseRoute
 */
export class OfferCreateDescriptionRoute extends BaseRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super();
        this._pageName = 'description';
    }

    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     */
    process() {
        PageManager.renderPage(this._pageName, {});
    }
}