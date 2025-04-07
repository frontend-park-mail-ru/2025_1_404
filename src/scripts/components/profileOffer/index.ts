import {BaseComponent} from "../baseComponent.js";
import template from './template.precompiled.js';

/**
 * @class ProfileOffer
 * @description Компонент объявления в профиле.
 * @augments BaseComponent
 */
export default class ProfileOffer extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}