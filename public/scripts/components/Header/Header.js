import BaseComponent from "../BaseComponent.js";
import {logout} from "../../util/ApiUtil.js";
import RouteManager from "../../managers/RouteManager.js";
import PageManager from "../../managers/PageManager.js";
import MainLayout from "../../layouts/main/MainLayout.js";

/**
 * @class Header
 * @description Компонент хедера.
 * @extends BaseComponent
 */
export default class Header extends BaseComponent {
    constructor({page, layout}) {
        super({page, layout});
        this._registerButton = document.getElementById('registerButton');
        this._registerButtonHandler = this._registerButtonHandler.bind(this);
        this._registerButton.addEventListener('click', this._registerButtonHandler);

        this._loginButton = document.getElementById('loginButton');
        this._loginButtonHandler = this._loginButtonHandler.bind(this);
        this._loginButton.addEventListener('click', this._loginButtonHandler);

        this._logoutButton = document.getElementById('logoutButton');
        this._logoutButtonHandler = this._logoutButtonHandler.bind(this);
        this._logoutButton.addEventListener('click', this._logoutButtonHandler);
    }

    destroy() {
        this._registerButton.removeEventListener('click', this._registerButtonHandler);
        this._loginButton.removeEventListener('click', this._loginButtonHandler);
        this._logoutButton.removeEventListener('click', this._logoutButtonHandler);
        super.destroy();
    }

    _profileHrefHandler(event) {
        event.preventDefault();
        RouteManager.navigateTo('/profile');
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
        logout().then(() => {
            this.layout.emit('logout');
        })
    }
}