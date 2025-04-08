import {BaseComponent} from "../../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class ChevronRight
 * @description Компонент стрелка вправо.
 * @augments BaseComponent
 */
export default class ChevronRight extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}