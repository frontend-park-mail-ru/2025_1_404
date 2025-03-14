import BaseComponent from "../BaseComponent.js";
import {logout} from "../../util/ApiUtil.js";

/**
 * @class Header
 * @description Компонент хедера.
 * @extends BaseComponent
 */
export default class Header extends BaseComponent {
    constructor() {
        super();
        this._registerButton = document.getElementById('registerButton');
        this._registerButton.addEventListener('click', () => this._registerButtonHandler());

        this._loginButton = document.getElementById('loginButton');
        this._loginButton.addEventListener('click', () => this._loginButtonHandler());

        this._logoutButton = document.getElementById('logoutButton');
        this._logoutButton.addEventListener('click', () => this._logoutButtonHandler());
    }

    destroy() {
        this._registerButton.removeEventListener('click', () => this._registerButtonHandler());
        this._loginButton.removeEventListener('click', () => this._loginButtonHandler());
        this._logoutButton.removeEventListener('click', () => this._logoutButtonHandler());
        super.destroy();
    }

    /**
     * @method _registerButtonHandler
     * @description Обработчик события перехода на страницу регистрации
     * @private
     */
    _registerButtonHandler() {
        window.routeManager.navigateTo('/register');
    }

    /**
     * @method _loginButtonHandler
     * @description Обработчик события открытия окна входа
     * @private
     */
    _loginButtonHandler() {
        document.querySelector('#passwordInput').value = '';
        document.querySelector(".login").classList.add('active');
        document.querySelector(".overlay").classList.add('active');
    }

    /**
     * @method _logoutButtonHandler
     * @description Обработчик события кнопки выхода из аккаунта
     * @private
     */
    _logoutButtonHandler() {
        logout().then(() => {
            window.currentUser = null;
            window.pageManager.setHeaderStatus(false);
        })
    }
}