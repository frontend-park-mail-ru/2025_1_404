import BaseComponent from "../BaseComponent.js";
import template from './Card.precompiled.js';

// Компонент тестовой кнопки
export default class Card extends BaseComponent {
    render() {
        return template();
    }
}