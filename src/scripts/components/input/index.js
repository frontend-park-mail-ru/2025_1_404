import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

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