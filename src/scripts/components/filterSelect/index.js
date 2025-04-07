import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class FilterSelect
 * @description Компонент селекта в фильтре.
 * @extends BaseComponent
 */
export default class FilterSelect extends BaseComponent {
    render() {
        return template();
    }
}