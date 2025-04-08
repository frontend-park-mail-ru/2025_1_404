
import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class Heart
 * @description Компонент сердчеко.
 * @augments BaseComponent
 */
export default class Heart extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}