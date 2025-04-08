import BaseRoute from "../../routes/baseRoute.ts";

/**
 * @class RouteManager
 * @classdesc Менеджер маршрутов.
 */
export class RouteNode {
    public children: Record<string, RouteNode>;
    public route: BaseRoute | null;
    public paramName: string | null;
    /**
     * @description Конструктор класса.
     */
    constructor() {
        this.children = {};
        this.route = null;
        this.paramName = null;
    }
}