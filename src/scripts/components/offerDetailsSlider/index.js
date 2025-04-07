import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class OfferDetailsSlider
 * @description Компонент слайдера страницы подробностей объявления.
 * @augments BaseComponent
 */
export default class OfferDetailsSlider extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}