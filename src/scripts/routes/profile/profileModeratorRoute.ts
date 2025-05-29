
import BaseRoute from "../baseRoute.ts";
import PageManager from "../../managers/pageManager.ts";
import User from "../../models/user.ts";

/**
 * @class ProfileModeratorRoute
 * @description Класс для обработки маршрута страницы профиля, вкладка модератора.
 * @augments BaseRoute
 */
export class ProfileModeratorRoute extends BaseRoute {
    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     */
    process() {
        if (User.isLoaded() && User.isModerator()) {
            PageManager.renderPage('moderator', {activeProfileTabIndex: 4});
            return;
        }
        PageManager.renderPage('index', {});
    }
}