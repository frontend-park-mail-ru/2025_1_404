
import {BaseLayout} from "../layouts/baseLayout.ts";
import {Page} from "../pages/page.ts";

export interface BaseComponentInterface {
    page: Page;
    layout: BaseLayout | undefined;
}

interface HandlerInterface {
    element: Element;
    handler: EventListenerOrEventListenerObject;
    type: string;
}

/**
 * @class BaseComponent
 * @description Базовый класс компонента.
 */
export class BaseComponent {
    protected page: Page;
    protected layout: BaseLayout | undefined;
    private handlers: HandlerInterface[];
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
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
    initListener(elementId: string, type: string, handler: (event: Event) => void) {
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
    initListenerForClass(classId: string, type: string, handler: (event: Event) => void) {
        const elements = document.getElementsByClassName(classId);
        const boundedHandler = handler.bind(this);
        Array.from(elements).forEach((element: Element) => {
            element.addEventListener(type, boundedHandler);
            this.handlers.push({element, handler: boundedHandler, type});
        });
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