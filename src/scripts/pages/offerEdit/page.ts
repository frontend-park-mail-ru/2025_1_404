import OfferCreate, {ImageData} from "../../models/offerCreate.ts";
import {Page, PageRenderInterface} from "../page.ts";
import {BaseLayout} from "../../layouts/baseLayout.ts";

export interface OfferDataChangeInterface {
    result: boolean;
    input: HTMLInputElement;
}

/**
 * @class OfferPage
 * @description Базовая Страница редактирования объявления
 * @augments Page
 */
export default class OfferPage extends Page {
    public pageName: string;
    private inputs: number;
    protected offerData: Record<string, string> = {};
    protected uploadedImages: Record<string, ImageData> = {};
    protected layout: BaseLayout | undefined;
    /**
     * @description Конструктор класса.
     * @param {string} propertyName имя свойства в модели
     * @param {number} inputs количество инпутов на странице
     */
    constructor(propertyName: string, inputs: number = 0) {
        super();
        this.pageName = propertyName;
        this.inputs = inputs;
    }

    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root}: PageRenderInterface) {
        super.render({layout, root});

        this.offerData = {};
        this.layout = layout;

        this.getDataFromModel();
    }

    /**
     * @function getDataFromModel
     * @description Метод получения данных из модели.
     * @private
     */
    protected getDataFromModel() {
        if (OfferCreate.getOfferData()[this.pageName]) {
            this.offerData = OfferCreate.getOfferData()[this.pageName];
            this.uploadedImages = OfferCreate.getImages();
        }
    }

    /**
     * @function setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    protected setDataFromModel() {
        throw new Error('Method is not implemented');
    }

    /**
     * @function markAsFullfilled
     * @description Метод установки статуса страницы.
     * @param {boolean} isFilled статус страницы
     * @protected
     */
    protected markAsFullfilled(isFilled: boolean) {
        OfferCreate.setPageFilled(this.pageName, isFilled);
        if (this.layout) {
            this.layout.emit('pageFilled', isFilled);
        }
    }

    /**
     * @function isInputsFilled
     * @description Метод проверки заполненности инпутов.
     * @returns {boolean} true, если все инпуты заполнены, иначе false
     * @private
     */
    protected isInputsFilled() {
        let isFilled = true;
        if (Object.keys(this.offerData).length < this.inputs) {
            return false;
        }
        for (const key in this.offerData) {
            if (this.offerData[key] === '') { isFilled = false; return isFilled;}
        }
        return isFilled;
    }


    /**
     * @function offerDataChange
     * @description Метод обработки события изменения данных объявления.
     * @param {Event} event событие
     * @returns {OfferDataChangeInterface} объект с результатом и инпутом
     * @private
     */
    protected offerDataChange(event: Event): OfferDataChangeInterface {
        event.preventDefault();
        const input = event.target as HTMLInputElement;

        let result = true;
        if (input.type === 'text' || input.type === 'tel') {
            this.offerData[input.id] = '';
            result = this.formInputHandler(event);
            if (result) {
                this.offerData[input.id] = input.value;
            }

            if (input.id === 'input-address__input' && input.dataset.filled === 'false') {
                this.offerData[input.id] = '';
                result = false;
            }

            OfferCreate.setData(this.pageName, this.offerData);
        }
        this.markAsFullfilled(this.isInputsFilled());
        return {result, input};
    }
}