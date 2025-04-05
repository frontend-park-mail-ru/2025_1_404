'use strict';

import {RouteNode} from "./routeNode.js";
import {UnknownRoute} from "../../routes/unknownRoute.js";

/**
 * @class RouteManager
 * @description Менеджер маршрутов.
 */
class RouteManager {
    /**
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
     * @function registerRoute
     * @description Регистрация маршрута.
     * @param {string} routeName ключевое имя маршрута
     * @param {object} route объект маршрута
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
                    current.children[key].paramName = segment.slice(this.PATH_START_INDEX);
                }
            }
            current = current.children[key];
        }
        current.route = route;
    }

    /**
     * @function _preparePathStr
     * @description Предобработка строки пути.
     * @param {string} pathStr путь URL
     * @returns {*} подготовленная строка пути
     * @private
     */
    _preparePathStr(pathStr) {
        const minimumPathLength = 1;

        let preparedPath = pathStr;
        if (pathStr.length > minimumPathLength && pathStr.endsWith('/')) {
            preparedPath = preparedPath.slice(0, -1);
        }

        return preparedPath;
    }

    /**
     * @function _updateHistory
     * @description Обновление истории браузера.
     * @param {string} pathStr путь URL
     * @private
     */
    _updateHistory(pathStr) {
        history.pushState(null, null, pathStr);
        this.lastPath = pathStr;
    }

    /**
     * @function _getSegmentsAndParams
     * @description Получение сегментов и параметров из строки пути.
     * @param {string} pathStr путь URL
     * @returns {{params: {}, segments: *}} объект с параметрами и сегментами
     * @private
     */
    _getSegmentsAndParams(pathStr) {
        const segments = pathStr.split('/').slice(this.PATH_START_INDEX);
        const params = {};
        return {params, segments}
    }

    /**
     * @function _processRoute
     * @description Обработка маршрута.
     * @param {string} pathStr путь URL
     * @returns {{params: {}, route: null}|{params: {}, route: UnknownRoute}} объект с параметрами и маршрутом
     * @private
     */
    _processRoute(pathStr) {
        const {params, segments} = this._getSegmentsAndParams(pathStr);
        let current = this.root;
        for (const segment of segments) {
            if (current.children[segment]) {
                current = current.children[segment];
            } else if (current.children[':param']) {
                current = current.children[':param'];
                params[current.paramName] = segment;
            } else {
                return {params, route: this.unknownRoute}
            }
        }
        return {params, route: current.route};
    }

    /**
     * @function navigateTo
     * @description Переход на маршрут.
     * @param {string} pathStr путь URL
     */
    navigateTo(pathStr) {
        const preparedPathStr = this._preparePathStr(pathStr);
        this._updateHistory(pathStr);
        const {route, params} = this._processRoute(preparedPathStr);
        route.process(params);
    }

    /**
     * @function navigateToPageByCurrentURL
     * @description Переход на страницу по текущему URL.
     */
    navigateToPageByCurrentURL() {
        const path = window.location.pathname;
        this.navigateTo(path);
    }
}

export default new RouteManager();