'use strict';

import BaseRoute from "../BaseRoute.js";
import PageManager from "../../managers/PageManager.js";

/**
 * @class OfferCreatePhotosRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе добавления фотографий.
 * @extends BaseRoute
 */
export class OfferCreatePhotosRoute extends BaseRoute {
    process() {
        PageManager.renderPage('offerCreatePhotos', {});
    }
}