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
    private address: string;
    private index: number;

    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     * @param {number} index - индекс компонента.
     * @param {string} address - адрес
     * @returns {string} HTML-строка с разметкой компонента.
     */
    constructor({page, layout, index, address}: {page: Page, layout: BaseLayout | undefined, address: string, index: number}) {
        super({page, layout});
        this.index = index;
        this.address = address;
    }

    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template({name: this.address, index: this.index});
    }
}