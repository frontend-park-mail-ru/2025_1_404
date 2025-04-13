
import OfferCreate from "../../../models/offerCreate.ts";
import OfferPage from "../page.ts";
import template from "./template.precompiled.js";
import {PageRenderInterface} from "../../page.ts";

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
    render({layout, root}: PageRenderInterface) {
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
        this.initListener('offerCreateParams', 'change', this._offerDataChange);
    }

    /**
     * @function _offerDataChange
     * @description Метод изменения данных в модели.
     * @param {Event} event событие
     * @returns {Promise<void>} промис
     * @private
     */
    _offerDataChange(event: Event) {
        const response = super._offerDataChange(event);

        const target = event.target as HTMLInputElement;
        if (target.labels && target.labels[0].textContent) {
            this._offerData[target.name] = target.labels[0].textContent;
        }
        OfferCreate.setData(this._pageName, this._offerData);
        OfferCreate.setPageFilled(this._pageName, this._isInputsFilled());

        return response;
    }

    /**
     * @function _initReadParamsData
     * @description Метод инициализации данных для страницы выбора параметров.
     * @private
     */
    _initReadParamsData() {
        const inputSquare = document
            .getElementById('input-square') as HTMLElement
        this._offerData[inputSquare.id] = '';

        const params = document.getElementById("offerCreateParams") as HTMLElement;
        const selects = params.querySelectorAll('input:checked');
        selects.forEach(input => {
            const inputElement = input as HTMLFormElement;
            this._offerData[inputElement.name] = inputElement.labels[0].textContent;
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
        const params = document.getElementById("offerCreateParams") as HTMLElement;
        const selects = params.querySelectorAll('input') as NodeListOf<HTMLElement>;
        selects.forEach(input => {
            const inputElement = input as HTMLFormElement;
            if (inputElement.type === 'text') {
                inputElement.value = this._offerData[inputElement.id] || '';
            }
            if (inputElement.labels[0].textContent === this._offerData[inputElement.name]) {
                inputElement.checked = true;
            }
        })
    }

    /**
     * @function _offerParamsSelectsChange
     * @description Метод обработки события изменения данных объявления.
     * @param {Event} event событие
     * @private
     */
    _offerParamsSelectsChange(event: Event) {
        event.preventDefault();

        if (!event.target) {
            return;
        }
        const target = event.target as HTMLFormElement;

        this._offerData[target.name] = target.labels[0].textContent;
        OfferCreate.setData(this._pageName, this._offerData);
    }
}