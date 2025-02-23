/*
    Менеджер страниц.
    Отвечает за регистрацию страниц, хранение их в памяти и отображение на экране + уничтожение предыдущей страницы.
*/

'use strict';

export class PageManager {
    constructor() {
        this.pages = {};
        this.activePage = null;
    }

    registerPage(pageName, page) {
        this.pages[pageName] = page;
    }

    getPage(pageName) {
        return this.pages[pageName];
    }

    renderPage(pageName) {
        if (this.activePage) {
            this.activePage.destroy();
        }
        this.activePage = this.pages[pageName];
        this.activePage.render(root);
    }
}