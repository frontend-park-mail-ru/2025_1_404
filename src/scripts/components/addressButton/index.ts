import {BaseComponent} from "../baseComponent.ts";
import template from "./template.precompiled.js";
import {BaseLayout} from "../../layouts/baseLayout.ts";
import {Page} from "../../pages/page.ts";

/**
 * @class AddressButton
 * @description Компонент кнопки с подсказками адреса
 * @augments BaseComponent
 */
export default class AddressButton extends BaseComponent {
    private displayName: string;
    private index: number;

    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     * @param {number} index - индекс компонента.
     * @param {string} displayName - имя компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    constructor({page, layout, index, displayName}: {page: Page, layout: BaseLayout | undefined, displayName: string, index: number}) {
        super({page, layout});
        this.index = index;
        this.displayName = displayName;
    }

    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template({name: this.displayName, index: this.index});
    }
}