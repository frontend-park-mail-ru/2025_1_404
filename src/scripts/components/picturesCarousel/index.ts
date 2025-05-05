import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";

/**
 * @class PicturesCarousel
 * @description Компонент карусели фотографий.
 * @augments BaseComponent
 */
export default class PicturesCarousel extends BaseComponent {
    private carousel: HTMLElement | null;
    private images: NodeListOf<Element>;
    private index: number;
    private imagePerClick: number;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
        this.carousel = document.querySelector('.slider__images');
        this.images = document.querySelectorAll('.slider__images img');
        this.index = 0;
        this.imagePerClick = 1;
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('housingComplexSliderChevronRight', 'click', this.slideToRight);
        this.initListener('housingComplexSliderChevronLeft', 'click', this.slideToLeft);
    }

    /**
     * @function updateCarousel
     * @description Метод обновления карусели.
     * @private
     */
    private updateCarousel() {
        const slidePercent = 100;
        if (!this.carousel) {
            return;
        }
        this.carousel.style.transform = `translateX(${-(this.index * slidePercent)}%)`;
        const housingComplexCounter = document.querySelector('.housingComplex__slider-controls-counter') as HTMLElement;
        housingComplexCounter.textContent = `${this.index + this.imagePerClick}/${this.images.length}`;
    }

    /**
     * @function slideToRight
     * @description Метод сдвига карусели вправо.
     * @private
     */
    private slideToRight() {
        this.index = (this.index + this.imagePerClick) % this.images.length;
        this.updateCarousel();
    }

    /**
     * @function slideToLeft
     * @description Метод сдвига карусели влево.
     * @private
     */
    private slideToLeft() {
        this.index = (this.index - this.imagePerClick + this.images.length) % this.images.length;
        this.updateCarousel();
    }
}