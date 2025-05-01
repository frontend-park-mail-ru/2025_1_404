import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class Cluster
 * @description Компонент кластера для карты.
 * @augments BaseComponent
 */
export default class Cluster extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render(count: number) {
        const parser = new DOMParser();
        const clusterString = template({count});
        const doc = parser.parseFromString(clusterString, 'text/html');
        return doc.body.firstElementChild as HTMLElement;
    }
}