
import BaseRoute from "../baseRoute.ts";
import PageManager from "../../managers/pageManager.ts";

/**
 * @class ProfileMainRoute
 * @description Класс для обработки маршрута страницы профиля, главная вкладка.
 * @augments BaseRoute
 */
export class ProfileMainRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     */
    process() {
        PageManager.renderPage('main', {activeProfileTabIndex: 0});
    }
}