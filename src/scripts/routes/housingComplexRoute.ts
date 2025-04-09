
import BaseRoute from "./baseRoute.ts";
import PageManager from "../managers/pageManager.ts";
import RouteManager from "../managers/routeManager/routeManager.ts";

/**
 * @interface HousingComplexRouteParams
 * @description Интерфейс для параметров маршрута жилищного комплекса.
 */
interface HousingComplexRouteParams {
    /**
     * ID жилищного комплекса.
     */
    id: string;
}

/**
 * @class HousingComplexRoute
 * @description Класс для обработки маршрута страницы Жилищного комплекса.
 * @augments BaseRoute
 */
export class HousingComplexRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод обработки маршрута.
     * @param {number} id ID жилищного комплекса.
     */
    process({id}: HousingComplexRouteParams) {
        const idNumber = parseInt(id);
        if (isNaN(idNumber)) {
            RouteManager.navigateTo('/');
            return;
        }
        PageManager.renderPage('zhk', {id: idNumber});
    }
}