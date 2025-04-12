import {OfferEditRoute} from "./OfferEditRoute.ts";

/**
 * @class OfferEditParamsRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания параметров.
 * @augments BaseRoute
 */
export class OfferEditParamsRoute extends OfferEditRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super('edit_params');
    }
}