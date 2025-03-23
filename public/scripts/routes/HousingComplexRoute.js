'use strict';

import BaseRoute from "./BaseRoute.js";
import PageManager from "../managers/PageManager.js";

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