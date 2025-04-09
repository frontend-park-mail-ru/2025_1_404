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
        this._toggleActivePreview("sliderPreview-" + this._previewsIndex);
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
        const slidePercent = 100;
        if (!this._carousel) {
            return;
        }
        this._carousel.style.transform = `translateX(${-(this._imagesIndex * slidePercent)}%)`;
    }

    _updatePreviewsCarousel() {
        const slidePercent = 25;
        if (!this._previewsCarousel) {
            return;
        }
        this._previewsCarousel.style.transform = `translateX(${-(this._previewsIndex * slidePercent)}%)`;
        // this._setActivePreview("sliderPreview-" + this._previewsIndex);
    }

    /**
     * @function _slideImagesToRight
     * @description Метод сдвига карусели картинок вправо.
     * @private
     */
    _slideImagesToRight() {
        console.log("RIGHT")
        this._toggleActivePreview("sliderPreview-" + this._previewsIndex);
        this._imagesIndex = (this._imagesIndex + this._imagePerClick) % this._images.length;
        this._previewsIndex = this._imagesIndex;
        this._toggleActivePreview("sliderPreview-" + this._previewsIndex);
        this._updateImagesCarousel();
    }

    /**
     * @function _slideImagesToLeft
     * @description Метод сдвига карусели картинок влево.
     * @private
     */
    _slideImagesToLeft() {
        this._toggleActivePreview("sliderPreview-" + this._previewsIndex);
        this._imagesIndex = (this._imagesIndex - this._imagePerClick + this._images.length) % this._images.length;
        this._previewsIndex = this._imagesIndex;
        this._toggleActivePreview("sliderPreview-" + this._previewsIndex);
        this._updateImagesCarousel();
    }

    _slidePreviewsToRight() {
        this._previewsIndex = (this._previewsIndex + this._previewsPerClick) % this._images.length;
        console.log(this._previewsIndex)
        this._updatePreviewsCarousel();
    }

    _slidePreviewsToLeft() {
        this._previewsIndex = (this._previewsIndex - this._previewsPerClick + this._images.length) % this._images.length;
        console.log(this._previewsIndex)
        this._updatePreviewsCarousel();
    }

    _clickOnPreview(event: Event, {target} = event) {
        let currentTarget = target as HTMLElement | null;
        if (currentTarget === null) {
            return;
        }
        if (currentTarget.tagName !== 'DIV') {
            currentTarget = currentTarget.parentElement;
            if (currentTarget === null) {
                return;
            }
        }

        const previewIndex = currentTarget.id.split("-")[1];
        this._toggleActivePreview("sliderPreview-" + this._previewsIndex);
        console.log(previewIndex)
        this._imagesIndex = +previewIndex;
        this._updateImagesCarousel();
        this._previewsIndex = +previewIndex;
        //this._updatePreviewsCarousel();
        this._toggleActivePreview("sliderPreview-" + this._previewsIndex);
    }

    _toggleActivePreview(id: string) {
        const preview = document.getElementById(id) as HTMLElement;
        if (preview === null) {
            return;
        }
        preview.classList.toggle('active');
    }
}