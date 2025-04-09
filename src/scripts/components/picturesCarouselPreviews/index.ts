import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";

/**
 * @class PicturesCarouselPreviews
 * @description Компонент карусели фотографий с превью.
 * @augments BaseComponent
 */
export default class PicturesCarouselPreviews extends BaseComponent {
    private _carousel: HTMLElement | null;
    private _images: NodeListOf<Element>;
    private _previewsCarousel: HTMLElement | null;
    private _previewsImages: NodeListOf<Element>;
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
        this._previewsCarousel = document.querySelector('.slider__previews');
        this._previewsImages = document.querySelectorAll('.slider__previews img');
        this._imagesIndex = 0;
        this._previewsIndex = 0;
        this._imagePerClick = 1;
        this._previewsPerClick = 1;
        this._toggleActivePreview(this._previewsIndex);
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
        this._toggleActivePreview(this._previewsIndex);
    }

    /**
     * @function _slideImagesToRight
     * @description Метод сдвига карусели картинок вправо.
     * @private
     */
    _slideImagesToRight() {
        this._imagesIndex = (this._imagesIndex + this._imagePerClick) % this._images.length;
        this._previewsIndex = this._imagesIndex;
        this._toggleActivePreview(this._previewsIndex);
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
        this._previewsIndex = this._imagesIndex;
        this._toggleActivePreview(this._previewsIndex);
        this._updateImagesCarousel();
        this._updatePreviewsCarousel();
    }

    /**
     * @function _slidePreviewsToRight
     * @description Метод сдвига карусели превью вправо.
     */
    _slidePreviewsToRight() {
        this._previewsIndex = (this._previewsIndex + this._previewsPerClick) % this._images.length;
        this._imagesIndex = this._previewsIndex;
        this._updatePreviewsCarousel();
        this._updateImagesCarousel();
    }

    /**
     * @function _slidePreviewsToLeft
     * @description Метод сдвига карусели превью влево.
     */
    _slidePreviewsToLeft() {
        this._previewsIndex = (this._previewsIndex - this._previewsPerClick + this._images.length) % this._images.length;
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
        this._previewsIndex = previewIndex;
        this._updateImagesCarousel();
        this._toggleActivePreview(this._previewsIndex);
    }

    /**
     * @function _toggleActivePreview
     * @description Метод переключения активного превью.
     * @param {number} id - индекс превью.
     */
    _toggleActivePreview(id: number) {
        const previews = document.querySelectorAll('.slider__previews-preview');
        if (previews.length < id + 1) {
            return;
        }
        previews.forEach((preview) => {
            preview.classList.remove('active');
        });
        previews[id].classList.add('active');
    }
}