
import {OfferEditRoute} from "./OfferEditRoute.ts";

/**
 * @class OfferEditDescriptionRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе описания.
 * @augments BaseRoute
 */
export class OfferEditDescriptionRoute extends OfferEditRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super('edit_description');
    }
}