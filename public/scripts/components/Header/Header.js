import BaseComponent from "../BaseComponent.js";
import template from './Header.precompiled.js';

// Компонент header
export default class Header extends BaseComponent {
    render() {
        return template();
    }
}