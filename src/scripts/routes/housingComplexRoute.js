'use strict';

import BaseRoute from "./baseRoute.js";
import PageManager from "../managers/pageManager.js";

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
    process({id}) {
        PageManager.renderPage('zhk', {id});
    }
}