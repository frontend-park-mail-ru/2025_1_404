'use strict';

import BaseComponent from "../baseComponent.js";

/**
 * @class PicturesCarousel
 * @description Компонент карусели фотографий.
 * @extends BaseComponent
 */
export default class PicturesCarousel extends BaseComponent {
    constructor() {
        super({});
        this._carousel = document.querySelector('.slider__images');
        this._images = document.querySelectorAll('.slider__images img');
        this._index = 0;
        this._imagePerClick = 1;
    }
    initListeners() {
        this.initListener('chevronRight', 'click', this._slideToRight);
        this.initListener('chevronLeft', 'click', this._slideToLeft);
    }

    _updateCarousel() {
        const slidePercent = 100;
        this._carousel.style.transform = `translateX(${-(this._index * slidePercent)}%)`;
        document.querySelector('.housingComplex__slider-controls-counter').textContent = `${this._index + this._imagePerClick}/${this._images.length}`;
    }
    
    _slideToRight() {
        this._index = (this._index + this._imagePerClick) % this._images.length;
        this._updateCarousel();
    }

    _slideToLeft() {
        this._index = (this._index - this._imagePerClick + this._images.length) % this._images.length;
        this._updateCarousel();
    }
}