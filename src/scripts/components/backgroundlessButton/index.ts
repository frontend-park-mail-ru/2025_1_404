import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class BackgroundlessButton
 * @description Компонент кнопки без фона.
 * @augments BaseComponent
 */
export default class BackgroundlessButton extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}