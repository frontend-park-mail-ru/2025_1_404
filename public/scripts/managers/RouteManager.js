'use strict';

/**
 * @class RouteManager
 * @classdesc Менеджер маршрутов.
 */
export class RouteManager {
    /**
     * @constructor
     * @description Создание менеджера маршрутов.
     */
    constructor() {
        this.routes = {};
    }

    /**
     * @method registerRoute
     * @description Регистрация маршрута.
     * @param routeName ключевое имя маршрута
     * @param route объект маршрута
     */
    registerRoute(routeName, route) {
        this.routes[routeName] = route;
    }

    /**
     * @method getRoute
     * @description Получение маршрута по имени.
     * @param routeName ключевое имя маршрута
     * @returns {BaseRoute}
     */
    getRoute(routeName) {
        return this.routes[routeName];
    }

    /**
     * @method navigateTo
     * @description Переход на маршрут.
     * @param pathStr путь URL
     */
    navigateTo(pathStr) {
        let path = pathStr.split('/').slice(1);
        if (path.length === 0)
            path = [pathStr];
        let route = path[0];
        path = path.slice(1);
        history.pushState(null, null, pathStr);
        if (this.routes[route]) {
            this.routes[route].process(path);
        } else {
            this.routes['404'].process(path); // TODO: Сделать страницу 404
        }
    }

    /**
     * @method navigateToPageByCurrentURL
     * @description Переход на страницу по текущему URL.
     */
    navigateToPageByCurrentURL() {
        const path = window.location.pathname;
        this.navigateTo(path);
    }
}