import {OfferCreateRoute} from "./OfferCreateRoute.ts";

/**
 * @class OfferCreateDocsRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе загрузки документов.
 * @augments BaseRoute
 */
export class OfferCreateDocsRoute extends OfferCreateRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        console.log("AAAA");
        super('docs');
    }
}