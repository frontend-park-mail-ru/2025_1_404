
import {OfferEditRoute} from "./OfferEditRoute.ts";

/**
 * @class OfferEditAddressRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе указания адреса.
 * @augments BaseRoute
 */
export class OfferEditAddressRoute extends OfferEditRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super('edit_address');
    }
}