import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import template from './template.precompiled.js';
import PicturesCarouselPreviews from "../picturesCarouselPreviews";
import RouteManager from "../../managers/routeManager/routeManager.ts";

/**
 * @class OfferDetailsInfo
 * @description Компонент информации страницы подробностей объявления.
 * @augments BaseComponent
 */
export default class OfferDetailsInfo extends BaseComponent {
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('offerDetailsChangeButton', 'click', this._offerChangeButtonHandler);
    }

    /**
     * @function _offerChangeButtonHandler
     * @description Метод обработки клика по ссылке на страницу изменения объявления.
     * @param {Event} event событие
     */
    _offerChangeButtonHandler(event: Event) {
        event.preventDefault();
        console.log("AAA");
        const target = event.target as HTMLElement;
        if (target && target.dataset.id) {
            const offerId = target.dataset.id;
            RouteManager.navigateTo(`/offer/edit/${offerId}/type`);
        }
    }
}