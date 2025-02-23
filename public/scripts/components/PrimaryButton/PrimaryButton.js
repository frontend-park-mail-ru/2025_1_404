import BaseComponent from "../BaseComponent.js";
import template from './PrimaryButton.precompiled.js';

// Компонент тестовой кнопки
export default class PrimaryButton extends BaseComponent {
    render() {
        return template();
    }
}