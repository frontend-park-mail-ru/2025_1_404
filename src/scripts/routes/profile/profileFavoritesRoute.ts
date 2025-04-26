
import BaseRoute from "../baseRoute.ts";
import PageManager from "../../managers/pageManager.ts";

/**
 * @class ProfileFavoritesRoute
 * @description Класс для обработки маршрута страницы профиля, вкладка с объявлениями.
 * @augments BaseRoute
 */
export class ProfileFavoritesRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     */
    process() {
        PageManager.renderPage('favorites', {activeProfileTabIndex: 1});
    }
}