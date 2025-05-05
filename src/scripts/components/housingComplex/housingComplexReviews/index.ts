
import {BaseComponent, BaseComponentInterface} from "../../baseComponent.ts";

/**
 * @class HousingComplexReviews
 * @description Компонент отзывов о ЖК.
 * @augments BaseComponent
 */
export default class HousingComplexReviews extends BaseComponent {
    private reviews: NodeListOf<Element> | undefined;
    private loadReviewsButton: HTMLElement | null | undefined;
    private visibleReviews: number = 0;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({page, layout});
        // this.setupReviews();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('loadReviews', 'click', this.showMoreReviews);
    }

    /**
     * @function setupReviews
     * @description Метод инициализации отзывов.
     * @private
     */
    private setupReviews() {
        this.reviews = document.querySelectorAll('.housingComplex__review');
        this.loadReviewsButton = document.getElementById('loadReviews') as HTMLElement;
        this.visibleReviews = 0;

        this.showMoreReviews();

        if (this.reviews.length <= this.visibleReviews) {
            this.loadReviewsButton.classList.add('hidden');
        }
    }

    /**
     * @function showMoreReviews
     * @description Метод показа большего количества отзывов.
     * @private
     */
    private showMoreReviews() {
        const reviewsPerClick = 3;
        if (!this.reviews) {
            return;
        }
        for (let it = this.visibleReviews; it < this.visibleReviews + reviewsPerClick; it++) {
            if (this.reviews[it]) {
                const element = this.reviews[it] as HTMLElement;
                element.style.display = 'flex';
            }
        }
        this.visibleReviews += reviewsPerClick;

        if (this.visibleReviews >= this.reviews.length) {
            if (!this.loadReviewsButton) {
                return;
            }
            this.loadReviewsButton.classList.add('hidden');
        }
    }
}