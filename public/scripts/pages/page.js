'use strict';

/**
 * @class Page
 * @description Базовый класс страницы
 */
export default class Page {
    constructor() {
        this.handlers = [];
    }

    /**
     * @method render
     * @description Метод, который вызывается при рендере страницы.
     */
    render() {
        this.initListeners();
    }

    /**
     * @method destroy
     * @description Метод, который вызывается при уничтожении страницы.
     */
    destroy() {
        this.removeListeners();
    }

    initListeners() {}

    initListener(elementId, type, handler) {
        const element = document.getElementById(elementId);
        if (element) {
            const boundedHandler = handler.bind(this);
            element.addEventListener(type, boundedHandler);
            this.handlers.push({element, handler: boundedHandler, type});
        }
    }

    removeListeners() {
        this.handlers.forEach(({element, handler, type}) => {
            element.removeEventListener(type, handler);
        });
    }
}