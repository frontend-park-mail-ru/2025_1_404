import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";

/**
 * @class OfferCreateTitle
 * @description Компонент заголовка на странице создания объявления.
 * @augments BaseComponent
 */
export default class OfferCreateTitle extends BaseComponent {
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
    }
}