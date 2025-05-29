import {OfferEditRoute} from "./OfferEditRoute.ts";

/**
 * @class OfferEditDocsRoute
 * @description Класс для обработки маршрута страницы создания объявления на этапе загрузки документов.
 * @augments BaseRoute
 */
export class OfferEditDocsRoute extends OfferEditRoute {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        super('edit_docs');
    }
}