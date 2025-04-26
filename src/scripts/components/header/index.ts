import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";
import User from "../../models/user.ts";

/**
 * @class Header
 * @description Компонент хедера.
 * @augments BaseComponent
 */
export default class Header extends BaseComponent {
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
        this.initListenerForClass('logo-href', 'click', this.logoHrefHandler);
        this.initListener('profile-href', 'click', this.profileHrefHandler);
        this.initListener('registerButton', 'click', this.registerButtonHandler);
        this.initListener('loginButton', 'click', this.loginButtonHandler);
        this.initListener('favoritesButton', 'click', this.favoritesButtonHandler);
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
     * @function logoHrefHandler
     * @description Обработчик клика по логотипу в шапке
     * @param {Event} event событие клика
     * @private
     */
    private logoHrefHandler(event: Event) {
        event.preventDefault();
        RouteManager.navigateTo('/');
    }

    /**
     * @function registerButtonHandler
     * @description Обработчик события перехода на страницу регистрации
     * @private
     */
    private registerButtonHandler() {
        RouteManager.navigateTo('/register');
    }

    /**
     * @function loginButtonHandler
     * @description Обработчик события открытия окна входа
     * @private
     */
    private loginButtonHandler() {
        if (!this.layout) {
            return;
        }
        this.layout.emit('showLogin');
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