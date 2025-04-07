import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class FilterCheckListSelect
 * @description Компонент селекта с чеклистом в фильтре.
 * @extends BaseComponent
 */
export default class FilterCheckListSelect extends BaseComponent {
    render() {
        return template();
    }
}