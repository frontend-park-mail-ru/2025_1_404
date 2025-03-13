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
        this.lastPath = null;
        this.PATH_START_INDEX = 1;
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
        if (pathStr === this.lastPath) {
            return;
        }
        this.lastPath = pathStr;

        let path = pathStr.split('/').slice(this.PATH_START_INDEX);
        path = path.length ? path : [pathStr]

        const [route] = path;
        path = path.slice(this.PATH_START_INDEX);
        history.pushState(null, null, pathStr);
        if (this.routes[route]) {
            this.routes[route].process(path);
        } else {
             //Сделать страницу 404
            this.routes['404'].process(path);
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