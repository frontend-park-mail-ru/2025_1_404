'use strict';

import BaseComponent from "../BaseComponent.js";
import template from './ProfileLeft.precompiled.js';
import {logout} from "../../util/ApiUtil.js";

/**
 * @class ProfileLeft
 * @description Компонент левой части профиля.
 * @extends BaseComponent
 */
export default class ProfileLeft extends BaseComponent {
    constructor() {
        super();
        this.currentProfilePage = null;

        this._mainPageButton = document.getElementById("profileMainButton");
        this._mainPageButton.addEventListener('click', () => this._mainPageButtonHandler());

        this._myOffersButton = document.getElementById('profileMyOffersButton');
        this._myOffersButton.addEventListener('click', () => this._myOffersButtonHandler());

        this._logoutButton = document.getElementById('profileLogoutButton');
        this._logoutButton.addEventListener('click', () => this._logoutButtonHandler());
    }

    destroy() {
        this._mainPageButton.removeEventListener('click', () => this._mainPageButtonHandler());
        this._myOffersButton.removeEventListener('click', () => this._myOffersButtonHandler());
        this._logoutButton.removeEventListener('click', () => this._logoutButtonHandler());
        super.destroy();
    }

    /**
     * @method _mainPageButtonHandler
     * @description Обработчик события перехода на главную страницу профиля
     * @private
     */
    _mainPageButtonHandler() {
        window.routeManager.navigateTo('/profile/main');
    }

    /**
     * @method _myOffersButtonHandler
     * @description Обработчик события перехода на страницу "мои объявления"
     * @private
     */
    _myOffersButtonHandler() {
        window.routeManager.navigateTo('/profile/myOffers');
    }

    /**
     * @method _logoutButtonHandler
     * @description Обработчик события кнопки выхода из аккаунта на странице профиля
     * @private
     */
    _logoutButtonHandler() {
        logout().then(() => {
            window.currentUser = null;
            window.pageManager.setHeaderStatus(false);
        })
    }
}