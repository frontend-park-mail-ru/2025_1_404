import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class Characteristic
 * @description Компонент иконки с характеристикой.
 * @extends BaseComponent
 */
export default class Characteristic extends BaseComponent {
    render() {
        return template();
    }
}