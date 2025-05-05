import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';

/**
 * @class Card
 * @description Компонент карточки.
 * @augments BaseComponent
 */
export default class Popup extends BaseComponent {
    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @param {object} args - аргументы для рендеринга.
     * @param {string} args.title - заголовок компонента.
     * @param {string} args.details - детали компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render(args: {title: string, details: string}): string {
        return template(args);
    }
}