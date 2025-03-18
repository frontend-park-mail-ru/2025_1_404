'use strict';

import BaseComponent from "../BaseComponent.js";
import template from './OfferCreateBtns.precompiled.js';

/**
 * @class OfferCreateBtns
 * @description Компонент панели с кнопками на странице создания объявления.
 * @extends BaseComponent
 */
export default class OfferCreateBtns extends BaseComponent {
    constructor() {
        super();

        return template();
    }

    destroy() {
        super.destroy();
    }
}