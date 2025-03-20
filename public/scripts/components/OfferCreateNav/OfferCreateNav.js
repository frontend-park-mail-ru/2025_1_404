'use strict';

import BaseComponent from "../BaseComponent.js";
import template from './OfferCreateNav.precompiled.js';
import RouteManager from "../../managers/RouteManager.js";

/**
 * @class OfferCreateNav
 * @description Компонент панели навигации на странице создания объявления.
 * @extends BaseComponent
 */
export default class OfferCreateNav extends BaseComponent {
    constructor() {
        super({});
        this.currentOfferCreatePage = null;

        this._typePageButton = document.getElementById("typePageButton");
        this._typePageButtonHandler = this._typePageButtonHandler.bind(this);
        this._typePageButton.addEventListener('click', this._typePageButtonHandler);

        this._addressPageButton = document.getElementById("addressPageButton");
        this._addressPageButtonHandler = this._addressPageButtonHandler.bind(this);
        this._addressPageButton.addEventListener('click', this._addressPageButtonHandler);

        this._paramsPageButton = document.getElementById('paramsPageButton');
        this._paramsPageButtonHandler = this._paramsPageButtonHandler.bind(this);
        this._paramsPageButton.addEventListener('click', this._paramsPageButtonHandler);

        this._pricePageButton = document.getElementById('pricePageButton');
        this._pricePageButtonHandler = this._pricePageButtonHandler.bind(this);
        this._pricePageButton.addEventListener('click', this._pricePageButtonHandler);

        this._photosPageButton = document.getElementById("photosPageButton");
        this._photosPageButtonHandler = this._photosPageButtonHandler.bind(this);
        this._photosPageButton.addEventListener('click', this._photosPageButtonHandler);

        this._descriptionPageButton = document.getElementById("descriptionPageButton");
        this._descriptionPageButtonHandler = this._descriptionPageButtonHandler.bind(this);
        this._descriptionPageButton.addEventListener('click', this._descriptionPageButtonHandler);
    }

    destroy() {
        this._typePageButton.removeEventListener('click', this._typePageButtonHandler);
        this._addressPageButton.removeEventListener('click', this._addressPageButtonHandler);
        this._paramsPageButton.removeEventListener('click', this._paramsPageButtonHandler);
        this._pricePageButton.removeEventListener('click', this._pricePageButtonHandler);
        this._photosPageButton.removeEventListener('click', this._photosPageButtonHandler);
        this._descriptionPageButton.removeEventListener('click', this._descriptionPageButtonHandler);
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