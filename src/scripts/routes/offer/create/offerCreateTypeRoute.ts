import {OfferCreateRoute} from "./OfferCreateRoute.ts";

/**
 * @class OfferCreateTypeRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания типа.
 * @augments BaseRoute
 */
export class OfferCreateTypeRoute extends OfferCreateRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super('type');
    }
}