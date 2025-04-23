import {BaseComponent, BaseComponentInterface} from "../../baseComponent.ts";
import PicturesCarousel from "../../picturesCarousel";

/**
 * @class HousingComplexSlider
 * @description Компонент карусели ЖК.
 * @augments BaseComponent
 */
export default class HousingComplexSlider extends BaseComponent {
    private carousel: PicturesCarousel;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
        this.carousel = new PicturesCarousel({page, layout});
    }

    /**
     * @function destroy
     * @description Метод уничтожения компонента.
     */
    destroy() {
        this.carousel.destroy();
    }
}