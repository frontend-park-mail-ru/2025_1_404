'use strict';

import BaseComponent from "../baseComponent.js";

/**
 * @class OfferCreateNav
 * @description Компонент панели навигации на странице создания объявления.
 * @augments BaseComponent
 */
export default class OfferCreateNav extends BaseComponent {

    _emptyStageClass = "fa-regular fa-circle"
    _currentStageClass = "fa-regular fa-circle-dot";
    _filledStageClass = "fa-solid fa-circle-check";

    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}) {
        super({layout, page});
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('typePageButton', 'click', this._typePageButtonHandler);
        this.initListener('addressPageButton', 'click', this._addressPageButtonHandler);
        this.initListener('paramsPageButton', 'click', this._paramsPageButtonHandler);
        this.initListener('pricePageButton', 'click', this._pricePageButtonHandler);
        this.initListener('photosPageButton', 'click', this._photosPageButtonHandler);
        this.initListener('descriptionPageButton', 'click', this._descriptionPageButtonHandler);
    }

    /**
     * @function _typePageButtonHandler
     * @description Обработчик события перехода на страницу выбора типа сделки
     * @private
     */
    _typePageButtonHandler() {
        this.layout.emit('goToPage', 'type');
    }

    /**
     * @function _addressPageButtonHandler
     * @description Обработчик события перехода на страницу выбора адреса
     * @private
     */
    _addressPageButtonHandler() {
        this.layout.emit('goToPage', 'address');
    }

    /**
     * @function _paramsPageButtonHandler
     * @description Обработчик события перехода на страницу выбора параметров
     * @private
     */
    _paramsPageButtonHandler() {
        this.layout.emit('goToPage', 'params');
    }

    /**
     * @function _pricePageButtonHandler
     * @description Обработчик события перехода на страницу выбора цены
     * @private
     */
    _pricePageButtonHandler() {
        this.layout.emit('goToPage', 'price');
    }

    /**
     * @function _photosPageButtonHandler
     * @description Обработчик события перехода на страницу выбора фотографий
     * @private
     */
    _photosPageButtonHandler() {
        this.layout.emit('goToPage', 'photos');
    }

    /**
     * @function _descriptionPageButtonHandler
     * @description Обработчик события перехода на страницу с полем описания
     * @private
     */
    _descriptionPageButtonHandler() {
        this.layout.emit('goToPage', 'description');
    }

    /**
     * @function addCurrentStageClass
     * @description Метод добавления класса текущей стадии.
     * @param {string} id идентификатор стадии.
     */
    addCurrentStageClass(id) {
        const buttonId = id.concat("PageButton");
        const stage = document.getElementById(buttonId).firstElementChild;
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

    /**
     * @function addFilledStageClass
     * @description Метод добавления класса заполненной стадии.
     * @param {Array} ids массив идентификаторов стадий.
     */
    addFilledStageClass(ids) {
        this._fillRectangles(ids.length);
        ids.forEach(id => {
            const buttonId = id.concat("PageButton");
            const stage = document.getElementById(buttonId).firstElementChild;
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

    /**
     * @function addEmptyStageClass
     * @description Метод добавления класса пустой стадии.
     * @param {string} id идентификатор стадии.
     */
    addEmptyStageClass(id) {
        const buttonId = id.concat("PageButton");
        const stage = document.getElementById(buttonId).firstElementChild;
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

    /**
     * @function _fillRectangles
     * @description Метод заполнения прямоугольников на панели навигации.
     * @param {number} amount количество заполненных прямоугольников.
     * @private
     */
    _fillRectangles(amount) {
        const minAmount = 5;
        const correctedAmount = Math.min(amount, minAmount);
        const rectangles = document.getElementsByClassName("offerCreate__nav-rect");
        for (let i = 0; i < correctedAmount; i++) {
            rectangles[i].classList.add("offerCreate__nav-rect-fill");
        }
    }
}