'use strict';

import BaseRoute from "../baseRoute.js";
import PageManager from "../../managers/pageManager.js";

/**
 * @class OfferCreatePhotosRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе добавления фотографий.
 * @extends BaseRoute
 */
export class OfferCreatePhotosRoute extends BaseRoute {
    constructor() {
        super();
        this._pageName = 'photos';
    }

    process() {
        PageManager.renderPage(this._pageName, {});
    }
}