
import OfferCreate from "../../../models/offerCreate.ts";
import OfferPage from "../page.ts";
import template from "./template.precompiled.js";
import {PageRenderInterface} from "../../page.ts";

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

        this.getDataFromModel();
        if (Object.keys(this.offerData).length !== 0) {
            this.setDataFromModel();
        }
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('input-description', 'input', this.offerDescriptionTextareaChange);
    }

    /**
     * @function isInputsFilled
     * @returns {boolean} true, если все инпуты заполнены
     * @private
     */
    isInputsFilled() {
        let isFilled = true;
        for (const key in this.offerData) {
            if (this.offerData[key] === '') {isFilled = false; return isFilled;}
        }
        return isFilled;
    }

    /**
     * @function setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    setDataFromModel() {
        const input = document
            .getElementById('input-description') as HTMLInputElement
        input.value = this.offerData[input.id] || '';
    }

    /**
     * @function offerDescriptionTextareaChange
     * @description Метод обработки события изменения текста в текстовом поле.
     * @param {Event} event событие изменения текста
     * @private
     */
    private offerDescriptionTextareaChange(event: Event) {
        event.preventDefault();

        if (!event.target) {
            return;
        }

        const target = event.target as HTMLInputElement;

        if (target.tagName !== 'TEXTAREA') {
            return;
        }

        this.offerData[target.id] = target.value;
        OfferCreate.setData(this.pageName, this.offerData);
        this.markAsFullfilled(this.isInputsFilled());
    }
}