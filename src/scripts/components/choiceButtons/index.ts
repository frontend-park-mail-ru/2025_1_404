import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class ChoiceButtons
 * @description Компонент кнопок выбора.
 * @augments BaseComponent
 */
export default class ChoiceButtons extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}