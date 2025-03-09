import BaseComponent from "../BaseComponent.js";
import template from './LightButton.precompiled.js';

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