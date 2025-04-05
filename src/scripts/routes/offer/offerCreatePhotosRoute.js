'use strict';

import BaseRoute from "../baseRoute.js";
import PageManager from "../../managers/pageManager.js";

/**
 * @class OfferCreatePhotosRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе добавления фотографий.
 * @augments BaseRoute
 */
export class OfferCreatePhotosRoute extends BaseRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super();
        this._pageName = 'photos';
    }

    /**
     * @function process
     * @description Метод обработки маршрута.
     */
    process() {
        PageManager.renderPage(this._pageName, {});
    }
}