
import OfferCreate from "../../../models/offerCreate.ts";
import OfferPage from "../page.ts";
import template from "./template.precompiled.js";
import {PageRenderInterface} from "../../page.ts";

/**
 * @class OfferEditTypePage
 * @description Страница редактирования объявления с типом сделки
 * @augments OfferPage
 */
export default class OfferEditTypePage extends OfferPage {
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root}: PageRenderInterface) {
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
        const offerCreateChoices = document.getElementById("offerCreateChoices") as HTMLElement;
        const selects = offerCreateChoices.querySelectorAll('input:checked');
        selects.forEach(input => {
            const inputElement = input as HTMLFormElement;
            this._offerData[inputElement.name] = inputElement.labels[0].textContent;
        })
        OfferCreate.setData(this._pageName, this._offerData);
    }

    /**
     * @function _setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    _setDataFromModel() {
        const offerCreateChoices = document.getElementById("offerCreateChoices") as HTMLElement;
        const selects = offerCreateChoices.querySelectorAll('input') as NodeListOf<HTMLElement>;
        selects.forEach(input => {
            const inputElement = input as HTMLFormElement;
            if (inputElement.labels[0].textContent === this._offerData[inputElement.name]) {
                inputElement.checked = true;
            }
        })
    }

    /**
     * @function _offerDataChange
     * @description Метод изменения данных в модели.
     * @param {Event} event событие
     * @private
     */
    _offerDataChange(event: Event) {
        const response = super._offerDataChange(event);

        const target = event.target as HTMLInputElement;
        if (target.labels && target.labels[0].textContent) {
            this._offerData[target.name] = target.labels[0].textContent;
            this._handleRentType();
        }
        OfferCreate.setData(this._pageName, this._offerData);
        OfferCreate.setPageFilled(this._pageName, this._isInputsFilled());

        return response;
    }

    /**
     * @function _handleRentType
     * @description Метод обработки типа аренды.
     */
    _handleRentType() {
        const activeOffetTypeCheckbox = document.querySelector('[name="input-offer-type"]:checked') as HTMLInputElement;
        if (!activeOffetTypeCheckbox || !activeOffetTypeCheckbox.parentElement) {
            return;
        }
        const activeLabel = activeOffetTypeCheckbox.parentElement.getElementsByTagName('label')[0];
        const rentTypes = document.querySelectorAll('[name="input-rent-type"]');
        rentTypes.forEach((rentType) => {
            if (rentType instanceof HTMLElement) {
                const rentTypeElement = rentType as HTMLInputElement;
                rentTypeElement.disabled = activeLabel.textContent === 'Продажа';
            }
        });
    }
}