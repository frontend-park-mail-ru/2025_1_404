import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class LightButton
 * @description Компонент кнопки.
 * @augments BaseComponent
 */
export default class LightButton extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}