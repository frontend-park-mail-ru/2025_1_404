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
    private _overlay: HTMLElement;
    protected _id: string;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     * @param {string} id - id модального окна
     */
    constructor({page, layout, id}: BaseModalInterface) {
        super({layout, page});
        this._overlay = document.querySelector('.overlay') as HTMLElement;
        this._id = id;
        this.initListeners();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('overlay', 'click', this._overlayHandler);
        this.initListenerFromElement({
            root: this._id,
            elementId: 'modalCloseButton',
            type: 'click',
            handler: this._submitCancelButtonHandler
        });
    }

    /**
     * @function setShowModal
     * @description Метод установки состояния модального окна.
     * @param {boolean} isShow - состояние модального окна.
     */
    setShowModal(isShow: boolean) {
        const modal = document.getElementById(this._id) as HTMLElement;
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
     * @function _submitCancelButtonHandler
     * @description Обработчик события закрытия модального окна
     * @private
     */
    _submitCancelButtonHandler() {
        this.setShowModal(false);
    }

    /**
     * @function _overlayHandler
     * @description Обработчик события клика на затемненное пространство
     * @param {Event} event событие клика
     * @private
     */
    _overlayHandler(event: Event) {
        if (event.target === this._overlay) {
            this._submitCancelButtonHandler();
        }
    }
}