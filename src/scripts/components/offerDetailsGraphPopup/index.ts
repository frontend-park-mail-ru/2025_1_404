import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class OfferDetailsGraphPopup
 * @description Компонент попап окна в графике на старнице объявления.
 * @augments BaseComponent
 */
export default class OfferDetailsGraphPopup extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}