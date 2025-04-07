import Loader from "../components/loader/index.js";
import ProgressBar from "../components/progressBar/index.js";
import RouteManager from "../managers/routeManager/routeManager.js";
import User from "../models/user.js";

/**
 * @class BaseLayout
 * @description Базовый класс для всех макетов.
 */
export default class BaseLayout {
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
    process(page) {
        return {
            destroy: () => {
                this.removeListeners();
                page.destroy();
            },
            render: ({root, props}) => {
                this.initListeners();

                this._progressBar = new ProgressBar({layout: this, page});
                this._loader = new Loader({layout: this, page});

                page.render({
                    layout: this,
                    props,
                    root
                });

                this.loadUser();
            }
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
        this._loader.setLoaderStatus(true);
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
    on(event, callback) {
        this.events[event] = callback;
    }

    /**
     * @function off
     * @description Метод отписки от события.
     * @param {string} event название события.
     */
    off(event) {
        this.events[event] = null;
    }

    /**
     * @function emit
     * @description Метод вызова события.
     * @param {string} event название события.
     * @param {*} args аргументы события.
     */
    emit(event, ...args) {
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
    initListener(elementId, type, handler) {
        const element = document.getElementById(elementId);
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
            element.removeEventListener(type, handler);
        });
    }

    /**
     * @function makeRequest
     * @description Метод выполнения запроса.
     * @param {Function} func функция запроса.
     * @param {*} args аргументы запроса.
     * @returns {Promise<void>} Promise, который будет выполнен после завершения запроса.
     */
    async makeRequest(func, ...args) {
        this._progressBar.setPercentage(30);
        return await func(...args)
            .then((data) => data)
            .catch((err) => {
                throw err;
            }).finally(() => {
                this._progressBar.setPercentage(100);
            })
    }

}