import {OfferEditRoute} from "./OfferEditRoute.ts";

/**
 * @class OfferEditTypeRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания типа.
 * @augments BaseRoute
 */
export class OfferEditTypeRoute extends OfferEditRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super('edit_type');
    }
}