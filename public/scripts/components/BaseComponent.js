'use strict';

/**
 * @class BaseComponent
 * @description Базовый класс компонента.
 */
export default class BaseComponent {
    constructor({page, layout}) {
        this.page = page;
        this.layout = layout;
        this.handlers = [];

        this.initListeners();
    }

    destroy() {
        this.removeListeners();
    }

    initListeners() {}

    initListener(elementId, type, handler) {
        const element = document.getElementById(elementId);
        const boundedHandler = handler.bind(this);
        element.addEventListener(type, boundedHandler);
        this.handlers.push({element, handler: boundedHandler, type});
    }

    removeListeners() {
        this.handlers.forEach(({element, handler, type}) => {
            element.removeEventListener(type, handler);
        });
    }

}