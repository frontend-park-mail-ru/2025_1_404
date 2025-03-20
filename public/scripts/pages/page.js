'use strict';

import RouteManager from "../managers/RouteManager.js";

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
    render({root, props, layout}) {
    }

    /**
     * @method destroy
     * @description Метод, который вызывается при уничтожении страницы.
     */
    destroy() {
    }
}