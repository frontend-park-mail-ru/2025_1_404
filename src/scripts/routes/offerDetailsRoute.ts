
import BaseRoute from "./baseRoute.ts";
import PageManager from "../managers/pageManager.ts";
import RouteManager from "../managers/routeManager/routeManager.ts";

/**
 * @interface OfferDetailsRouteParams
 * @description Интерфейс для параметров маршрута страницы подробностей об объявлении.
 */
interface OfferDetailsRouteParams {
    /**
     * @property {number} id ID объявления.
     */
    id: string;
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
     * @param {string} id ID объявления.
     */
    process({id}: OfferDetailsRouteParams) {
        const idNumber = parseInt(id, 10);
        if (isNaN(idNumber)) {
            RouteManager.navigateTo('/');
            return;
        }
        PageManager.renderPage('offerDetails', {id: idNumber});
    }
}