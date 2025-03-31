import BaseComponent from "../baseComponent.js";
import template from './characteristicPart.precompiled.js';

/**
 * @class CharacteristicPart
 * @description Компонент иконки с характеристикой.
 * @extends BaseComponent
 */
export default class CharacteristicPart extends BaseComponent {
    render() {
        return template();
    }
}