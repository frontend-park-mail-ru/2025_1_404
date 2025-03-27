'use strict';

import BaseRoute from "./BaseRoute.js";
import PageManager from "../managers/PageManager.js";

/**
 * @class OfferDetailsRoute
 * @description Класс для обработки маршрута страницы подробностей об объявлении.
 * @extends BaseRoute
 */
export class OfferDetailsRoute extends BaseRoute {
    process({id}) {
        PageManager.renderPage('offerDetails', {id});
    }
}