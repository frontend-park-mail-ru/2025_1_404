
import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class PrimaryButton
 * @description Компонент кнопки.
 * @augments BaseComponent
 */
export default class PrimaryButton extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}