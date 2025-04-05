'use strict';

/**
 * @class PageManager
 * @description Класс для управления страницами
 */
class PageManager {
    /**
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

    /**
     * @function on
     * @description Подписка на событие
     * @param {string} event название события
     * @param {Function} callback функция для вызова
     */
    on(event, callback) {
        this.events[event] = callback;
    }

    /**
     * @function off
     * @description Отписка от события
     * @param {string} event название события
     */
    off(event) {
        this.events[event] = null;
    }

    /**
     * @function emit
     * @description Вызов события
     * @param {string} event название события
     */
    emit(event) {
        if (this.events[event]) {
            this.events[event]();
        }
    }

    /**
     * @function registerPage
     * @description Регистрация страницы
     * @param {string} pageName ключевое имя страницы
     * @param {object} page объект страницы
     */
    registerPage(pageName, page) {
        this.pages[pageName] = page;
    }

    /**
     * @function renderPage
     * @description Рендер страницы
     * @param {string} pageName ключевое имя страницы
     * @param {object} props параметры страницы
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