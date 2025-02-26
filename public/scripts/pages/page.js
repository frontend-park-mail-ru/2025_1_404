'use strict';

/**
 * @class Page
 * @description Базовый класс страницы
 */
export default class Page {
    /**
     * @method render
     * @description Метод, который вызывается при рендере страницы.
     * @param root
     * @param path
     */
    render(root, path={}) {}

    /**
     * @method destroy
     * @description Метод, который вызывается при уничтожении страницы.
     */
    destroy() {}
}