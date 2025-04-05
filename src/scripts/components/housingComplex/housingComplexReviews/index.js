'use strict';

import BaseComponent from "../../baseComponent.js";

/**
 * @class HousingComplexReviews
 * @description Компонент отзывов о ЖК.
 * @augments BaseComponent
 */
export default class HousingComplexReviews extends BaseComponent {
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}) {
        super({page, layout});
        this._setupReviews();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('loadReviews', 'click', this._showMoreReviews);
    }

    /**
     * @function _setupReviews
     * @description Метод инициализации отзывов.
     * @private
     */
    _setupReviews() {
        this._reviews = document.querySelectorAll('.housingComplex__review');
        this._loadReviewsButton = document.getElementById('loadReviews');
        this._visibleReviews = 0;

        this._showMoreReviews();

        if (this._reviews.length <= this._visibleReviews) {
            this._loadReviewsButton.classList.add('hidden');
        }
    }

    /**
     * @function _showMoreReviews
     * @description Метод показа большего количества отзывов.
     * @private
     */
    _showMoreReviews() {
        const reviewsPerClick = 3;
        for (let it = this._visibleReviews; it < this._visibleReviews + reviewsPerClick; it++) {
            if (this._reviews[it]) {
              this._reviews[it].style.display = 'flex';
            }
        }
        this._visibleReviews += reviewsPerClick;

        if (this._visibleReviews >= this._reviews.length) {
            this._loadReviewsButton.classList.add('hidden');
        }
    }
}