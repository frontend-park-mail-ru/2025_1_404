
import {OfferCreateRoute} from "./OfferCreateRoute.ts";

/**
 * @class OfferCreateDescriptionRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе описания.
 * @augments BaseRoute
 */
export class OfferCreateDescriptionRoute extends OfferCreateRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super('description');
    }
}