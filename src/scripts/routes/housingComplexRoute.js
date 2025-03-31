'use strict';

import BaseRoute from "./baseRoute.js";
import PageManager from "../managers/pageManager.js";

/**
 * @class HousingComplexRoute
 * @description Класс для обработки маршрута страницы Жилищного комплекса.
 * @extends BaseRoute
 */
export class HousingComplexRoute extends BaseRoute {
    process({id}) {
        PageManager.renderPage('zhk', {id});
    }
}