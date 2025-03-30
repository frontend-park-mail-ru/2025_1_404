'use strict';

import BaseComponent from "../baseComponent.js";

/**
 * @class OfferCreateNav
 * @description Компонент панели навигации на странице создания объявления.
 * @extends BaseComponent
 */
export default class OfferCreateNav extends BaseComponent {

    _emptyStageClass = "fa-regular fa-circle"
    _currentStageClass = "fa-regular fa-circle-dot";
    _filledStageClass = "fa-solid fa-circle-check";

    constructor({page, layout}) {
        super({layout, page});
    }

    initListeners() {
        this.initListener('typePageButton', 'click', this._typePageButtonHandler);
        this.initListener('addressPageButton', 'click', this._addressPageButtonHandler);
        this.initListener('paramsPageButton', 'click', this._paramsPageButtonHandler);
        this.initListener('pricePageButton', 'click', this._pricePageButtonHandler);
        this.initListener('photosPageButton', 'click', this._photosPageButtonHandler);
        this.initListener('descriptionPageButton', 'click', this._descriptionPageButtonHandler);
    }

    /**
     * @method _typePageButtonHandler
     * @description Обработчик события перехода на страницу выбора типа сделки
     * @private
     */
    _typePageButtonHandler() {
        this.layout.emit('goToPage', 'type');
    }

    /**
     * @method _addressPageButtonHandler
     * @description Обработчик события перехода на страницу выбора адреса
     * @private
     */
    _addressPageButtonHandler() {
        this.layout.emit('goToPage', 'address');
    }

    /**
     * @method _paramsPageButtonHandler
     * @description Обработчик события перехода на страницу выбора параметров
     * @private
     */
    _paramsPageButtonHandler() {
        this.layout.emit('goToPage', 'params');
    }

    /**
     * @method _pricePageButtonHandler
     * @description Обработчик события перехода на страницу выбора цены
     * @private
     */
    _pricePageButtonHandler() {
        this.layout.emit('goToPage', 'price');
    }

    /**
     * @method _photosPageButtonHandler
     * @description Обработчик события перехода на страницу выбора фотографий
     * @private
     */
    _photosPageButtonHandler() {
        this.layout.emit('goToPage', 'photos');
    }

    /**
     * @method _descriptionPageButtonHandler
     * @description Обработчик события перехода на страницу с полем описания
     * @private
     */
    _descriptionPageButtonHandler() {
        this.layout.emit('goToPage', 'description');
    }

    addCurrentStageClass(id) {
        const stage = document.getElementById(id).firstElementChild;
        this._emptyStageClass.split(" ").forEach(stageClass => {
            stage.classList.remove(stageClass);
        })
        this._filledStageClass.split(" ").forEach(stageClass => {
            stage.classList.remove(stageClass);
        })
        this._currentStageClass.split(" ").forEach(stageClass => {
            stage.classList.add(stageClass);
        })
    }

    addFilledStageClass(ids) {
        this._fillRectangles(ids.length);
        ids.forEach(id => {
            const stage = document.getElementById(id).firstElementChild;
            this._currentStageClass.split(" ").forEach(stageClass => {
                stage.classList.remove(stageClass);
            })
            this._emptyStageClass.split(" ").forEach(stageClass => {
                stage.classList.remove(stageClass);
            })
            this._filledStageClass.split(" ").forEach(stageClass => {
                stage.classList.add(stageClass);
            })
        })
    }

    addEmptyStageClass(id) {
        const stage = document.getElementById(id).firstElementChild;
        this._filledStageClass.split(" ").forEach(stageClass => {
            stage.classList.remove(stageClass);
        })
        this._currentStageClass.split(" ").forEach(stageClass => {
            stage.classList.remove(stageClass);
        })
        this._emptyStageClass.split(" ").forEach(stageClass => {
            stage.classList.add(stageClass);
        })
    }

    _fillRectangles(amount) {
        amount = Math.min(amount, 5);
        const rectangles = document.getElementsByClassName("offerCreate__rect");
        for (let i = 0; i < amount; i++) {
            rectangles[i].classList.add("offerCreate__rect-fill");
        }
    }
}