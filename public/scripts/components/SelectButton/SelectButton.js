import BaseComponent from "../BaseComponent.js";
import template from './SelectButton.precompiled.js';

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