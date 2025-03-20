'use strict';

/**
 * @class BaseComponent
 * @description Базовый класс компонента.
 */
export default class BaseComponent {
    constructor({page, layout}) {
        this.page = page;
        this.layout = layout;
    }

    destroy() {
    }
}