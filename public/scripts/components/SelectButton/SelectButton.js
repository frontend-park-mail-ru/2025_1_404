import BaseComponent from "../BaseComponent.js";
import template from './SelectButton.precompiled.js';

// Компонент тестовой кнопки
export default class SelectButton extends BaseComponent {
    render() {
        return template();
    }
}