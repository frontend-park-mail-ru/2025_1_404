import BaseComponent from "../BaseComponent.js";
import template from './Logo.precompiled.js';

// Компонент header
export default class Logo extends BaseComponent {
    render() {
        return template();
    }
}