import OfferCreate from "../../models/offerCreate.ts";
import {Page, PageRenderInterface} from "../page.ts";
import {BaseLayout} from "../../layouts/baseLayout.ts";

/**
 * @class OfferPage
 * @description Базовая Страница создания объявления
 * @augments Page
 */
export default class OfferPage extends Page {
    _pageName: any;
    protected _offerData: Record<string, string> = {};
    private _layout: BaseLayout | undefined;
    /**
     * @description Конструктор класса.
     * @param {string} propertyName имя свойства в модели
     */
    constructor(propertyName: string) {
        super();
        this._pageName = propertyName;
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
     * @function getOfferData
     * @description Метод получения данных предложения, которые были установлены на странице.
     */
    getOfferData() {
        return this._offerData;
    }
}