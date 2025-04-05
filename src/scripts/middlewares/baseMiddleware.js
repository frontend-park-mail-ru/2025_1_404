'use strict';

/**
 * @class BaseMiddleware
 * @description Базовый класс для всех middleware.
 */
export default class BaseMiddleware {
    /**
     * @function check
     * @description Метод предварительной обработки маршрута.
     * @param {Route} route маршрут.
     * @returns {{process: ((function(*): (*))|*)}} Итоговый метод обработки маршрута.
     */
    check(route) {
        return {
            process: (params) => {
                route.process(params);
            }
        }
    }
}