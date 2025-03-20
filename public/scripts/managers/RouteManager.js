'use strict';

import {UnknownRoute} from "../routes/UnknownRoute.js";

/**
 * @class RouteManager
 * @classdesc Менеджер маршрутов.
 */
class RouteNode {
    constructor() {
        this.children = {};
        this.route = null;
        this.paramName = null;
    }
}

class RouteManager {
    /**
     * @constructor
     * @description Создание менеджера маршрутов.
     */
    constructor() {
        this.root = new RouteNode();
        this.unknownRoute = new UnknownRoute();
        this.lastPath = null;
        this.PATH_START_INDEX = 1;

        window.addEventListener('popstate', () => this.navigateToPageByCurrentURL());
    }

    /**
     * @method registerRoute
     * @description Регистрация маршрута.
     * @param routeName ключевое имя маршрута
     * @param route объект маршрута
     */
    registerRoute(routeName, route) {
        const segments = routeName.split('/');
        let current = this.root;

        for (const segment of segments) {
            const isParam = segment.startsWith(':');
            const key = isParam ? ':param' : segment;

            if (!current.children[key]) {
                current.children[key] = new RouteNode();
                if (isParam) {
                    current.children[key].paramName = segment.slice(1);
                }
            }
            current = current.children[key];
        }
        current.route = route;
    }

    /**
     * @method navigateTo
     * @description Переход на маршрут.
     * @param pathStr путь URL
     */
    navigateTo(pathStr) {
        if (pathStr.length > 1 && pathStr.endsWith('/')) {
            pathStr = pathStr.slice(0, -1);
        }
        if (pathStr === this.lastPath) {
            return;
        }
        this.lastPath = pathStr;
        history.pushState(null, null, pathStr);

        const segments = pathStr.split('/').slice(this.PATH_START_INDEX);
        const params = {};
        let current = this.root;

        for (const segment of segments) {
            if (current.children[segment]) {
                current = current.children[segment];
                continue;
            }
            if (current.children[':param']) {
                current = current.children[':param'];
                params[current.paramName] = segment;
                continue;
            }

            this.unknownRoute.process(params);
            return;
        }

        const route = current.route || this.unknownRoute;
        route.process(params);
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

export default new RouteManager();