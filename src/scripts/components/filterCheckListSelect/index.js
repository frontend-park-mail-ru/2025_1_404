import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class FilterCheckListSelect
 * @description Компонент селекта с чеклистом в фильтре.
 * @augments BaseComponent
 */
export default class FilterCheckListSelect extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}