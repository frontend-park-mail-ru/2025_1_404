'use strict';

import BaseComponent from "../BaseComponent.js";
import template from './OfferCreateTitle.precompiled.js';

/**
 * @class OfferCreateTitle
 * @description Компонент заголовка на странице создания объявления.
 * @extends BaseComponent
 */
export default class OfferCreateTitle extends BaseComponent {
    constructor() {
        super();

        return template();
    }

    destroy() {
        super.destroy();
    }
}