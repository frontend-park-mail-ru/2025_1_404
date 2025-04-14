import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class OfferDetailsInfo
 * @description Компонент информации страницы подробностей объявления.
 * @augments BaseComponent
 */
export default class OfferDetailsInfo extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}