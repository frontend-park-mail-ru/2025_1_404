import BaseComponent from "../BaseComponent.js";
import template from './CharacteristicPart.precompiled.js';

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