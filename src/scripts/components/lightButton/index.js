import BaseComponent from "../baseComponent.js";
import template from './index.precompiled.js';

/**
 * @class LightButton
 * @description Компонент кнопки.
 * @extends BaseComponent
 */
export default class LightButton extends BaseComponent {
    render() {
        return template();
    }
}