'use strict'

import OfferCreate from "../../../models/offerCreate.js";
import OfferPage from "../page.js";
import template from "./template.precompiled.js";

/**
 * @class OfferCreateParamsPage
 * @description Страница создания объявления с выбором параметров
 * @augments OfferPage
 */
export default class OfferCreateParamsPage extends OfferPage {
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root}) {
        root.innerHTML = template();
        super.render({layout, root});

        if (Object.keys(this._offerData).length !== 0) {
            this._setDataFromModel();
            return;
        }
        this._initReadParamsData();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('input-square', 'focusout', this._offerParamsInputChange);
        this.initListener('offerCreateParams', 'change', this._offerParamsSelectsChange);
    }

    /**
     * @function _initReadParamsData
     * @description Метод инициализации данных для страницы выбора параметров.
     * @private
     */
    _initReadParamsData() {
        const inputSquare = document
            .getElementById('input-square')
        this._offerData[inputSquare.id] = '';

        const selects = document.getElementById("offerCreateParams").querySelectorAll('input:checked');
        selects.forEach(input => {
            this._offerData[input.name] = input.labels[0].textContent;
        })
        OfferCreate.setData(this._pageName, this._offerData);
        OfferCreate.setPageFilled(this._pageName, this._isInputsFilled());
    }

    /**
     * @function _setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    _setDataFromModel() {
        const inputSquare = document
            .getElementById('input-square')
        if (this._offerData[inputSquare.id]) {
            inputSquare.value = this._offerData[inputSquare.id];
        }

        const selects = document.getElementById("offerCreateParams").querySelectorAll('input');
        selects.forEach(input => {
            if (input.labels[0].textContent === this._offerData[input.name]) {
                input.checked = true;
            }
        })
    }

    /**
     * @function _isInputsFilled
     * @description Метод проверки заполненности инпутов.
     * @returns {boolean} true, если все инпуты заполнены, иначе false
     * @private
     */
    _isInputsFilled() {
        let isFilled = true;
        for (const key in this._offerData) {
            if (this._offerData[key] === '') {isFilled = false; return isFilled;}
        }
        return isFilled;
    }

    /**
     * _offerParamsInputChange
     * @param {Event} event событие
     * @param {HTMLElement} target элемент, на который произошло событие
     * @private
     */
    _offerParamsInputChange(event, {target} = event) {
        event.preventDefault();

        if (target.tagName !== 'INPUT') {
            return;
        }

        this._offerData[target.id] = target.value;
        OfferCreate.setData(this._pageName, this._offerData);
        this._markAsFullfilled(this._isInputsFilled());
    }

    /**
     * @function _offerParamsSelectsChange
     * @description Метод обработки события изменения данных объявления.
     * @param {Event} event событие
     * @param {HTMLElement} target элемент, на который произошло событие
     * @private
     */
    _offerParamsSelectsChange(event, {target} = event) {
        event.preventDefault();

        this._offerData[target.name] = target.labels[0].textContent;
        OfferCreate.setData(this._pageName, this._offerData);
    }
}