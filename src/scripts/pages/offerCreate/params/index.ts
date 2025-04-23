
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

        if (Object.keys(this.offerData).length !== 0) {
            this.setDataFromModel();
            return;
        }
        this.initReadParamsData();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('offerCreateParams', 'input', this.offerDataChange);
    }

    /**
     * @function offerDataChange
     * @description Метод изменения данных в модели.
     * @param {Event} event событие
     * @returns {Promise<void>} промис
     * @private
     */
    offerDataChange(event: Event) {
        const response = super.offerDataChange(event);

        const target = event.target as HTMLInputElement;
        if (target.labels && target.labels[0].textContent) {
            this.offerData[target.name] = target.labels[0].textContent;
        }
        OfferCreate.setData(this.pageName, this.offerData);
        OfferCreate.setPageFilled(this.pageName, this.isInputsFilled());

        return response;
    }

    /**
     * @function initReadParamsData
     * @description Метод инициализации данных для страницы выбора параметров.
     * @private
     */
    private initReadParamsData() {
        const inputSquare = document
            .getElementById('input-square') as HTMLElement
        this.offerData[inputSquare.id] = '';

        const params = document.getElementById("offerCreateParams") as HTMLElement;
        const selects = params.querySelectorAll('input:checked');
        selects.forEach(input => {
            const inputElement = input as HTMLFormElement;
            this.offerData[inputElement.name] = inputElement.labels[0].textContent;
        })
        OfferCreate.setData(this.pageName, this.offerData);
        OfferCreate.setPageFilled(this.pageName, this.isInputsFilled());
    }

    /**
     * @function setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    setDataFromModel() {
        const params = document.getElementById("offerCreateParams") as HTMLElement;
        const selects = params.querySelectorAll('input') as NodeListOf<HTMLElement>;
        selects.forEach(input => {
            const inputElement = input as HTMLFormElement;
            if (inputElement.type === 'text') {
                inputElement.value = this.offerData[inputElement.id] || '';
            }
            if (inputElement.labels[0].textContent === this.offerData[inputElement.name]) {
                inputElement.checked = true;
            }
        })
    }

    /**
     * @function offerParamsSelectsChange
     * @description Метод обработки события изменения данных объявления.
     * @param {Event} event событие
     * @private
     */
    private offerParamsSelectsChange(event: Event) {
        event.preventDefault();

        if (!event.target) {
            return;
        }
        const target = event.target as HTMLFormElement;

        this.offerData[target.name] = target.labels[0].textContent;
        OfferCreate.setData(this.pageName, this.offerData);
    }
}