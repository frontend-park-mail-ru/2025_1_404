import BaseComponent from "../BaseComponent.js";
import template from './OfferDetailsSlider.precompiled.js';

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