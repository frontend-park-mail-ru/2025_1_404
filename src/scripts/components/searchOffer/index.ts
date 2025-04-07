import {BaseComponent} from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class SearchOffer
 * @description Компонент объявления в поиске.
 * @augments BaseComponent
 */
export default class SearchOffer extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}