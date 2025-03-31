'use strict';

import BaseRoute from "./baseRoute.js";
import PageManager from "../managers/pageManager.js";

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