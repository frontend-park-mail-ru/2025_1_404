import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class SelectButton
 * @description Компонент кнопки.
 * @extends BaseComponent
 */
export default class SelectButton extends BaseComponent {
    render() {
        return template();
    }
}