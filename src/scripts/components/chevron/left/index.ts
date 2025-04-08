import {BaseComponent} from "../../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class ChevronLeft
 * @description Компонент стрелка влево.
 * @augments BaseComponent
 */
export default class ChevronLeft extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}