import {BaseComponent} from "../baseComponent.ts";
import template from "./template.precompiled.js";

/**
 * @class HouseMarker
 * @description Компонент маркера дома на карте
 * @augments BaseComponent
 */
export default class HouseMarker extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {HTMLElement} корневой элемент компонента
     */
    render() {
        return template();
    }
}