
import {OfferCreateRoute} from "./OfferCreateRoute.js";

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