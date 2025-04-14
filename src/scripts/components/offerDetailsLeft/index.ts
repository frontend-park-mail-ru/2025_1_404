import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import PicturesCarouselPreviews from "../picturesCarouselPreviews";

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
     * @function destroy
     * @description Метод уничтожения компонента.
     */
    destroy() {
        this._carousel.destroy();
    }
}