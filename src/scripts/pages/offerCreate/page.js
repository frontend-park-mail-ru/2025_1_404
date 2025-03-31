import Page from "../page.js";
import OfferCreate from "../../models/offerCreate.js";

/**
 * @class OfferPage
 * @description Базовая Страница создания объявления
 * @extends Page
 */
export default class OfferPage extends Page {
    constructor(propertyName) {
        super();
        this._pageName = propertyName;
    }

    render({layout, root}) {
        super.render(root);

        this._offerData = {};
        this._layout = layout;

        this._getDataFromModel();
    }

    _getDataFromModel() {
        if (OfferCreate.getOfferData()[this._pageName]) {
            this._offerData = OfferCreate.getOfferData()[this._pageName];
        }
    }

    _setDataFromModel() {
        throw new Error('Method is not implemented');
    }

    _markAsFullfilled(isFilled) {
        OfferCreate.setPageFilled(this._pageName, isFilled);
        this._layout.emit('pageFilled', isFilled);
    }
}