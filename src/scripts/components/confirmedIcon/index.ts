import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class ConfirmedIcon
 * @description Компонент иконки подтвержденного объявления.
 * @augments BaseComponent
 */
export default class ConfirmedIcon extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}