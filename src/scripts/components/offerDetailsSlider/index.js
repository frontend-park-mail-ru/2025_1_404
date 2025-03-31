import BaseComponent from "../baseComponent.js";
import template from './offerDetailsSlider.precompiled.js';

/**
 * @class OfferDetailsSlider
 * @description Компонент слайдера страницы подробностей объявления.
 * @extends BaseComponent
 */
export default class OfferDetailsSlider extends BaseComponent {
    render() {
        return template();
    }
}