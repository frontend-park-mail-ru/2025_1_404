
import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";

/**
 * @class OfferCreateBtns
 * @description Компонент панели с кнопками на странице создания объявления.
 * @augments BaseComponent
 */
export default class OfferCreateBtns extends BaseComponent {
    private nextButton: HTMLElement | null;
    private backButton: HTMLElement | null;
    private submitButton: HTMLElement | null;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({layout, page});

        this.nextButton = document.getElementById('offerCreateBtnsNext');
        this.backButton = document.getElementById('offerCreateBtnsBack');
        this.submitButton = document.getElementById('offerCreateBtnsSubmit');
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('offerCreateBtnsDelete', 'click', this.deleteButtonClickHandler);
        this.initListener('offerCreateBtnsSave', 'click', this.saveButtonClickHandler);
        this.initListener('offerCreateBtnsBack', 'click', this.backButtonClickHandler);
        this.initListener('offerCreateBtnsNext', 'click', this.nextButtonClickHandler);
        this.initListener('offerCreateBtnsSubmit', 'click', this.submitButtonClickHandler);
    }

    /**
     * @function deleteButtonClickHandler
     * @description Обработчик клика по кнопке удаления объявления.
     * @private
     */
    private deleteButtonClickHandler() {

    }

    /**
     * @function saveButtonClickHandler
     * @description Обработчик клика по кнопке сохранения объявления.
     * @private
     */
    private saveButtonClickHandler() {

    }

    /**
     * @function submitButtonClickHandler
     * @description Обработчик клика по кнопке отправки объявления.
     * @private
     */
    private submitButtonClickHandler() {
        if (!this.layout) {
            return;
        }
        this.layout.emit('submitPage');
    }

    /**
     * @function backButtonClickHandler
     * @description Обработчик клика по кнопке назад.
     * @private
     */
    private backButtonClickHandler() {
        if (!this.layout) {
            return;
        }
        this.layout.emit('prevPage');
    }

    /**
     * @function nextButtonClickHandler
     * @description Обработчик клика по кнопке далее.
     * @private
     */
    private nextButtonClickHandler() {
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
        if (!this.submitButton) {
            return;
        }
        this.submitButton.removeAttribute('disabled');
    }

    /**
     * @function disableSubmitButton
     * @description Метод деактивации кнопки завершения.
     */
    disableSubmitButton() {
        if (!this.submitButton) {
            return;
        }
        this.submitButton.setAttribute('disabled', 'disabled');
    }

    /**
     * @function enableNextButton
     * @description Метод активации кнопки далее.
     */
    enableNextButton() {
        if (!this.nextButton) {
            return;
        }
        this.nextButton.removeAttribute('disabled');
    }

    /**
     * @function disableNextButton
     * @description Метод деактивации кнопки далее.
     */
    disableNextButton() {
        if (!this.nextButton) {
            return;
        }
        this.nextButton.setAttribute('disabled', 'disabled');
    }

    /**
     * @function enableBackButton
     * @description Метод активации кнопки назад.
     */
    enableBackButton() {
        if (!this.backButton) {
            return;
        }
        this.backButton.removeAttribute('disabled');
    }

    /**
     * @function disableBackButton
     * @description Метод деактивации кнопки назад.
     */
    disableBackButton() {
        if (!this.backButton) {
            return;
        }
        this.backButton.setAttribute('disabled', 'disabled');
    }
}