import Loader from "../components/loader";
import ProgressBar from "../components/progressBar";
import RouteManager from "../managers/routeManager/routeManager.js";
import User from "../models/user.js";
import {Page, PageRenderInterface} from "../pages/page.js";


/**
 * @class BaseLayout
 * @description Базовый класс для всех макетов.
 */
export class BaseLayout {
    private events: Record<string, Function | null>;
    private handlers: Array<{ element: HTMLElement; handler: EventListenerOrEventListenerObject; type: keyof HTMLElementEventMap | string }>;
    private _progressBar: ProgressBar | undefined;
    private _loader: Loader | undefined;
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
                this.initListeners();

                this._progressBar = new ProgressBar({layout: this, page});
                this._loader = new Loader({layout: this, page});

                page.render({
                    layout: this,
                    props,
                    root
                });

                this.loadUser();
            },
            handlers: page.handlers,
            initListeners: page.initListeners,
            initListener: page.initListener,
            removeListeners: page.removeListeners,
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
        if (this._loader) {
            this._loader.setLoaderStatus(true);
        }
        User.update().finally(() => {
            RouteManager.navigateToPageByCurrentURL();
        });
    }

    /**
     * @function on
     * @description Метод подписки на событие.
     * @param {string} event название события.
     * @param {Function} callback функция обратного вызова.
     */
    on(event: string, callback: Function) {
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
    }

    /**
     * @function initListener
     * @description Метод инициализации слушателя событий.
     * @param {string} elementId id элемента.
     * @param {string} type тип события.
     * @param {Function} handler обработчик события.
     */
    initListener(elementId: string, type: string, handler: Function) {
        const element = document.getElementById(elementId);
        if (element === null) {
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
     * @function makeRequest
     * @description Метод выполнения запроса.
     * @param {Function} func функция запроса.
     * @param {*} args аргументы запроса.
     * @returns {Promise<void>} Promise, который будет выполнен после завершения запроса.
     */
    async makeRequest(func: Function, ...args: any[]) {
        if (this._progressBar) {
            this._progressBar.setPercentage(30);
        }
        return await func(...args)
            .then((data: any) => data)
            .catch((err: Error) => {
                throw err;
            }).finally(() => {
                if (this._progressBar) {
                    this._progressBar.setPercentage(100);
                }
            })
    }

}