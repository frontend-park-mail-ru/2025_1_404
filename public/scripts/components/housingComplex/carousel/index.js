'use strict';

import BaseComponent from "../../baseComponent.js";
import PicturesCarousel from "../../picturesCarousel/index.js";

/**
 * @class Carousel
 * @description Компонент карусели ЖК.
 * @extends BaseComponent
 */
export default class HousingComplexCarousel extends BaseComponent {
    constructor() {
        super({});
        this._carousel = new PicturesCarousel();
    }
    destroy() {
        this._carousel.destroy();
    }
}