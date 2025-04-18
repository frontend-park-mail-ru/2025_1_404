import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";

/**
 * @class PicturesCarouselPreviews
 * @description Компонент карусели фотографий с превью.
 * @augments BaseComponent
 */
export default class PicturesCarouselPreviews extends BaseComponent {
    private _carousel: HTMLElement | null;
    private _images: NodeListOf<Element>;
    private _imagesControls: HTMLElement | null;
    private _previewsCarousel: HTMLElement | null;
    private _previewsImages: NodeListOf<Element>;
    private _previews: HTMLElement | null;
    private _imagesIndex: number;
    private _previewsIndex: number;
    private _imagePerClick: number;
    private _previewsPerClick: number;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
        this._carousel = document.querySelector('.slider__images');
        this._images = document.querySelectorAll('.slider__images img');
        this._imagesControls = document.getElementById("sliderImagesControls");
        this._previewsCarousel = document.querySelector('.slider__previews');
        this._previewsImages = document.querySelectorAll('.slider__previews img');
        this._previews = document.getElementById("sliderPreviewsWrapper");
        this._imagesIndex = 0;
        this._previewsIndex = 0;
        this._imagePerClick = 1;
        this._previewsPerClick = 1;

        if (this._images.length > 1) {
            this._enableSlider();
        }

        this._toggleActivePreview(this._previewsIndex);
    }

    /**
     * @function _enableSlider
     * @description Метод активации карусели.
     */
    _enableSlider() {
        if (this._previews !== null) {
            this._previews.classList.add('active');
        }
        if (this._imagesControls !== null) {
            this._imagesControls.classList.add('active');
        }
    }


    /**
     * @function _getMaxTranslateX
     * @description Метод получения максимального значения сдвига карусели.
     * @returns {number} максимальное значение сдвига карусели.
     */
    _getMaxTranslateX() {
        if (!this._previewsCarousel) {
            return 0;
        }
        return (this._previewsCarousel.scrollWidth - this._previewsCarousel.clientWidth) / this._previewsCarousel.clientWidth * 100;
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('sliderImagesChevronRight', 'click', this._slideImagesToRight);
        this.initListener('sliderImagesChevronLeft', 'click', this._slideImagesToLeft);
        this.initListener('sliderPreviewsChevronRight', 'click', this._slidePreviewsToRight);
        this.initListener('sliderPreviewsChevronLeft', 'click', this._slidePreviewsToLeft);
        this.initListenerForClass('slider__previews-preview', 'click', this._clickOnPreview);
    }

    /**
     * @function _updateCarousel
     * @description Метод обновления карусели.
     * @private
     */
    _updateImagesCarousel() {
        if (!this._carousel) {
            return;
        }
        const slidePercent = 100;
        this._carousel.style.transform = `translateX(${-(this._imagesIndex * slidePercent)}%)`;
    }

    /**
     * @function _updatePreviewsCarousel
     * @description Метод обновления карусели превью.
     */
    _updatePreviewsCarousel() {
        if (!this._previewsCarousel) {
            return;
        }
        const slidePercent = 25;
        const maxTranslateValue = this._getMaxTranslateX();
        const calculatedTranslateValue = Math.min(this._previewsIndex * slidePercent, maxTranslateValue);
        this._previewsCarousel.style.transform = `translateX(${-calculatedTranslateValue}%)`;
    }

    /**
     * @function _slideImagesToRight
     * @description Метод сдвига карусели картинок вправо.
     * @private
     */
    _slideImagesToRight() {
        this._imagesIndex = (this._imagesIndex + this._imagePerClick) % this._images.length;
        this._toggleActivePreview(this._imagesIndex);
        this._updateImagesCarousel();
        this._updatePreviewsCarousel();
    }

    /**
     * @function _slideImagesToLeft
     * @description Метод сдвига карусели картинок влево.
     * @private
     */
    _slideImagesToLeft() {
        this._imagesIndex = (this._imagesIndex - this._imagePerClick + this._images.length) % this._images.length;
        this._toggleActivePreview(this._imagesIndex);
        this._updateImagesCarousel();
        this._updatePreviewsCarousel();
    }

    /**
     * @function _slidePreviewsToRight
     * @description Метод сдвига карусели превью вправо.
     */
    _slidePreviewsToRight() {
        const newIndex = (this._previewsIndex + this._previewsPerClick) % this._images.length;
        this._toggleActivePreview(newIndex);
        this._imagesIndex = this._previewsIndex;
        this._updatePreviewsCarousel();
        this._updateImagesCarousel();
    }

    /**
     * @function _slidePreviewsToLeft
     * @description Метод сдвига карусели превью влево.
     */
    _slidePreviewsToLeft() {
        const newIndex = (this._previewsIndex - this._previewsPerClick + this._images.length) % this._images.length;
        this._toggleActivePreview(newIndex);
        this._imagesIndex = this._previewsIndex;
        this._updatePreviewsCarousel();
        this._updateImagesCarousel();
    }

    /**
     * @function _clickOnPreview
     * @description Метод обработки клика на превью.
     * @param {Event} event - событие клика.
     */
    _clickOnPreview(event: Event) {
        if (!event.target) {
            return;
        }
        let currentTarget = event.target as HTMLElement;
        if (currentTarget.tagName !== 'DIV' && currentTarget.parentElement) {
            currentTarget = currentTarget.parentElement;
        }

        const previewIndex = parseInt(currentTarget.id.split("-")[1], 10);
        if (isNaN(previewIndex)) {
            return;
        }
        this._imagesIndex = previewIndex;
        this._toggleActivePreview(previewIndex);
        this._updateImagesCarousel();
    }

    /**
     * @function _toggleActivePreview
     * @description Метод переключения активного превью.
     * @param {number} newId - индекс превью.
     */
    _toggleActivePreview(newId: number) {
        const previews = document.querySelectorAll('.slider__previews-preview');
        if (previews.length < newId + 1) {
            return;
        }
        previews[this._previewsIndex].classList.remove('active')
        previews[newId].classList.add('active');
        this._previewsIndex = newId;
    }
}