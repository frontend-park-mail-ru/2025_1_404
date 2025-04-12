import {OfferEditRoute} from "./OfferEditRoute.ts";

/**
 * @class OfferEditPriceRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания цены.
 * @augments BaseRoute
 */
export class OfferEditPriceRoute extends OfferEditRoute {
    /**
     * @description Конструктор класса.c
     */
    constructor() {
        super('edit_price');
    }
}