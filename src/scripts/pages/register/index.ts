
import {Page, PageRenderInterface} from '../page';
import RouteManager from "../../managers/routeManager/routeManager.ts";
import User from "../../models/user.ts";
import template from './template.precompiled.js';
import {BaseLayout} from "../../layouts/baseLayout.ts";
import PasswordInput from "../../components/passwordInput";

interface RegisterInterface extends Record<string, string> {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

/**
 * @class RegisterPage
 * @description Страница регистрации
 * @augments Page
 */
export default class RegisterPage extends Page {
    private layout: BaseLayout | undefined;
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({root, layout}: PageRenderInterface) {
        this.layout = layout;
        root.innerHTML = template();

        new PasswordInput({
            layout,
            page: this,
            id: 'registerPassword'
        });
        new PasswordInput({
            layout,
            page: this,
            id: 'registerConfirmPassword'
        });

        super.render({root, layout});
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('register-form', 'submit', this.registerFormHandler);
        this.initListener('register-form', 'input', this.registerFormInputHandler);
        this.initListener('register-form-header-clickable', 'click', this.registerHeaderHandler);
        this.initListener('redirectJoinButton', 'click', this.redirectJoinHandler);
    }

    /**
     * @function registerFormHandler
     * @description Обработчик отправки формы регистрации
     * @param {Event} event событие отправки формы
     * @private
     */
    private registerFormHandler(event: Event) {
        event.preventDefault();

        this.resetApiError();
        const target = event.target as HTMLInputElement;

        const registerButton = target.querySelector('#registerSubmitButton') as HTMLButtonElement;
        registerButton.disabled = true;

        const isValid = this.validateFormFields(target);
        if (!isValid) {
            registerButton.disabled = false;
            return;
        }
        const values = this.getFormValues(target);
        if (this.layout) {
            this.layout.makeRequest(User.register.bind(User), values as RegisterInterface).then(() => {
                RouteManager.navigateTo('/');
            }).catch((error) => {
                this.showApiError(error);
            }).finally(() => {
                registerButton.disabled = false;
            })
        }
    }

    /**
     * @function registerFormInputHandler
     * @description Обработчик события отпускания input
     * @param {Event} event событие отпускания input
     * @private
     */
    private registerFormInputHandler(event: Event) {
        event.preventDefault();
        this.formInputHandler(event);
    }

    /**
     * @function registerHeaderHandler
     * @description Обработчик нажатия на заголовок формы регистрации
     * @param {Event} event событие нажатия
     * @private
     */
    private registerHeaderHandler(event: Event) {
        event.preventDefault();
        RouteManager.navigateTo('/');
    }

    /**
     * @function redirectJoinHandler
     * @description Обработчик нажатия на кнопку "Уже есть аккаунт?"
     * @param {Event} event событие нажатия
     * @private
     */
    private redirectJoinHandler(event: Event) {
        event.preventDefault();
        RouteManager.navigateTo('/login');
    }

    /**
     * @function getFormValues
     * @description Метод получения значений полей формы
     * @param {HTMLElement} formElement элемент формы
     * @returns {Record<string, string>} объект с именами полей и их значениями
     */
    private getFormValues(formElement: HTMLElement): Record<string, string> {
        const inputFields = formElement.querySelectorAll('input');
        return Array.from(inputFields).reduce((acc: Record<string, string>, field) => {
            if (field.name !== 'confirmPassword') {
                acc[field.name] = field.value;
            }
            return acc;
        }, {});
    }
}