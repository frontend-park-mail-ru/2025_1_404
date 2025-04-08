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
        this.initListenerForClass('logo-href', 'click', this._logoHrefHandler);
        this.initListener('profile-href', 'click', this._profileHrefHandler);
        this.initListener('registerButton', 'click', this._registerButtonHandler);
        this.initListener('loginButton', 'click', this._loginButtonHandler);
        this.initListener('logoutButton', 'click', this._logoutButtonHandler);
    }

    /**
     * @function _profileHrefHandler
     * @description Обработчик клика по ссылке на профиль в шапке
     * @param {Event} event событие клика
     * @private
     */
    _profileHrefHandler(event: Event) {
        event.preventDefault();
        RouteManager.navigateTo('/profile');
    }

    /**
     * @function _logoHrefHandler
     * @description Обработчик клика по логотипу в шапке
     * @param {Event} event событие клика
     * @private
     */
    _logoHrefHandler(event: Event) {
        event.preventDefault();
        RouteManager.navigateTo('/');
    }

    /**
     * @function _registerButtonHandler
     * @description Обработчик события перехода на страницу регистрации
     * @private
     */
    _registerButtonHandler() {
        RouteManager.navigateTo('/register');
    }

    /**
     * @function _loginButtonHandler
     * @description Обработчик события открытия окна входа
     * @private
     */
    _loginButtonHandler() {
        if (!this.layout) {
            return;
        }
        this.layout.emit('showLogin');
    }

    /**
     * @function _logoutButtonHandler
     * @description Обработчик события кнопки выхода из аккаунта
     * @private
     */
    _logoutButtonHandler() {
        if (!this.layout) {
            return;
        }
        this.layout.makeRequest(User.logout.bind(User)).finally(() => {
            if (!this.layout) {
                return;
            }
            this.layout.emit('logout');
        });
    }
}