'use strict';

import BaseComponent from "../BaseComponent.js";
import template from './ProfileLeft.precompiled.js';
import {logout} from "../../util/ApiUtil.js";
import RouteManager from "../../managers/RouteManager.js";
import PageManager from "../../managers/PageManager.js";
import MainLayout from "../../layouts/main/MainLayout.js";

/**
 * @class ProfileLeft
 * @description Компонент левой части профиля.
 * @extends BaseComponent
 */
export default class ProfileLeft extends BaseComponent {
    constructor() {
        super({});
        this.currentProfilePage = null;

        this._mainPageButton = document.getElementById("profileMainButton");
        this._mainPageButtonHandler = this._mainPageButtonHandler.bind(this);
        this._mainPageButton.addEventListener('click', this._mainPageButtonHandler);

        this._offerCreatePageButton = document.getElementById("offerCreateButton");
        this._offerCreatePageButtonHandler = this._offerCreatePageButtonHandler.bind(this);
        this._offerCreatePageButton.addEventListener('click', this._offerCreatePageButtonHandler);

        this._myOffersButton = document.getElementById('profileMyOffersButton');
        this._myOffersButtonHandler = this._myOffersButtonHandler.bind(this);
        this._myOffersButton.addEventListener('click', this._myOffersButtonHandler);

        this._logoutButton = document.getElementById('profileLogoutButton');
        this._logoutButtonHandler = this._logoutButtonHandler.bind(this);
        this._logoutButton.addEventListener('click', this._logoutButtonHandler);
    }

    destroy() {
        this._mainPageButton.removeEventListener('click', this._mainPageButtonHandler);
        this._offerCreatePageButton.removeEventListener('click',this._offerCreatePageButtonHandler);
        this._myOffersButton.removeEventListener('click', this._myOffersButtonHandler);
        this._logoutButton.removeEventListener('click', this._logoutButtonHandler);
        super.destroy();
    }

    /**
     * @method _mainPageButtonHandler
     * @description Обработчик события перехода на главную страницу профиля
     * @private
     */
    _mainPageButtonHandler() {
        RouteManager.navigateTo('/profile');
    }

    /**
     * @method _offerCreatePageButtonHandler
     * @description Обработчик события перехода на страницу создания объявления
     * @private
     */
    _offerCreatePageButtonHandler() {
        RouteManager.navigateTo('/offer/create/type');
    }

    /**
     * @method _myOffersButtonHandler
     * @description Обработчик события перехода на страницу "мои объявления"
     * @private
     */
    _myOffersButtonHandler() {
        RouteManager.navigateTo('/profile/offers');
    }

    /**
     * @method _logoutButtonHandler
     * @description Обработчик события кнопки выхода из аккаунта на странице профиля
     * @private
     */
    _logoutButtonHandler() {
        logout().then(() => {
            window.currentUser = null;
            MainLayout.setHeaderStatus(false);
        })
    }
}