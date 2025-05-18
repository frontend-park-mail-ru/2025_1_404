import BaseModal, {BaseModalInterface} from "../baseModal";

export interface PromotionFormInterface {
    title: string;
    submitButtonName: string;
    submitButtonClass: string;
    denyButtonName: string;
    denyButtonClass: string;
    promotionChoices: Record<string, string>;
    onSubmit?: () => void;
    onDeny?: () => void;
}

/**
 * @class PromotionModal
 * @description Компонент модального окна продвижения объявления.
 * @augments BaseModal
 */
export default class PromotionModal extends BaseModal {
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
            root: this.id,
            elementId: 'promotionModal-denyButton',
            type: 'click',
            handler: this.submitCancelButtonHandler
        });
        this.initListenerFromElement({
            root: this.id,
            elementId: 'promotionModal-submitButton',
            type: 'click',
            handler: this.submitButtonHandler
        });
    }

    /**
     * @function submitCancelButtonHandler
     * @description Метод обработки события нажатия на кнопку отмены.
     */
    submitCancelButtonHandler() {
        if (this.onDenyButtonHandler) {
            this.onDenyButtonHandler();
        }
        super.submitCancelButtonHandler();
    }

    /**
     * @function submitButtonHandler
     * @description Метод обработки события нажатия на кнопку отправки.
     */
    private submitButtonHandler() {
        if (this.onSubmitButtonHandler) {
            this.onSubmitButtonHandler();
        }
        this.setShowModal(false);
    }

    /**
     * @function setShowModal
     * @description Метод установки состояния окна авторизации.
     * @param {boolean} isShow - состояние окна авторизации
     */
    setShowModal(isShow: boolean) {
        super.setShowModal(isShow);
    }

    /**
     * @function showPromotionForm
     * @description Метод отображения формы продвижения объявления.
     * @param {SubmitFormInterface} options - параметры формы отправки.
     */
    showPromotionForm(options: PromotionFormInterface) {
        const promotionModal = document.getElementById('promotionModal') as HTMLElement;
        const title = promotionModal.querySelector('#promotionModal-title') as HTMLElement;
        if (title) {
            title.textContent = options.title;
        }
        const submitButton = promotionModal.querySelector('#promotionModal-submitButton') as HTMLButtonElement;
        if (submitButton) {
            submitButton.className = `${options.submitButtonClass}-btn`;
            submitButton.textContent = options.submitButtonName;
        }
        const denyButton = promotionModal.querySelector('#promotionModal-denyButton') as HTMLButtonElement;
        if (denyButton) {
            denyButton.className = `${options.denyButtonClass}-btn`;
            denyButton.textContent = options.denyButtonName;
        }
        const choiceLabels = promotionModal.querySelectorAll<HTMLElement>('.choice-label');
        choiceLabels.forEach((el) => {
            const forAttr = el.getAttribute('for');
            if (!forAttr) {
                return null;
            }
            const index = forAttr.split('-').pop();
            if (!index) {
                return null;
            }
            el.textContent = options.promotionChoices[index];
        })
        this.onSubmitButtonHandler = options.onSubmit;
        this.onDenyButtonHandler = options.onDeny;
        this.setShowModal(true);
    }

}