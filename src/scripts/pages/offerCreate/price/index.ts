
import OfferCreate from "../../../models/offerCreate.js";
import OfferPage from "../page.js";
import template from "./template.precompiled.js";
import {PageRenderInterface} from "../../page.js";

/**
 * @class OfferCreatePricePage
 * @description Страница создания объявления с выбором цены
 * @augments OfferPage
 */
export default class OfferCreatePricePage extends OfferPage {
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
        }
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('input-price', 'focusout', this._offerPriceInputChange);
    }

    /**
     * @function _setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    _setDataFromModel() {
        const input = document
            .getElementById('input-price') as HTMLInputElement
        input.value = this._offerData[input.id];
    }

    /**
     * @function _isInputsFilled
     * @description Метод проверки заполненности инпутов.
     * @returns {boolean} true, если инпуты заполнены
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
     * @function _offerPriceInputChange
     * @description Метод обработки изменения цены.
     * @param {Event} event событие изменения
     * @param {HTMLElement} target целевой элемент
     * @private
     */
    _offerPriceInputChange(event: Event) {
        event.preventDefault();

        if (!event.target) {
            return;
        }
        const target = event.target as HTMLInputElement;

        if (target.tagName !== 'INPUT') {
            return;
        }

        this._offerData[target.id] = target.value;
        OfferCreate.setData(this._pageName, this._offerData);
        this._markAsFullfilled(this._isInputsFilled());
    }
}