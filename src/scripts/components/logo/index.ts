import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class Logo
 * @description Компонент логотипа.
 * @augments BaseComponent
 */
export default class Logo extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}