import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class Balloon
 * @description Компонент выпадающего меню при нажатии на маркер карты.
 * @augments BaseComponent
 */
export default class Balloon extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}