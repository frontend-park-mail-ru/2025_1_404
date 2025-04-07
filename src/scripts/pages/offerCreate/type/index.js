'use strict'

import OfferCreate from "../../../models/offerCreate.js";
import OfferPage from "../page.js";
import template from "./template.precompiled.js";

/**
 * @class OfferCreateTypePage
 * @description Страница создания объявления с типом сделки
 * @augments OfferPage
 */
export default class OfferCreateTypePage extends OfferPage {
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
        this._initReadTypeData();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('offerCreateChoices', 'change', this._offerDataChange);
    }

    /**
     * @function _initReadTypeData
     * @description Метод инициализации данных для страницы выбора типа сделки.
     * @private
     */
    _initReadTypeData() {
        const selects = document.getElementById("offerCreateChoices").querySelectorAll('input:checked');
        selects.forEach(input => {
            this._offerData[input.name] = input.labels[0].textContent;
        })
        OfferCreate.setData(this._pageName, this._offerData);
    }

    /**
     * @function _setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    _setDataFromModel() {
        const selects = document.getElementById("offerCreateChoices").querySelectorAll('input');
        selects.forEach(input => {
            if (input.labels[0].textContent === this._offerData[input.name]) {
                input.checked = true;
            }
        })
    }

    /**
     * @function _offerDataChange
     * @description Метод изменения данных в модели.
     * @param {Event} event событие
     * @param {HTMLElement} target целевой элемент
     * @private
     */
    _offerDataChange(event, {target} = event) {
        event.preventDefault();

        this._offerData[target.name] = target.labels[0].textContent;
        OfferCreate.setData(this._pageName, this._offerData);
    }
}