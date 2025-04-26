import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class searchListOffer
 * @description Компонент объявления в поиске.
 * @augments BaseComponent
 */
export default class searchListOffer extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}