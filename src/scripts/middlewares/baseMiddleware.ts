import BaseRoute from "../routes/baseRoute.js";

/**
 * @class BaseMiddleware
 * @description Базовый класс для всех middleware.
 */
export default class BaseMiddleware {
    /**
     * @function check
     * @description Метод предварительной обработки маршрута.
     * @param {BaseRoute} route маршрут.
     * @returns {{process: ((function(*): (*))|*)}} Итоговый метод обработки маршрута.
     */
    check(route: BaseRoute) {
        return {
            process: (params?: unknown) => {
                route.process(params);
            }
        }
    }
}