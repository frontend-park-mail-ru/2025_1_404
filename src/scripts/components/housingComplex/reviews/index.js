'use strict';

import BaseComponent from "../../baseComponent.js";

/**
 * @class HousingComplexReviews
 * @description Компонент отзывов о ЖК.
 * @extends BaseComponent
 */
export default class HousingComplexReviews extends BaseComponent {
    constructor() {
        super({});
        this._setupReviews();
    }
    initListeners() {
        this.initListener('loadReviews', 'click', this._showMoreReviews);
    }

    _setupReviews() {
        this._reviews = document.querySelectorAll('.review');
        this._loadReviewsButton = document.getElementById('loadReviews');
        this._visibleReviews = 0;

        this._showMoreReviews();

        if (this._reviews.length <= this._visibleReviews) {
            this._loadReviewsButton.classList.add('hidden');
        }
    }

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