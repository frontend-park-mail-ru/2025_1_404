import {Page, PageRenderInterface} from "../pages/page.ts";
import Loader from "../components/loader";
import ProgressBar from "../components/progressBar";
import RouteManager from "../managers/routeManager/routeManager.ts";
import User from "../models/user.ts";
import {updateCSRF} from "../util/apiUtil.ts";
import SubmitModal from "../components/baseModal";
import Popup from "../components/popup";
import CsatUtil from "../util/csatUtil.ts";
import Csat, {CSATType} from "../components/csat";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventCallback = (...args: any[]) => void;

/**
 * @class BaseLayout
 * @description Базовый класс для всех макетов.
 */
export class BaseLayout {
    private events: Record<string, EventCallback | null>;
    private handlers: Array<{ element: HTMLElement; handler: EventListenerOrEventListenerObject; type: keyof HTMLElementEventMap | string }>;
    private progressBar: ProgressBar | undefined;
    private loader: Loader | undefined;
    private page: Page | undefined;
    protected submitForm: SubmitModal | undefined;
    private csat: Csat | undefined;
    /**
     * @description Конструктор класса.
     */
    constructor() {
        this.events = {};
        this.handlers = [];
    }

    /**
     * @function process
     * @description Метод обработки страницы.
     * @param {Page} page экземпляр класса Page.
     * @returns {{destroy: *, render: *}} Метод destroy и метод render.
     */
    process(page: Page) {
        return {
            destroy: () => {
                this.removeListeners();
                page.destroy();
            },
            render: ({root, props}: PageRenderInterface) => {
                this.progressBar = new ProgressBar({layout: this, page});
                this.loader = new Loader({layout: this, page});
                this.submitForm = new SubmitModal({layout: this, page, id: 'submitModal'});
                this.page = page;
                this.csat = new Csat({page, layout: this});

                page.render({
                    layout: this,
                    props,
                    root
                });

                this.initListeners();
                this.loadUser();
            },
            handlers: page.handlers,
            initListeners: page.initListeners,
            initListener: page.initListener,
            removeListeners: page.removeListeners,
            formInputHandler: page.formInputHandler,
            resetApiError: page.resetApiError,
            showApiError: page.showApiError,
            showFieldError: page.showFieldError,
            validateFormFields: page.validateFormFields,
        }
    }

    processCSAT({type, event}: {type: CSATType, event: string}) {
        this.makeRequest(CsatUtil.getEventDetails, event).then((data) => {
            if (data.questions.length === 0) {
                return;
            }
            // this.csat.show({type, title})

        })
    }

    /**
     * @function setLoaderStatus
     * @description Метод установки статуса загрузчика.
     * @param {boolean} status статус загрузчика.
     */
    setLoaderStatus(status: boolean) {
        if (this.loader) {
            this.loader.setLoaderStatus(status);
        }
    }

    /**
     * @function loadUser
     * @description Метод загрузки пользователя.
     */
    loadUser() {
        if (User.isLoaded()) {
            return;
        }
        if (this.loader) {
            this.loader.setLoaderStatus(true);
        }
        updateCSRF().finally(() => {
            User.update().finally(() => {
                RouteManager.navigateToPageByCurrentURL();
            });
        })
    }

    /**
     * @function addPopup
     * @description Метод добавления попапа.
     * @param {string} title - заголовок попапа.
     * @param {string} details - детали попапа.
     */
    addPopup(title: string, details: string) {
        if (!this.page) {
            return;
        }
        const popup = new Popup({
            layout: this,
            page: this.page
        });
        const popups = document.querySelector('.popups');
        if (!popups) {
            return;
        }
        const totalPopups = popups.querySelectorAll('.popup');
        if (totalPopups.length >= 3) {
            const firstPopup = totalPopups[0];
            firstPopup.remove();
        }
        popups.insertAdjacentHTML('beforeend', popup.render({
            title,
            details
        }));
    }

    /**
     * @function on
     * @description Метод подписки на событие.
     * @param {string} event название события.
     * @param {Function} callback функция обратного вызова.
     */
    on(event: string, callback: EventCallback) {
        this.events[event] = callback;
    }

    /**
     * @function off
     * @description Метод отписки от события.
     * @param {string} event название события.
     */
    off(event: string) {
        this.events[event] = null;
    }

    /**
     * @function emit
     * @description Метод вызова события.
     * @param {string} event название события.
     * @param {*} args аргументы события.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emit(event: string, ...args: any[]) {
        if (this.events[event]) {
            this.events[event](...args);
        }
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('popups', 'click', this.onPopupClickHandler);
    }

    /**
     * @function initListener
     * @description Метод инициализации слушателя событий.
     * @param {string} elementId id элемента.
     * @param {string} type тип события.
     * @param {(event: Event)=>void} handler обработчик события.
     */
    initListener(elementId: string, type: string, handler: (event: Event)=>void) {
        const element = document.getElementById(elementId);
        if (!element) {
            return;
        }
        const boundedHandler = handler.bind(this);
        element.addEventListener(type, boundedHandler);
        this.handlers.push({element, handler: boundedHandler, type});
    }

    /**
     * @function removeListeners
     * @description Метод удаления слушателей событий.
     */
    removeListeners() {
        this.handlers.forEach(({element, handler, type}) => {
            if (element) {
                element.removeEventListener(type, handler);
            }
        });
    }

    /**
     * @function onPopupClickHandler
     * @description Метод обработки клика по попапу.
     * @param {Event} event событие.
     */
    onPopupClickHandler(event: Event) {
        let target = event.target as HTMLElement;
        while (target.parentElement && !(target.classList.contains('popup') || target.classList.contains('popup__close'))) {
            target = target.parentElement;
        }
        if (target.classList.contains('popup__close')) {
            const popup = target.closest('.popup');
            if (popup) {
                popup.remove();
            }
        }
    }

    /**
     * @function makeRequest
     * @description Метод выполнения запроса.
     * @param {Function} func функция запроса.
     * @param {*} args аргументы запроса.
     * @returns {Promise<void>} Promise, который будет выполнен после завершения запроса.
     */
    async makeRequest<TArgs extends unknown[], TReturn>(func: (...args: TArgs) => Promise<TReturn>, ...args: TArgs) {
        if (this.progressBar) {
            this.progressBar.setPercentage(30);
        }
        return await func(...args)
            .then((data) => data)
            .catch((err: Error) => {
                throw err;
            }).finally(() => {
                if (this.progressBar) {
                    this.progressBar.setPercentage(100);
                }
            })
    }
}