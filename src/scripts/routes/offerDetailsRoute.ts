
import BaseRoute from "./baseRoute.js";
import PageManager from "../managers/pageManager.js";

/**
 * @interface OfferDetailsRouteParams
 * @description Интерфейс для параметров маршрута страницы подробностей об объявлении.
 */
interface OfferDetailsRouteParams {
    /**
     * @property {number} id ID объявления.
     */
    id: number;
}

/**
 * @class OfferDetailsRoute
 * @description Класс для обработки маршрута страницы подробностей об объявлении.
 * @augments BaseRoute
 */
export class OfferDetailsRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     * @param {number} id ID объявления.
     */
    process({id}: OfferDetailsRouteParams) {
        PageManager.renderPage('offerDetails', {id});
    }
}