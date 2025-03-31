import BaseComponent from "../baseComponent.js";
import RouteManager from "../../managers/routeManager/routeManager.js";
import User from "../../models/user.js";

/**
 * @class Header
 * @description Компонент хедера.
 * @extends BaseComponent
 */
export default class Header extends BaseComponent {
    constructor({page, layout}) {
        super({layout, page});
    }

    initListeners() {
        this.initListenerForClass('logo-href', 'click', this._logoHrefHandler);
        this.initListener('profile-href', 'click', this._profileHrefHandler);
        this.initListener('registerButton', 'click', this._registerButtonHandler);
        this.initListener('loginButton', 'click', this._loginButtonHandler);
        this.initListener('logoutButton', 'click', this._logoutButtonHandler);
    }

    _profileHrefHandler(event) {
        event.preventDefault();
        RouteManager.navigateTo('/profile');
    }

    /**
     * @method _logoHrefHandler
     * @description Обработчик клика по логотипу в шапке
     * @param event
     * @private
     */
    _logoHrefHandler(event) {
        event.preventDefault();
        RouteManager.navigateTo('/');
    }

    /**
     * @method _registerButtonHandler
     * @description Обработчик события перехода на страницу регистрации
     * @private
     */
    _registerButtonHandler() {
        RouteManager.navigateTo('/register');
    }

    /**
     * @method _loginButtonHandler
     * @description Обработчик события открытия окна входа
     * @private
     */
    _loginButtonHandler() {
        this.layout.emit('showLogin');
    }

    /**
     * @method _logoutButtonHandler
     * @description Обработчик события кнопки выхода из аккаунта
     * @private
     */
    _logoutButtonHandler() {
        User.logout().finally(() => {
            this.layout.emit('logout');
        });
    }
}