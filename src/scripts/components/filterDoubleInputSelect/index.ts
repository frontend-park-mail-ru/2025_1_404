import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class FilterDoubleInputSelect
 * @description Компонент селекта с двойным инпутом в фильтре.
 * @augments BaseComponent
 */
export default class FilterDoubleInputSelect extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}