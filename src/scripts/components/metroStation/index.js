'use strict';

import BaseComponent from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class MetroStation
 * @description Компонент станции метро.
 * @augments BaseComponent
 */
export default class MetroStation extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}