import BaseComponent from "../BaseComponent.js";
import template from './Logo.precompiled.js';

/**
 * @class Logo
 * @description Компонент логотипа.
 * @extends BaseComponent
 */
export default class Logo extends BaseComponent {
    render() {
        return template();
    }
}