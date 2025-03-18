'use strict';

import BaseRoute from "./BaseRoute.js";

/**
 * @class OfferCreateRoute
 * @description Класс для обработки маршрута страницы создания объявления.
 * @extends BaseRoute
 */
export class OfferCreateRoute extends BaseRoute {
    process(path) {
        switch (path.join()) {
            case "type":
                window.pageManager.renderPage('offerCreateType', {});
                break;
            case "address":
                window.pageManager.renderPage('offerCreateAddress', {});
                break;
            case "params":
                window.pageManager.renderPage('offerCreateParams', {});
                break;
            case "price":
                window.pageManager.renderPage('offerCreatePrice', {});
                break;
            case "photos":
                window.pageManager.renderPage('offerCreatePhotos', {});
                break;
            case "description":
                window.pageManager.renderPage('offerCreateDescription', {});
                break;
        }

    }
}