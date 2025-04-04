'use strict';

import BaseComponent from "../baseComponent.js";

/**
 * @class OfferCreateBtns
 * @description Компонент панели с кнопками на странице создания объявления.
 * @extends BaseComponent
 */
export default class OfferCreateBtns extends BaseComponent {
    constructor({page, layout}) {
        super({layout, page});

        this._nextButton = document.getElementById('offerCreateBtnsNext');
        this._backButton = document.getElementById('offerCreateBtnsBack');
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

    enableNextButton() {
        this._nextButton.removeAttribute('disabled');
    }

    disableNextButton() {
        this._nextButton.setAttribute('disabled', 'disabled');
    }

    enableBackButton() {
        this._backButton.removeAttribute('disabled');
    }

    disableBackButton() {
        this._backButton.setAttribute('disabled', 'disabled');
    }
}