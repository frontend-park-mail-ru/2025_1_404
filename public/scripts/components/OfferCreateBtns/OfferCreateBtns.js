'use strict';

import BaseComponent from "../BaseComponent.js";
import OfferCreate from "../../models/OfferCreate.js";

/**
 * @class OfferCreateBtns
 * @description Компонент панели с кнопками на странице создания объявления.
 * @extends BaseComponent
 */
export default class OfferCreateBtns extends BaseComponent {
    constructor({page, layout}) {
        super({layout, page});
    }

    initListeners() {
        this.initListener('offerCreateBtnsDelete', 'click', this._deleteButtonClickHandler);
        this.initListener('offerCreateBtnsSave', 'click', this._saveButtonClickHandler);
        this.initListener('offerCreateBtnsBack', 'click', this._backButtonClickHandler);
        this.initListener('offerCreateBtnsNext', 'click', this._nextButtonClickHandler);
    }

    _deleteButtonClickHandler() {

    }

    _saveButtonClickHandler() {

    }

    _backButtonClickHandler() {
        this.layout.emit('prevPage');
    }

    _nextButtonClickHandler() {
        this.layout.emit('nextPage');
    }

    destroy() {
        super.destroy();
    }
}