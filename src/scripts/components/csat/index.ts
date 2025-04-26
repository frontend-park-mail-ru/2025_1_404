import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class Csat
 * @description Компонент Csat опроса.
 * @augments BaseComponent
 */
export default class Csat extends BaseComponent {
    /**
         * @function render
         * @description Метод рендеринга компонента.
         * @returns {string} HTML-строка с разметкой компонента.
         */
        render() {
            return template();
    }
}