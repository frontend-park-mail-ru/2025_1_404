import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';
import {Page} from "../../pages/page.ts";
import {BaseLayout} from "../../layouts/baseLayout.ts";

/**
 * @class ClearInput
 * @description Компонент поля ввода с возможностью очистки.
 * @augments BaseComponent
 */

export interface ClearInputInterface {
    id: string;
    page: Page;
    layout: BaseLayout | undefined;
}

/**
 * @class ClearInput
 * @description Компонент поля ввода с возможностью очистки.
 * @augments BaseComponent
 */
export default class ClearInput extends BaseComponent {
    private clearButton: HTMLButtonElement;
    protected input: HTMLInputElement;
    private id: string | null = null;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     * @param {string} id - идентификатор компонента.
     */
    constructor({page, layout, id}: ClearInputInterface) {
        super({layout, page});
        this.id = id;
        this.clearButton = document.getElementById(`${id}__clearButton`) as HTMLButtonElement;
        this.input = document.getElementById(`${id}__input`) as HTMLInputElement;
        if (!this.clearButton || !this.input) {
            return;
        }
        this.initListeners();
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        super.initListeners();
        if (!this.id) {
            return;
        }
        this.initListener(this.clearButton.id, 'click', this.clearButtonClickHandler);
        this.initListener(this.input.id, 'keyup', this.inputKeyUpHandler);
    }

    /**
     * @function inputKeyUpHandler
     * @description Метод обработки события нажатия клавиши на поле ввода.
     */
    inputKeyUpHandler() {
        if (this.input.value.length > 0) {
            this.clearButton.classList.remove('clearInput__clearButton__hidden');
        } else {
            if (this.clearButton.classList.contains('clearInput__clearButton__hidden')) {
                return;
            }
            this.clearButton.classList.add('clearInput__clearButton__hidden');
        }
    }

    /**
     * @function clearButtonClickHandler
     * @description Метод обработки события нажатия кнопки очистки.
     */
    clearButtonClickHandler() {
        this.input.value = '';
        const event = new Event('input');
        this.input.dispatchEvent(event);
        this.inputKeyUpHandler();
    }

    /**
     * @function render
     * @description Метод рендеринга компонента.
     * @returns {string} HTML-строка с разметкой компонента.
     */
    render() {
        return template();
    }
}