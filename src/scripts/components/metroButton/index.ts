import {BaseComponent} from "../baseComponent.ts";
import template from "./template.precompiled.js";
import {BaseLayout} from "../../layouts/baseLayout.ts";
import {Page} from "../../pages/page.ts";

/**
 * @class AddressButton
 * @description Компонент кнопки с подсказками адреса
 * @augments BaseComponent
 */
export default class MetroButton extends BaseComponent {
    private name: string;
    private color: string;
    private index: number;

    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     * @param {number} index - индекс компонента.
     * @param {string} name - название.
     * @param {string} color - цвет.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    constructor({page, layout, index, name, color}: {page: Page, layout: BaseLayout | undefined, name: string, color: string, index: number}) {
        super({page, layout});
        this.index = index;
        this.name = name;
        this.color = color;
    }

    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template({name: this.name, color: this.color, index: this.index});
    }
}