import OfferPage from "../page.ts";
import template from "./template.precompiled.js";
import {PageRenderInterface} from "../../page.ts";

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
        this.initListener('input-price', 'change', this._offerDataChange);
    }

    /**
     * @function _setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    _setDataFromModel() {
        const input = document
            .getElementById('input-price') as HTMLInputElement
        input.value = this._offerData[input.id] || '';
    }
}