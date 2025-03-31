import BaseComponent from "../baseComponent.js";
import template from './index.precompiled.js';

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