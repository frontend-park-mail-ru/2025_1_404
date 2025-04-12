
import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";

/**
 * @class OfferCreateBtns
 * @description Компонент панели с кнопками на странице создания объявления.
 * @augments BaseComponent
 */
export default class OfferCreateBtns extends BaseComponent {
    private _nextButton: HTMLElement | null;
    private _backButton: HTMLElement | null;
    private _submitButton: HTMLElement | null;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({layout, page});

        this._nextButton = document.getElementById('offerCreateBtnsNext');
        this._backButton = document.getElementById('offerCreateBtnsBack');
        this._submitButton = document.getElementById('offerCreateBtnsSubmit');
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('offerCreateBtnsDelete', 'click', this._deleteButtonClickHandler);
        this.initListener('offerCreateBtnsSave', 'click', this._saveButtonClickHandler);
        this.initListener('offerCreateBtnsBack', 'click', this._backButtonClickHandler);
        this.initListener('offerCreateBtnsNext', 'click', this._nextButtonClickHandler);
        this.initListener('offerCreateBtnsSubmit', 'click', this._submitButtonClickHandler);
    }

    /**
     * @function _submitButtonClickHandler
     * @description Обработчик клика по кнопке завершения создания объявления.
     * @private
     */
    _submitButtonClickHandler(){

    }

    /**
     * @function _deleteButtonClickHandler
     * @description Обработчик клика по кнопке удаления объявления.
     * @private
     */
    _deleteButtonClickHandler() {

    }

    /**
     * @function _saveButtonClickHandler
     * @description Обработчик клика по кнопке сохранения объявления.
     * @private
     */
    _saveButtonClickHandler() {

    }

    /**
     * @function _backButtonClickHandler
     * @description Обработчик клика по кнопке назад.
     * @private
     */
    _backButtonClickHandler() {
        if (!this.layout) {
            return;
        }
        this.layout.emit('prevPage');
    }

    /**
     * @function _nextButtonClickHandler
     * @description Обработчик клика по кнопке далее.
     * @private
     */
    _nextButtonClickHandler() {
        if (!this.layout) {
            return;
        }
        this.layout.emit('nextPage');
    }

    /**
     * @function enableSubmitButton
     * @description Метод активации кнопки завершения.
     */
    enableSubmitButton() {
        if (!this._submitButton) {
            return;
        }
        this._submitButton.removeAttribute('disabled');
    }

    /**
     * @function disableSubmitButton
     * @description Метод деактивации кнопки завершения.
     */
    disableSubmitButton() {
        if (!this._submitButton) {
            return;
        }
        this._submitButton.setAttribute('disabled', 'disabled');
    }

    /**
     * @function enableNextButton
     * @description Метод активации кнопки далее.
     */
    enableNextButton() {
        if (!this._nextButton) {
            return;
        }
        this._nextButton.removeAttribute('disabled');
    }

    /**
     * @function disableNextButton
     * @description Метод деактивации кнопки далее.
     */
    disableNextButton() {
        if (!this._nextButton) {
            return;
        }
        this._nextButton.setAttribute('disabled', 'disabled');
    }

    /**
     * @function enableBackButton
     * @description Метод активации кнопки назад.
     */
    enableBackButton() {
        if (!this._backButton) {
            return;
        }
        this._backButton.removeAttribute('disabled');
    }

    /**
     * @function disableBackButton
     * @description Метод деактивации кнопки назад.
     */
    disableBackButton() {
        if (!this._backButton) {
            return;
        }
        this._backButton.setAttribute('disabled', 'disabled');
    }
}