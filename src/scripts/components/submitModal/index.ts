import BaseModal, {BaseModalInterface} from "../baseModal";

export interface SubmitFormInterface {
    title: string;
    submitButtonName: string;
    denyButtonName: string;
    onSubmit?: () => void;
    onDeny?: () => void;
}

/**
 * @class Login
 * @description Компонент авторизации.
 * @augments BaseComponent
 */
export default class SubmitModal extends BaseModal {
    private onSubmitButtonHandler: (() => void) | undefined;
    private onDenyButtonHandler: (() => void) | undefined;

    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     * @param {string} id - идентификатор компонента.
     */
    constructor({page, layout, id}: BaseModalInterface) {
        super({layout, page, id});
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        super.initListeners();
        this.initListenerFromElement({
            root: this._id,
            elementId: 'submitModal-denyButton',
            type: 'click',
            handler: this._submitCancelButtonHandler
        });
        this.initListenerFromElement({
            root: this._id,
            elementId: 'submitModal-submitButton',
            type: 'click',
            handler: this._submitButtonHandler
        });
    }

    /**
     * @function _submitCancelButtonHandler
     * @description Метод обработки события нажатия на кнопку отмены.
     */
    _submitCancelButtonHandler() {
        if (this.onDenyButtonHandler) {
            this.onDenyButtonHandler();
        }
        super._submitCancelButtonHandler();
    }

    /**
     * @function _submitButtonHandler
     * @description Метод обработки события нажатия на кнопку отправки.
     */
    _submitButtonHandler() {
        if (this.onSubmitButtonHandler) {
            this.onSubmitButtonHandler();
        }
        this.setShowModal(false);
    }

    /**
     * @function setShowModal
     * @description Метод установки состояния окна авторизации.
     * @param {boolean} isShow - состояние окна авторизации.c
     */
    setShowModal(isShow: boolean) {
        super.setShowModal(isShow);
    }

    /**
     * @function showSubmitForm
     * @description Метод отображения формы отправки.
     * @param {SubmitFormInterface} options - параметры формы отправки.
     */
    showSubmitForm(options: SubmitFormInterface) {
        const submitModal = document.getElementById('submitModal') as HTMLElement;
        const title = submitModal.querySelector('#submitModal-title') as HTMLElement;
        if (title) {
            title.textContent = options.title;
        }
        const submitButton = submitModal.querySelector('#submitModal-submitButton') as HTMLButtonElement;
        if (submitButton) {
            submitButton.textContent = options.submitButtonName;
        }
        const denyButton = submitModal.querySelector('#submitModal-denyButton') as HTMLButtonElement;
        if (denyButton) {
            denyButton.textContent = options.denyButtonName;
        }
        this.onSubmitButtonHandler = options.onSubmit;
        this.onDenyButtonHandler = options.onDeny;
        this.setShowModal(true);
    }

}