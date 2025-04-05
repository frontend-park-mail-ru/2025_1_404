'use strict';

/**
 * @class Page
 * @description Базовый класс страницы
 */
export default class Page {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        this.handlers = [];
    }

    /**
     * @function render
     * @description Метод, который вызывается при рендере страницы.
     */
    render() {
        this.initListeners();
    }

    /**
     * @function destroy
     * @description Метод, который вызывается при уничтожении страницы.
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
     * @param {string} elementId id элемента
     * @param {string} type тип события
     * @param {Function} handler обработчик события
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
     * @function removeListeners
     * @description Метод удаления слушателей событий.
     */
    removeListeners() {
        this.handlers.forEach(({element, handler, type}) => {
            element.removeEventListener(type, handler);
        });
    }
}