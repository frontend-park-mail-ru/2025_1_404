'use strict';

import BaseComponent from "../BaseComponent.js";
import template from './OfferCreateNav.precompiled.js';

/**
 * @class OfferCreateNav
 * @description Компонент панели навигации на странице создания объявления.
 * @extends BaseComponent
 */
export default class OfferCreateNav extends BaseComponent {
    constructor() {
        super();
        this.currentOfferCreatePage = null;

        this._typePageButton = document.getElementById("typePageButton");
        this._typePageButton.addEventListener('click', () => this._typePageButtonHandler());

        this._addressPageButton = document.getElementById("addressPageButton");
        this._addressPageButton.addEventListener('click', () => this._addressPageButtonHandler());

        this._paramsPageButton = document.getElementById('paramsPageButton');
        this._paramsPageButton.addEventListener('click', () => this._paramsPageButtonHandler());

        this._pricePageButton = document.getElementById('pricePageButton');
        this._pricePageButton.addEventListener('click', () => this._pricePageButtonHandler());

        this._photosPageButton = document.getElementById("photosPageButton");
        this._photosPageButton.addEventListener('click', () => this._photosPageButtonHandler());

        this._descriptionPageButton = document.getElementById("descriptionPageButton");
        this._descriptionPageButton.addEventListener('click', () => this._descriptionPageButtonHandler());
    }

    destroy() {
        this._typePageButton.removeEventListener('click', () => this._typePageButtonHandler());
        this._addressPageButton.removeEventListener('click', () => this._addressPageButtonHandler());
        this._paramsPageButton.removeEventListener('click', () => this._paramsPageButtonHandler());
        this._pricePageButton.removeEventListener('click', () => this._pricePageButtonHandler());
        this._photosPageButton.removeEventListener('click', () => this._photosPageButtonHandler());
        this._descriptionPageButton.removeEventListener('click', () => this._descriptionPageButtonHandler());
        super.destroy();
    }

    /**
     * @method _typePageButtonHandler
     * @description Обработчик события перехода на страницу выбора типа сделки
     * @private
     */
    _typePageButtonHandler() {
        window.routeManager.navigateTo('/offerCreate/type');
    }

    /**
     * @method _addressPageButtonHandler
     * @description Обработчик события перехода на страницу выбора адреса
     * @private
     */
    _addressPageButtonHandler() {
        window.routeManager.navigateTo('/offerCreate/address');
    }

    /**
     * @method _paramsPageButtonHandler
     * @description Обработчик события перехода на страницу выбора параметров
     * @private
     */
    _paramsPageButtonHandler() {
        window.routeManager.navigateTo('/offerCreate/params');
    }

    /**
     * @method _pricePageButtonHandler
     * @description Обработчик события перехода на страницу выбора цены
     * @private
     */
    _pricePageButtonHandler() {
        window.routeManager.navigateTo('/offerCreate/price');
    }

    /**
     * @method _photosPageButtonHandler
     * @description Обработчик события перехода на страницу выбора фотографий
     * @private
     */
    _photosPageButtonHandler() {
        window.routeManager.navigateTo('/offerCreate/photos');
    }

    /**
     * @method _descriptionPageButtonHandler
     * @description Обработчик события перехода на страницу с полем описания
     * @private
     */
    _descriptionPageButtonHandler() {
        window.routeManager.navigateTo('/offerCreate/description');
    }
}