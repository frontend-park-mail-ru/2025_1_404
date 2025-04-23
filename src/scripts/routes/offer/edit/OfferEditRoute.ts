
import BaseRoute from "../../baseRoute.ts";
import PageManager from "../../../managers/pageManager.ts";
import RouteManager from "../../../managers/routeManager/routeManager.ts";

interface OfferEditRouteParams {
    /**
     * @property {number} id ID объявления.
     */
    id: string;
}

/**
 * @class OfferEditRoute
 * @description Класс для обработки маршрута страницы создания объявления
 * @augments BaseRoute
 */
export class OfferEditRoute extends BaseRoute {
    private pageName: string;
    /**
     * @description Конструктор класса.c
     * @param {string} pageName имя страницы
     */
    constructor(pageName: string) {
        super();
        this.pageName = pageName;
    }

    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     * @param {string} id ID объявления
     */
    process({id}: OfferEditRouteParams) {
        const idNumber = parseInt(id, 10);
        if (isNaN(idNumber)) {
            RouteManager.navigateTo('/');
            return;
        }
        PageManager.renderPage(this.pageName, {id: idNumber});
    }
}