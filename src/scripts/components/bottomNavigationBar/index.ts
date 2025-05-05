import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import template from './template.precompiled.js';
import RouteManager from "../../managers/routeManager/routeManager.ts";
import User from "../../models/user.ts";

/**
 * @class BottomNavigationBar
 * @description Компонент навигации внизу страницы (для телефонов).
 * @augments BaseComponent
 */
export default class BottomNavigationBar extends BaseComponent {
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({layout, page});
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('bottonNavProfile', 'click', this.profileHrefHandler);
        this.initListener('bottonNavFavourites', 'click', this.favoritesButtonHandler);
    }

    /**
     * @function profileHrefHandler
     * @description Обработчик клика по ссылке на профиль в шапке
     * @param {Event} event событие клика
     * @private
     */
    private profileHrefHandler(event: Event) {
        event.preventDefault();
        RouteManager.navigateTo('/profile');
    }


    /**
     * @function favoritesButtonHandler
     * @description Обработчик события перехода на страницу избранного
     * @param {Event} e событие клика
     * @private
     */
    private favoritesButtonHandler(e: Event) {
        e.preventDefault();
        if (User.isAuthenticated()) {
            RouteManager.navigateTo('/profile/favorites');
            return;
        }
        this.layout?.emit('showLogin');
    }
}