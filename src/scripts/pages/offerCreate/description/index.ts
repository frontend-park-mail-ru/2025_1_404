
import OfferCreate from "../../../models/offerCreate.js";
import OfferPage from "../page.js";
import template from "./template.precompiled.js";
import {PageRenderInterface} from "../../page.js";

/**
 * @class OfferCreateDescriptionPage
 * @description Страница создания объявления с полем описания
 * @augments OfferPage
 */
export default class OfferCreateDescriptionPage extends OfferPage {
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root}: PageRenderInterface) {
        root.innerHTML = template();
        super.render({layout, root});

        this._getDataFromModel();
        if (Object.keys(this._offerData).length !== 0) {
            this._setDataFromModel();
        }
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('input-description', 'focusout', this._offerDescriptionTextareaChange);
    }

    /**
     * @function _isInputsFilled
     * @returns {boolean} true, если все инпуты заполнены
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
     * @function _setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    _setDataFromModel() {
        const input = document
            .getElementById('input-description') as HTMLInputElement
        input.value = this._offerData[input.id];
    }

    /**
     * @function _offerDescriptionTextareaChange
     * @description Метод обработки события изменения текста в текстовом поле.
     * @param {Event} event событие изменения текста
     * @param {HTMLElement} target элемент, вызвавший событие
     * @private
     */
    _offerDescriptionTextareaChange(event: Event) {
        event.preventDefault();

        if (!event.target) {
            return;
        }

        const target = event.target as HTMLInputElement;

        if (target.tagName !== 'TEXTAREA') {
            return;
        }

        this._offerData[target.id] = target.value;
        OfferCreate.setData(this._pageName, this._offerData);
        this._markAsFullfilled(this._isInputsFilled());
    }
}