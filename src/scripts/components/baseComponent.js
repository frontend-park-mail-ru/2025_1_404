'use strict';

/**
 * @class BaseComponent
 * @description Базовый класс компонента.
 */
export default class BaseComponent {
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}) {
        this.page = page;
        this.layout = layout;
        this.handlers = [];

        this.initListeners();
    }

    /**
     * @function destroy
     * @description Метод уничтожения компонента.
     */
    destroy() {
        this.removeListeners();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {}

    /**
     * @function initListener
     * @description Метод инициализации слушателя события.
     * @param {string} elementId id элемента.
     * @param {string} type тип события.
     * @param {Function} handler обработчик события.
     */
    initListener(elementId, type, handler) {
        const element = document.getElementById(elementId);
        if (element) {
            const boundedHandler = handler.bind(this);
            element.addEventListener(type, boundedHandler);
            this.handlers.push({element, handler: boundedHandler, type});
        }
    }

    /**
     * @function initListenerForClass
     * @description Метод инициализации слушателя события для всех элементов с заданным классом.
     * @param {string} classId id класса.
     * @param {string} type тип события.
     * @param {Function} handler обработчик события.
     */
    initListenerForClass(classId, type, handler) {
        const elements = document.getElementsByClassName(classId);
        console.log(elements);
        if (elements) {
            const boundedHandler = handler.bind(this);
            for (const element of elements) {
                element.addEventListener(type, boundedHandler);
                this.handlers.push({element, handler: boundedHandler, type});
            }
        }
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

}