import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class ChoiceButtons
 * @description Компонент кнопок выбора.
 * @extends BaseComponent
 */
export default class ChoiceButtons extends BaseComponent {
    render() {
        return template();
    }
}