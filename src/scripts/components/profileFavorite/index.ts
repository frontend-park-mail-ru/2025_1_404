import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class ProfileOffer
 * @description Компонент объявления в профиле.
 * @augments BaseComponent
 */
export default class ProfileFavorite extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}