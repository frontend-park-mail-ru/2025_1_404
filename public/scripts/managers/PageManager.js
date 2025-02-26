'use strict';

/**
 * @class PageManager
 * @description Класс для управления страницами
 */
export class PageManager {
    /**
     * @constructor
     * @description Конструктор класса
     */
    constructor() {
        this.pages = {};
        this.activePage = null;
    }

    /**
     * @method registerPage
     * @description Регистрация страницы
     * @param pageName
     * @param page
     */
    registerPage(pageName, page) {
        this.pages[pageName] = page;
    }

    /**
     * @method getPage
     * @description Получение страницы по имени
     * @param pageName
     * @returns {Page}
     */
    getPage(pageName) {
        return this.pages[pageName];
    }

    /**
     * @method renderPage
     * @description Рендер страницы
     * @param pageName
     * @param props
     */
    renderPage(pageName, props={}) {
        if (this.activePage) {
            this.activePage.destroy();
        }

        this.activePage = this.pages[pageName];
        this.activePage.render(window.root, props);
    }
}