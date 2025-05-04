
import {RouteNode} from "./routeNode.ts";
import {UnknownRoute} from "../../routes/unknownRoute.ts";
import BaseRoute from "../../routes/baseRoute.ts";
import PageManager from "../pageManager.ts";

/**
 * @class RouteManager
 * @description Менеджер маршрутов.
 */
class RouteManager {
    private root: RouteNode;
    private unknownRoute: UnknownRoute;
    private lastPath: string;
    private PATH_START_INDEX: number;
    /**
     * @description Создание менеджера маршрутов.
     */
    constructor() {
        this.root = new RouteNode();
        this.unknownRoute = new UnknownRoute();
        this.lastPath = "";
        this.PATH_START_INDEX = 1;

        window.addEventListener('popstate', () => this.navigateToPageByCurrentURL());
    }

    /**
     * @function registerRoute
     * @description Регистрация маршрута.
     * @param {string} routeName ключевое имя маршрута
     * @param {object} route объект маршрута
     */
    registerRoute(routeName: string, route: BaseRoute) {
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
     * @function preparePathStr
     * @description Предобработка строки пути.
     * @param {string} pathStr путь URL
     * @returns {*} подготовленная строка пути
     * @private
     */
    private preparePathStr(pathStr: string) {
        const minimumPathLength = 1;

        let preparedPath = pathStr;
        if (pathStr.length > minimumPathLength && pathStr.endsWith('/')) {
            preparedPath = preparedPath.slice(0, -1);
        }

        return preparedPath;
    }

    /**
     * @function updateHistory
     * @description Обновление истории браузера.
     * @param {string} pathStr путь URL
     * @private
     */
    private updateHistory(pathStr: string) {
        if (this.lastPath !== pathStr) {
            history.pushState(null, "", pathStr);
            this.lastPath = pathStr;
        }
    }

    /**
     * @function getSegmentsAndParams
     * @description Получение сегментов и параметров из строки пути.
     * @param {string} pathStr путь URL
     * @returns {{params: {}, segments: *}} объект с параметрами и сегментами
     * @private
     */
    private getSegmentsAndParams(pathStr: string) {
        const segments = pathStr.split('/').slice(this.PATH_START_INDEX);
        const params: Record<string, string> = {};
        return {params, segments}
    }

    /**
     * @function processRoute
     * @description Обработка маршрута.
     * @param {string} pathStr путь URL
     * @returns {{params: {}, route: null}|{params: {}, route: UnknownRoute}} объект с параметрами и маршрутом
     * @private
     */
    private processRoute(pathStr: string) {
        const {params, segments} = this.getSegmentsAndParams(pathStr);
        let current = this.root;
        for (const segment of segments) {
            if (current.children[segment]) {
                current = current.children[segment];
            } else if (current.children[':param']) {
                current = current.children[':param'];
                if (current.paramName !== null) {
                    params[current.paramName] = segment;
                }
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
    navigateTo(pathStr: string) {
        const preparedPathStr = this.preparePathStr(pathStr);
        this.updateHistory(pathStr);
        const {route, params} = this.processRoute(preparedPathStr);
        if (route !== null) {
            window.scrollTo(0, 0);
            route.process(params);
            return;
        }
        PageManager.renderPage('404');
    }

    /**
     * @function navigateToPageByCurrentURL
     * @description Переход на страницу по текущему URL.
     */
    navigateToPageByCurrentURL() {
        const path = window.location.pathname;
        this.lastPath = path;
        this.navigateTo(path);
    }
}

export default new RouteManager();