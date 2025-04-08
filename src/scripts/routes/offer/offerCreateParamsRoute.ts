import {OfferCreateRoute} from "./OfferCreateRoute.ts";

/**
 * @class OfferCreateParamsRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания параметров.
 * @augments BaseRoute
 */
export class OfferCreateParamsRoute extends OfferCreateRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super('params');
    }
}