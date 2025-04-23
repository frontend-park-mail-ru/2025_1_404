import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class bottomNavigationBar
 * @description Компонент навигации внизу страницы (для телефонов).
 * @augments BaseComponent
 */
export default class bottomNavigationBar extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}