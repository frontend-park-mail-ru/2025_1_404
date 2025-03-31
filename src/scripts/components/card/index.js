import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class Card
 * @description Компонент карточки.
 * @extends BaseComponent
 */
export default class Card extends BaseComponent {
    render() {
        return template();
    }
}