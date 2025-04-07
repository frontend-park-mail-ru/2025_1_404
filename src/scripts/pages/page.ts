
import {BaseLayout} from "../layouts/baseLayout.js";

export interface PageRenderInterface {
    /**
     * @property {HTMLElement} root корневой элемент страницы
     */
    root: HTMLElement;
    /**
     * @property {BaseLayout} layout макет страницы, который используется для рендеринга
     */
    layout?: BaseLayout;
    props?: any;
}

/**
 * @class Page
 * @description Базовый класс страницы
 */
export class Page {
    handlers: any[];
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
    render({}: PageRenderInterface): void {
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
    initListener(elementId: string, type: string, handler: Function) {
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