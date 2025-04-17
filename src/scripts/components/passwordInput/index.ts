import {BaseComponent} from "../baseComponent.ts";
import template from './template.precompiled.js';
import {Page} from "../../pages/page.ts";
import {BaseLayout} from "../../layouts/baseLayout.ts";

export interface PasswordInputInterface {
    id: string;
    page: Page;
    layout: BaseLayout | undefined;
}

/**
 * @class PasswordInput
 * @description Компонент поля ввода пароля.
 * @augments BaseComponent
 */
export default class PasswordInput extends BaseComponent {
    private eyeButton: HTMLButtonElement;
    private input: HTMLInputElement;
    private id: string | null = null;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     * @param {string} id - идентификатор компонента.
     */
    constructor({page, layout, id}: PasswordInputInterface) {
        super({layout, page});
        this.id = id;
        this.eyeButton = document.getElementById(`${id}__eyeButton`) as HTMLButtonElement;
        this.input = document.getElementById(`${id}__input`) as HTMLInputElement;
        if (!this.eyeButton || !this.input) {
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
        this.initListener(this.eyeButton.id, 'click', this.eyeButtonClickHandler);
    }

    /**
     * @function setVisibility
     * @description Метод установки видимости пароля.
     * @param {boolean} visibility - видимость пароля.
     */
    setVisibility(visibility: boolean) {
        if (visibility) {
            this.input.type = 'text';
            this.eyeButton.classList.remove('fa-eye');
            this.eyeButton.classList.add('fa-eye-slash');
            return;
        }
        this.input.type = 'password';
        this.eyeButton.classList.remove('fa-eye-slash');
        this.eyeButton.classList.add('fa-eye');
    }

    /**
     * @function eyeButtonClickHandler
     * @description Метод обработки события нажатия кнопки видимости пароля.
     */
    eyeButtonClickHandler() {
        this.setVisibility(this.input.type === 'password');
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