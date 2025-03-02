import BaseComponent from "../BaseComponent.js";
import template from './Card.precompiled.js';

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