import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class FilterDoubleInput
 * @description Компонент двойного инпута в фильтре.
 * @augments BaseComponent
 */
export default class FilterDoubleInput extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}