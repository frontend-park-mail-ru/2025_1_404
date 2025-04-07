/**
 * @class RouteManager
 * @classdesc Менеджер маршрутов.
 */
export class RouteNode {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        this.children = {};
        this.route = null;
        this.paramName = null;
    }
}