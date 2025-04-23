import {BaseComponent} from "../baseComponent.ts";
import {Page} from "../../pages/page.ts";
import {BaseLayout} from "../../layouts/baseLayout.ts";

export interface BaseModalInterface {
    id: string;
    page: Page;
    layout: BaseLayout;
}

/**
 * @class BaseModal
 * @description Компонент модального окна.
 * @augments BaseComponent
 */
export default class BaseModal extends BaseComponent {
    private overlay: HTMLElement;
    protected id: string;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     * @param {string} id - id модального окна
     */
    constructor({page, layout, id}: BaseModalInterface) {
        super({layout, page});
        this.overlay = document.querySelector('.overlay') as HTMLElement;
        this.id = id;
        this.initListeners();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('overlay', 'click', this.overlayHandler);
        this.initListenerFromElement({
            root: this.id,
            elementId: 'modalCloseButton',
            type: 'click',
            handler: this.submitCancelButtonHandler
        });
    }

    /**
     * @function setShowModal
     * @description Метод установки состояния модального окна.
     * @param {boolean} isShow - состояние модального окна.
     */
    setShowModal(isShow: boolean) {
        const modal = document.getElementById(this.id) as HTMLElement;
        const overlay = document.querySelector(".overlay") as HTMLElement;
        if (isShow) {
            modal.classList.add('active');
            overlay.classList.add('active');
            return;
        }
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }

    /**
     * @function submitCancelButtonHandler
     * @description Обработчик события закрытия модального окна
     * @private
     */
    protected submitCancelButtonHandler() {
        this.setShowModal(false);
    }

    /**
     * @function overlayHandler
     * @description Обработчик события клика на затемненное пространство
     * @param {Event} event событие клика
     * @private
     */
    private overlayHandler(event: Event) {
        if (event.target === this.overlay) {
            this.submitCancelButtonHandler();
        }
    }
}