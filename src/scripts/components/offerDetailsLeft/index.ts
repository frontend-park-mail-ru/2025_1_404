import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import PicturesCarouselPreviews from "../picturesCarouselPreviews";
import RouteManager from "../../managers/routeManager/routeManager.ts";

/**
 * @class OfferDetailsLeft
 * @description Компонент левого блока страницы подробностей объявления.
 * @augments BaseComponent
 */
export default class OfferDetailsLeft extends BaseComponent {
    private _carousel: PicturesCarouselPreviews;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
        this._carousel = new PicturesCarouselPreviews({page, layout});
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('offerDetailsHousingComplex', 'click', this._housingComplexHrefHandler);
    }

    /**
     * @function _housingComplexHrefHandler
     * @description Метод обработки клика по ссылке на страницу жилого комплекса.
     * @param {Event} event событие
     */
    _housingComplexHrefHandler(event: Event) {
        event.preventDefault();
        RouteManager.navigateTo('/zhk/1');
    }

    /**
     * @function destroy
     * @description Метод уничтожения компонента.
     */
    destroy() {
        this._carousel.destroy();
    }
}