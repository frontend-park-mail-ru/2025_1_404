'use strict';

import BaseComponent from "../../baseComponent.js";
import PicturesCarousel from "../../picturesCarousel/index.js";

/**
 * @class HousingComplexSlider
 * @description Компонент карусели ЖК.
 * @extends BaseComponent
 */
export default class HousingComplexSlider extends BaseComponent {
    constructor() {
        super({});
        this._carousel = new PicturesCarousel();
    }
    destroy() {
        this._carousel.destroy();
    }
}