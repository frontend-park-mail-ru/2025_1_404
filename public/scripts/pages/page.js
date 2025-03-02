'use strict';

/**
 * @class Page
 * @description Базовый класс страницы
 */
export default class Page {
    /**
     * @method render
     * @description Метод, который вызывается при рендере страницы.
     * @param _root {HTMLElement} - корневой элемент страницы
     */
    render(_root) {}

    /**
     * @method destroy
     * @description Метод, который вызывается при уничтожении страницы.
     */
    destroy() {}
}