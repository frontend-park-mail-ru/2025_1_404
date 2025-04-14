import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class OfferCreatePhotosPreview
 * @description Компонент превью фотографии на странице создания объявления.
 * @augments BaseComponent
 */
export default class OfferCreatePhotosPreview extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}