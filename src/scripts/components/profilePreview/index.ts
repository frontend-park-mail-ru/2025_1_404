import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class ProfilePreview
 * @description Компонент превью объявления на странице профиля.
 * @augments BaseComponent
 */
export default class ProfilePreview extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}