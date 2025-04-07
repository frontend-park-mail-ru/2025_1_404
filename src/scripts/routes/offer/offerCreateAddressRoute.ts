
import {OfferCreateRoute} from "./OfferCreateRoute.js";

/**
 * @class OfferCreateAddressRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания адреса.
 * @augments BaseRoute
 */
export class OfferCreateAddressRoute extends OfferCreateRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super('address');
    }
}