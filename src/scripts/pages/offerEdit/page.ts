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
    _pageName: string;
    _inputs: number;
    protected _offerData: Record<string, string> = {};
    protected _uploadedImages: Record<string, ImageData> = {};
    protected _layout: BaseLayout | undefined;
    /**
     * @description Конструктор класса.
     * @param {string} propertyName имя свойства в модели
     * @param {number} inputs количество инпутов на странице
     */
    constructor(propertyName: string, inputs: number = 0) {
        super();
        this._pageName = propertyName;
        this._inputs = inputs;
    }

    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({layout, root}: PageRenderInterface) {
        super.render({layout, root});

        this._offerData = {};
        this._layout = layout;

        this._getDataFromModel();
    }

    /**
     * @function _getDataFromModel
     * @description Метод получения данных из модели.
     * @private
     */
    _getDataFromModel() {
        if (OfferCreate.getOfferData()[this._pageName]) {
            this._offerData = OfferCreate.getOfferData()[this._pageName];
            this._uploadedImages = OfferCreate.getImages();
        }
    }

    /**
     * @function _setDataFromModel
     * @description Метод установки данных из модели в инпуты.
     * @private
     */
    _setDataFromModel() {
        throw new Error('Method is not implemented');
    }

    /**
     * @function _markAsFullfilled
     * @description Метод установки статуса страницы.
     * @param {boolean} isFilled статус страницы
     * @private
     */
    _markAsFullfilled(isFilled: boolean) {
        OfferCreate.setPageFilled(this._pageName, isFilled);
        if (this._layout) {
            this._layout.emit('pageFilled', isFilled);
        }
    }

    /**
     * @function _isInputsFilled
     * @description Метод проверки заполненности инпутов.
     * @returns {boolean} true, если все инпуты заполнены, иначе false
     * @private
     */
    _isInputsFilled() {
        let isFilled = true;
        if (Object.keys(this._offerData).length < this._inputs) {
            return false;
        }
        for (const key in this._offerData) {
            if (this._offerData[key] === '') { console.log(key); isFilled = false; return isFilled;}
        }
        return isFilled;
    }


    /**
     * @function _offerDataChange
     * @description Метод обработки события изменения данных объявления.
     * @param {Event} event событие
     * @returns {OfferDataChangeInterface} объект с результатом и инпутом
     * @private
     */
    _offerDataChange(event: Event): OfferDataChangeInterface {
        event.preventDefault();
        const input = event.target as HTMLInputElement;

        let result = true;
        if (input.type === 'text' || input.type === 'tel') {
            this._offerData[input.id] = '';
            result = this.formInputHandler(event);
            if (result) {
                this._offerData[input.id] = input.value;
            }
            OfferCreate.setData(this._pageName, this._offerData);
        }
        this._markAsFullfilled(this._isInputsFilled());
        return {result, input};
    }

    /**
     * @function getOfferData
     * @description Метод получения данных предложения, которые были установлены на странице.
     * @returns {Record<string, string>} данные предложения
     */
    getOfferData() {
        return this._offerData;
    }
}