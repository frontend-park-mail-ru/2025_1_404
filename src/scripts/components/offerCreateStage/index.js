'use strict';

import BaseComponent from "../baseComponent.js";
import template from './offerCreateStage.precompiled.js';

/**
 * @class OfferCreateStage
 * @description Компонент этапа создания объявления.
 * @extends BaseComponent
 */
export default class OfferCreateStage extends BaseComponent {
    render() {
        return template();
    }
}