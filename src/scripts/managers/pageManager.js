'use strict';

/**
 * @class PageManager
 * @description Класс для управления страницами
 */
class PageManager {
    /**
     * @constructor
     * @description Конструктор класса
     */
    constructor() {
        this.pages = {};
        this.activePage = null;
        this.events = {};

        this.on('init', () => {
            this.root = document.getElementById('root');
        })
    }

    on(event, callback) {
        this.events[event] = callback;
    }

    off(event) {
        this.events[event] = null;
    }

    emit(event) {
        if (this.events[event]) {
            this.events[event]();
        }
    }

    /**
     * @method registerPage
     * @description Регистрация страницы
     * @param pageName ключевое имя страницы
     * @param page объект страницы
     */
    registerPage(pageName, page) {
        this.pages[pageName] = page;
    }

    /**
     * @method renderPage
     * @description Рендер страницы
     * @param pageName ключевое имя страницы
     * @param props параметры для страницы
     */
    renderPage(pageName, props={}) {
        if (this.activePage) {
            this.activePage.destroy();
        }

        this.activePage = this.pages[pageName];
        this.activePage.render({
            props,
            root: this.root
        });
    }
}

export default new PageManager();