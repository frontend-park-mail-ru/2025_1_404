import {BaseComponent} from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class Characteristic
 * @description Компонент иконки с характеристикой.
 * @augments BaseComponent
 */
export default class Characteristic extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}