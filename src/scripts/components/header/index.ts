import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";

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
        this.initListener('logoutButton', 'click', this.logoutButtonHandler);
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
     * @function logoutButtonHandler
     * @description Обработчик события кнопки выхода из аккаунта
     * @private
     */
    private logoutButtonHandler() {
        if (!this.layout) {
            return;
        }
        this.layout.emit('tryExit');
    }
}