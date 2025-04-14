import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class RedButton
 * @description Компонент красной кнопки.
 * @augments BaseComponent
 */
export default class RedButton extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}