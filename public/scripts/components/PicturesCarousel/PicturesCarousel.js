'use strict';

import BaseComponent from "../BaseComponent.js";

/**
 * @class PicturesCarousel
 * @description Компонент карусели фотографий.
 * @extends BaseComponent
 */
export default class PicturesCarousel extends BaseComponent {
    constructor() {
        super();
        this._carousel = document.querySelector('.carousel__pictures');
        this._images = document.querySelectorAll('.carousel img');
        this._index = 0;
        this._imagePerClick = 1;

        this._chevronRight = document.getElementById('chevronRight');
        this._chevronRight.addEventListener('click', () => this._slideToRight());

        this._chevronLeft = document.getElementById('chevronLeft');
        this._chevronLeft.addEventListener('click', () => this._slideToLeft());
    }
    destroy() {
        this._chevronLeft.removeEventListener('click', () => this._slideToLeft());
        this._chevronRight.removeEventListener('click', () => this._slideToRight());
        super.destroy();
    }

    _updateCarousel() {
        const slidePercent = 100;
        this._carousel.style.transform = `translateX(${-(this._index * slidePercent)}%)`;
        document.querySelector('.carousel__counter').textContent = `${this._index + this._imagePerClick}/${this._images.length}`;
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