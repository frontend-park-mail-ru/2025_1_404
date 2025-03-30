/**
 * @class RouteManager
 * @classdesc Менеджер маршрутов.
 */
export class RouteNode {
    constructor() {
        this.children = {};
        this.route = null;
        this.paramName = null;
    }
}