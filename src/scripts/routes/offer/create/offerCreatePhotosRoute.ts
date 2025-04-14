import {OfferCreateRoute} from "./OfferCreateRoute.ts";

/**
 * @class OfferCreatePhotosRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе добавления фотографий.
 * @augments BaseRoute
 */
export class OfferCreatePhotosRoute extends OfferCreateRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super('photos');
    }
}