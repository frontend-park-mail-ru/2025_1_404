import {Page} from "../pages/page.ts";

/**
 * @class PageManager
 * @description Класс для управления страницами
 */
class PageManager {
    private pages: Record<string, Page>;
    private activePage: Page | null
    private events: Record<string, Function | null>;
    private root: HTMLElement | null | undefined;
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
    on(event: string, callback: Function) {
        this.events[event] = callback;
    }

    /**
     * @function off
     * @description Отписка от события
     * @param {string} event название события
     */
    off(event: string) {
        this.events[event] = null;
    }

    /**
     * @function emit
     * @description Вызов события
     * @param {string} event название события
     */
    emit(event: string) {
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
    registerPage(pageName: string, page: Page) {
        this.pages[pageName] = page;
    }

    /**
     * @function renderPage
     * @description Рендер страницы
     * @param {string} pageName ключевое имя страницы
     * @param {object} props параметры страницы
     */
    renderPage(pageName: string, props={}) {
        if (this.activePage) {
            this.activePage.destroy();
        }

        this.activePage = this.pages[pageName];
        if (!this.root) {
            return;
        }
        this.activePage.render({
            props,
            root: this.root
        });
    }
}

export default new PageManager();