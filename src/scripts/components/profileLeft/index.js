'use strict';

import BaseComponent from "../baseComponent.js";
import MainLayout from "../../layouts/main/index.js";
import RouteManager from "../../managers/routeManager/routeManager.js";
import User from "../../models/user.js";

/**
 * @class ProfileLeft
 * @description Компонент левой части профиля.
 * @extends BaseComponent
 */
export default class ProfileLeft extends BaseComponent {
    constructor() {
        super({});
    }

    initListeners() {
        this.initListener('profileMainButton', 'click', this._mainPageButtonHandler);
        this.initListener('offerCreateButton', 'click', this._offerCreatePageButtonHandler);
        this.initListener('profileMyOffersButton', 'click', this._myOffersButtonHandler);
        this.initListener('profileLogoutButton', 'click', this._logoutButtonHandler);
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
        User.logout().finally(() => {
            MainLayout.setHeaderStatus(false);
        });
    }
}