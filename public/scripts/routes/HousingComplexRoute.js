'use strict';

import BaseRoute from "./BaseRoute.js";

/**
 * @class HousingComplexRoute
 * @description Класс для обработки маршрута страницы Жилищного комплекса.
 * @extends BaseRoute
 */
export class HousingComplexRoute extends BaseRoute {
    process(path) {
        const queryParamsNumber = 1;
        if (path.length !== queryParamsNumber) {
            window.routeManager.navigateTo('/404');
            return;
        }
        const [id] = path;
        window.pageManager.renderPage('zhk', {id});
    }
}