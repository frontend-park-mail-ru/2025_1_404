import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class FilterCheckList
 * @description Компонент чеклиста в фильтре.
 * @extends BaseComponent
 */
export default class FilterCheckList extends BaseComponent {
    render() {
        return template();
    }
}