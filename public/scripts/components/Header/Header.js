import BaseComponent from "../BaseComponent.js";
import template from './Header.precompiled.js';

/**
 * @class Header
 * @description Компонент хедера.
 * @extends BaseComponent
 */
export default class Header extends BaseComponent {
    render() {
        return template();
    }
}