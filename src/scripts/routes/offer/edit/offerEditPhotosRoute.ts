import {OfferEditRoute} from "./OfferEditRoute.ts";

/**
 * @class OfferEditPhotosRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе добавления фотографий.
 * @augments BaseRoute
 */
export class OfferEditPhotosRoute extends OfferEditRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super('photos');
    }
}