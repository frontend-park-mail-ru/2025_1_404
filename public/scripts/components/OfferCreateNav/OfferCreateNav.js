'use strict';

import BaseComponent from "../BaseComponent.js";
import RouteManager from "../../managers/RouteManager/RouteManager.js";

/**
 * @class OfferCreateNav
 * @description Компонент панели навигации на странице создания объявления.
 * @extends BaseComponent
 */
export default class OfferCreateNav extends BaseComponent {
    constructor() {
        super({});
    }

    initListeners() {
        this.initListener('typePageButton', 'click', this._typePageButtonHandler);
        this.initListener('addressPageButton', 'click', this._addressPageButtonHandler);
        this.initListener('paramsPageButton', 'click', this._paramsPageButtonHandler);
        this.initListener('pricePageButton', 'click', this._pricePageButtonHandler);
        this.initListener('photosPageButton', 'click', this._photosPageButtonHandler);
        this.initListener('descriptionPageButton', 'click', this._descriptionPageButtonHandler);
    }

    destroy() {
        super.destroy();
    }

    /**
     * @method _typePageButtonHandler
     * @description Обработчик события перехода на страницу выбора типа сделки
     * @private
     */
    _typePageButtonHandler() {
        RouteManager.navigateTo('/offer/create/type');
    }

    /**
     * @method _addressPageButtonHandler
     * @description Обработчик события перехода на страницу выбора адреса
     * @private
     */
    _addressPageButtonHandler() {
        RouteManager.navigateTo('/offer/create/address');
    }

    /**
     * @method _paramsPageButtonHandler
     * @description Обработчик события перехода на страницу выбора параметров
     * @private
     */
    _paramsPageButtonHandler() {
        RouteManager.navigateTo('/offer/create/params');
    }

    /**
     * @method _pricePageButtonHandler
     * @description Обработчик события перехода на страницу выбора цены
     * @private
     */
    _pricePageButtonHandler() {
        RouteManager.navigateTo('/offer/create/price');
    }

    /**
     * @method _photosPageButtonHandler
     * @description Обработчик события перехода на страницу выбора фотографий
     * @private
     */
    _photosPageButtonHandler() {
        RouteManager.navigateTo('/offer/create/photos');
    }

    /**
     * @method _descriptionPageButtonHandler
     * @description Обработчик события перехода на страницу с полем описания
     * @private
     */
    _descriptionPageButtonHandler() {
        RouteManager.navigateTo('/offer/create/description');
    }
}