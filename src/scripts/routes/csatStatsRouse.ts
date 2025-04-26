
import BaseRoute from "./baseRoute.ts";
import PageManager from "../managers/pageManager.ts";

/**
 * @class CsatStatsRoute
 * @description Класс для обработки маршрута страницы статистики CSAT.
 * @augments BaseRoute
 */
export class CsatStatsRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод обработки маршрута.
     */
    process() {
        PageManager.renderPage('csatStats', {});
    }
}