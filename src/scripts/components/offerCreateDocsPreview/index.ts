import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class OfferCreateDocsPreview
 * @description Компонент превью документа на странице создания объявления.
 * @augments BaseComponent
 */
export default class OfferCreateDocsPreview extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}