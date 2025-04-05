import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class OfferDetailsHeader
 * @description Компонент заголовка страницы подробностей объявления.
 * @augments BaseComponent
 */
export default class OfferDetailsHeader extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}