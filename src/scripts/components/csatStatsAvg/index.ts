import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class CsatStatsAvg
 * @description Компонент усредненной статистики на странице статистики опросов csat.
 * @augments BaseComponent
 */
export default class CsatStatsAvg extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}