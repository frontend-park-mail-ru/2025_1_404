import {BaseComponent} from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class FilterCheckList
 * @description Компонент чеклиста в фильтре.
 * @augments BaseComponent
 */
export default class FilterCheckList extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}