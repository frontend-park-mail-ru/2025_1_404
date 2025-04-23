import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";

/**
 * @class PicturesCarouselPreviews
 * @description Компонент карусели фотографий с превью.
 * @augments BaseComponent
 */
export default class PicturesCarouselPreviews extends BaseComponent {
    private carousel: HTMLElement | null;
    private images: NodeListOf<Element>;
    private imagesControls: HTMLElement | null;
    private previewsCarousel: HTMLElement | null;
    private previewsImages: NodeListOf<Element>;
    private previews: HTMLElement | null;
    private imagesIndex: number;
    private previewsIndex: number;
    private imagePerClick: number;
    private previewsPerClick: number;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
        this.carousel = document.querySelector('.slider__images');
        this.images = document.querySelectorAll('.slider__images img');
        this.imagesControls = document.getElementById("sliderImagesControls");
        this.previewsCarousel = document.querySelector('.slider__previews');
        this.previewsImages = document.querySelectorAll('.slider__previews img');
        this.previews = document.getElementById("sliderPreviewsWrapper");
        this.imagesIndex = 0;
        this.previewsIndex = 0;
        this.imagePerClick = 1;
        this.previewsPerClick = 1;

        if (this.images.length > 1) {
            this.enableSlider();
        }

        this.toggleActivePreview(this.previewsIndex);
    }

    /**
     * @function enableSlider
     * @description Метод активации карусели.
     */
    private enableSlider() {
        if (this.previews !== null) {
            this.previews.classList.add('active');
        }
        if (this.imagesControls !== null) {
            this.imagesControls.classList.add('active');
        }
    }


    /**
     * @function getMaxTranslateX
     * @description Метод получения максимального значения сдвига карусели.
     * @returns {number} максимальное значение сдвига карусели.
     */
    private getMaxTranslateX() {
        if (!this.previewsCarousel) {
            return 0;
        }
        return (this.previewsCarousel.scrollWidth - this.previewsCarousel.clientWidth) / this.previewsCarousel.clientWidth * 100;
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('sliderImagesChevronRight', 'click', this.slideImagesToRight);
        this.initListener('sliderImagesChevronLeft', 'click', this.slideImagesToLeft);
        this.initListener('sliderPreviewsChevronRight', 'click', this.slidePreviewsToRight);
        this.initListener('sliderPreviewsChevronLeft', 'click', this.slidePreviewsToLeft);
        this.initListenerForClass('slider__previews-preview', 'click', this.clickOnPreview);
    }

    /**
     * @function updateImagesCarousel
     * @description Метод обновления карусели.
     * @private
     */
    private updateImagesCarousel() {
        if (!this.carousel) {
            return;
        }
        const slidePercent = 100;
        this.carousel.style.transform = `translateX(${-(this.imagesIndex * slidePercent)}%)`;
    }

    /**
     * @function updatePreviewsCarousel
     * @description Метод обновления карусели превью.
     */
    private updatePreviewsCarousel() {
        if (!this.previewsCarousel) {
            return;
        }
        const slidePercent = 25;
        const maxTranslateValue = this.getMaxTranslateX();
        const calculatedTranslateValue = Math.min(this.previewsIndex * slidePercent, maxTranslateValue);
        this.previewsCarousel.style.transform = `translateX(${-calculatedTranslateValue}%)`;
    }

    /**
     * @function slideImagesToRight
     * @description Метод сдвига карусели картинок вправо.
     * @private
     */
    private slideImagesToRight() {
        this.imagesIndex = (this.imagesIndex + this.imagePerClick) % this.images.length;
        this.toggleActivePreview(this.imagesIndex);
        this.updateImagesCarousel();
        this.updatePreviewsCarousel();
    }

    /**
     * @function slideImagesToLeft
     * @description Метод сдвига карусели картинок влево.
     * @private
     */
    private slideImagesToLeft() {
        this.imagesIndex = (this.imagesIndex - this.imagePerClick + this.images.length) % this.images.length;
        this.toggleActivePreview(this.imagesIndex);
        this.updateImagesCarousel();
        this.updatePreviewsCarousel();
    }

    /**
     * @function slidePreviewsToRight
     * @description Метод сдвига карусели превью вправо.
     */
    private slidePreviewsToRight() {
        const newIndex = (this.previewsIndex + this.previewsPerClick) % this.images.length;
        this.toggleActivePreview(newIndex);
        this.imagesIndex = this.previewsIndex;
        this.updatePreviewsCarousel();
        this.updateImagesCarousel();
    }

    /**
     * @function slidePreviewsToLeft
     * @description Метод сдвига карусели превью влево.
     */
    private slidePreviewsToLeft() {
        const newIndex = (this.previewsIndex - this.previewsPerClick + this.images.length) % this.images.length;
        this.toggleActivePreview(newIndex);
        this.imagesIndex = this.previewsIndex;
        this.updatePreviewsCarousel();
        this.updateImagesCarousel();
    }

    /**
     * @function clickOnPreview
     * @description Метод обработки клика на превью.
     * @param {Event} event - событие клика.
     */
    private clickOnPreview(event: Event) {
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
        this.imagesIndex = previewIndex;
        this.toggleActivePreview(previewIndex);
        this.updateImagesCarousel();
    }

    /**
     * @function toggleActivePreview
     * @description Метод переключения активного превью.
     * @param {number} newId - индекс превью.
     */
    private toggleActivePreview(newId: number) {
        const previews = document.querySelectorAll('.slider__previews-preview');
        if (previews.length < newId + 1) {
            return;
        }
        previews[this.previewsIndex].classList.remove('active')
        previews[newId].classList.add('active');
        this.previewsIndex = newId;
    }
}