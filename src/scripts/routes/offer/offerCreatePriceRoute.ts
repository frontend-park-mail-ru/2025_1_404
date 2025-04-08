import {OfferCreateRoute} from "./OfferCreateRoute.ts";

/**
 * @class OfferCreatePriceRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания цены.
 * @augments BaseRoute
 */
export class OfferCreatePriceRoute extends OfferCreateRoute {
    /**
     * @description Конструктор класса.c
     */
    constructor() {
        super('price');
    }
}