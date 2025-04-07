
import BaseRoute from "./baseRoute.js";
import PageManager from "../managers/pageManager.js";

/**
 * @interface HousingComplexRouteParams
 * @description Интерфейс для параметров маршрута жилищного комплекса.
 */
interface HousingComplexRouteParams {
    /**
     * ID жилищного комплекса.
     */
    id: number;
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
        PageManager.renderPage('zhk', {id});
    }
}