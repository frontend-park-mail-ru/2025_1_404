
import BaseRoute from "../baseRoute.ts";
import PageManager from "../../managers/pageManager.ts";

/**
 * @class OfferCreateRoute
 * @description Класс для обработки маршрута страницы создания объявления
 * @augments BaseRoute
 */
export class OfferCreateRoute extends BaseRoute {
    _pageName: string;
    /**
     * @description Конструктор класса.c
     * @param {string} pageName имя страницы
     */
    constructor(pageName: string) {
        super();
        this._pageName = pageName;
    }

    /**
     * @function process
     * @description Метод, который вызывается при обработке маршрута.
     */
    process() {
        PageManager.renderPage(this._pageName, {});
    }
}