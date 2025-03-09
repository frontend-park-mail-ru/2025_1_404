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
     * @param pageName ключевое имя страницы
     * @param page объект страницы
     */
    registerPage(pageName, page) {
        this.pages[pageName] = page;
    }

    /**
     * @method getPage
     * @description Получение страницы по имени
     * @param pageName ключевое имя страницы
     * @returns {Page}
     */
    getPage(pageName) {
        return this.pages[pageName];
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
        this.activePage.render(window.root, props);
    }

    /**
     * @method setHeaderStatus
     * @description Установка статуса шапки (для авторизованного пользователя или нет)
     * @param isAuthorized
     */
    setHeaderStatus(isAuthorized) {
        if (this.activePage) {
            this.activePage.setHeaderStatus(isAuthorized);
        }
    }
}