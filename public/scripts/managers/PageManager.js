/*
    Менеджер страниц.
    Отвечает за регистрацию страниц, хранение их в памяти и отображение на экране + уничтожение предыдущей страницы.
*/

'use strict';

export class PageManager {
    constructor() {
        this.pages = {};
        this.activePage = null;
        this.routes = {};

        window.addEventListener('popstate', () => this.renderPageByUrl());
    }

    registerPage(pageName, page, route) {
        this.pages[pageName] = page;
        this.routes[route] = pageName;
    }

    getPage(pageName) {
        return this.pages[pageName];
    }

    renderPage(pageName) {
        if (this.activePage) {
            this.activePage.destroy();
        }

        this.activePage = this.pages[pageName];

        if (this.activePage) {
            this.activePage.render(window.root);

            const route = Object.keys(this.routes).find(key => this.routes[key] === pageName);
            if (route) {
                history.pushState(null, null, route);
            }
        }
    }

    navigateTo(route) {
        if (this.routes[route]) {
            history.pushState(null, null, route);
            this.renderPage(this.routes[route]);
        } else {
            this.renderPage('404'); // TODO: Сделать страницу 404
        }
    }

    renderPageByUrl() {
        const path = window.location.pathname;
        this.renderPage(this.routes[path] || '404');
    }
}