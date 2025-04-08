import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";

/**
 * @class PicturesCarousel
 * @description Компонент карусели фотографий.
 * @augments BaseComponent
 */
export default class PicturesCarousel extends BaseComponent {
    private _carousel: HTMLElement | null;
    private _images: NodeListOf<Element>;
    private _index: number;
    private _imagePerClick: number;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
        this._carousel = document.querySelector('.slider__images');
        this._images = document.querySelectorAll('.slider__images img');
        this._index = 0;
        this._imagePerClick = 1;
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('chevronRight', 'click', this._slideToRight);
        this.initListener('chevronLeft', 'click', this._slideToLeft);
    }

    /**
     * @function _updateCarousel
     * @description Метод обновления карусели.
     * @private
     */
    _updateCarousel() {
        const slidePercent = 100;
        if (!this._carousel) {
            return;
        }
        this._carousel.style.transform = `translateX(${-(this._index * slidePercent)}%)`;
        const housingComplexCounter = document.querySelector('.housingComplex__slider-controls-counter') as HTMLElement;
        housingComplexCounter.textContent = `${this._index + this._imagePerClick}/${this._images.length}`;
    }

    /**
     * @function _slideToRight
     * @description Метод сдвига карусели вправо.
     * @private
     */
    _slideToRight() {
        this._index = (this._index + this._imagePerClick) % this._images.length;
        this._updateCarousel();
    }

    /**
     * @function _slideToLeft
     * @description Метод сдвига карусели влево.
     * @private
     */
    _slideToLeft() {
        this._index = (this._index - this._imagePerClick + this._images.length) % this._images.length;
        this._updateCarousel();
    }
}