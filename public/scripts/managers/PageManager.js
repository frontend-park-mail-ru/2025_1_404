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

    renderPage(pageName, path={}) {
        if (this.activePage) {
            this.activePage.destroy();
        }

        this.activePage = this.pages[pageName];
        this.activePage.render(window.root, path);
    }

    navigateTo(pathStr) {
        // Это конечно треш, в идеале сделать эти проверки на index адекватными.
        if (pathStr === 'index')
            pathStr = '/';
        let path = pathStr.split('/').slice(1);
        if (path.length === 0)
            path = [pathStr];
        let route = path[0];
        if (route === '')
            route = 'index';
        path = path.slice(1);
        if (this.pages[route]) {
            history.pushState(null, null, pathStr);
            this.renderPage(route, path);
        } else {
            this.renderPage('404'); // TODO: Сделать страницу 404
        }
    }

    navigateToPageByCurrentURL() {
        const path = window.location.pathname;
        this.navigateTo(path);
    }
}