'use strict';

import BaseComponent from "../../baseComponent.js";
import PicturesCarousel from "../../picturesCarousel/index.js";

/**
 * @class HousingComplexSlider
 * @description Компонент карусели ЖК.
 * @augments BaseComponent
 */
export default class HousingComplexSlider extends BaseComponent {
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}) {
        super({page, layout});
        this._carousel = new PicturesCarousel();
    }

    /**
     * @function destroy
     * @description Метод уничтожения компонента.
     */
    destroy() {
        this._carousel.destroy();
    }
}