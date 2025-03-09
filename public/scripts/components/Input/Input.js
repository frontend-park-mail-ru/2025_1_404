import BaseComponent from "../BaseComponent.js";
import template from './Input.precompiled.js';

/**
 * @class Input
 * @description Компонент поля ввода.
 * @extends BaseComponent
 */
export default class Input extends BaseComponent {
    render() {
        return template();
    }
}