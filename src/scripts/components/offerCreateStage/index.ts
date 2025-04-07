import {BaseComponent} from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class OfferCreateStage
 * @description Компонент этапа создания объявления.
 * @augments BaseComponent
 */
export default class OfferCreateStage extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}