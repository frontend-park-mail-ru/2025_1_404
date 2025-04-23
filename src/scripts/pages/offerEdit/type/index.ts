
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

        if (Object.keys(this.offerData).length !== 0) {
            this.setDataFromModel();
            return;
        }
        this.initReadTypeData();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('offerCreateChoices', 'change', this.offerDataChange);
    }

    /**
     * @function initReadTypeData
     * @description Метод инициализации данных для страницы выбора типа сделки.
     * @private
     */
    private initReadTypeData() {
        const offerCreateChoices = document.getElementById("offerCreateChoices") as HTMLElement;
        const selects = offerCreateChoices.querySelectorAll('input:checked');
        selects.forEach(input => {
            const inputElement = input as HTMLFormElement;
            this.offerData[inputElement.name] = inputElement.labels[0].textContent;
        })
        OfferCreate.setData(this.pageName, this.offerData);
    }

    /**
     * @function setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    setDataFromModel() {
        const offerCreateChoices = document.getElementById("offerCreateChoices") as HTMLElement;
        const selects = offerCreateChoices.querySelectorAll('input') as NodeListOf<HTMLElement>;
        selects.forEach(input => {
            const inputElement = input as HTMLFormElement;
            if (inputElement.labels[0].textContent === this.offerData[inputElement.name]) {
                inputElement.checked = true;
            }
        })
        this.handleRentType();
    }

    /**
     * @function offerDataChange
     * @description Метод изменения данных в модели.
     * @param {Event} event событие
     * @returns {boolean} true, если данные изменены
     * @private
     */
    offerDataChange(event: Event) {
        const response = super.offerDataChange(event);

        const target = event.target as HTMLInputElement;
        if (target.labels && target.labels[0].textContent) {
            this.offerData[target.name] = target.labels[0].textContent;
            this.handleRentType();
        }
        OfferCreate.setData(this.pageName, this.offerData);
        OfferCreate.setPageFilled(this.pageName, this.isInputsFilled());

        return response;
    }

    /**
     * @function handleRentType
     * @description Метод обработки типа аренды.
     */
    private handleRentType() {
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