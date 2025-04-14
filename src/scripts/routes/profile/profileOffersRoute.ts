
import BaseRoute from "../baseRoute.ts";
import PageManager from "../../managers/pageManager.ts";

/**
 * @class ProfileOffersRoute
 * @description Класс для обработки маршрута страницы профиля, вкладка с объявлениями.
 * @augments BaseRoute
 */
export class ProfileOffersRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     */
    process() {
        PageManager.renderPage('offers', {activeProfileTabIndex: 3});
    }
}