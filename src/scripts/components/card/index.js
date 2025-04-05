import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class Card
 * @description Компонент карточки.
 * @augments BaseComponent
 */
export default class Card extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}