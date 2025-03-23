'use strict';

import BaseComponent from "../BaseComponent.js";
import template from './OfferCreateStage.precompiled.js';

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