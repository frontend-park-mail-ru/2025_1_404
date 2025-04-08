
import {Page, PageRenderInterface} from '../page';
import RouteManager from "../../managers/routeManager/routeManager.ts";
import User from "../../models/user.ts";
import template from './template.precompiled.js';
import {validateFormInput} from "../../util/validatorUtil.ts";
import {BaseLayout} from "../../layouts/baseLayout.ts";

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
    private _layout: BaseLayout | undefined;
    /**
     * @function render
     * @description Метод рендеринга страницы.
     * @param {HTMLElement} root корневой элемент страницы
     * @param {BaseLayout} layout макет страницы
     */
    render({root, layout}: PageRenderInterface) {
        this._layout = layout;
        root.innerHTML = template();
        super.render({root, layout});
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('register-form', 'submit', this._registerFormHandler);
        this.initListener('register-form', 'focusout', this._registerFormInputHandler);
        this.initListener('register-form-header-clickable', 'click', this._registerHeaderHandler);
        this.initListener('redirectJoinButton', 'click', this._redirectJoinHandler);
    }

    /**
     * @function _registerFormHandler
     * @description Обработчик отправки формы регистрации
     * @param {Event} event событие отправки формы
     * @private
     */
    _registerFormHandler(event: Event) {
        event.preventDefault();

        this._resetApiError();
        const target = event.target as HTMLInputElement;

        const registerButton = target.querySelector('#registerSubmitButton') as HTMLButtonElement;
        registerButton.disabled = true;

        const isValid = this._validateFormFields(target);
        if (!isValid) {
            registerButton.disabled = false;
            return;
        }
        const values = this._getFormValues(target);
        if (this._layout) {
            this._layout.makeRequest(User.register.bind(User), values as RegisterInterface).then(() => {
                RouteManager.navigateTo('/');
            }).catch((error) => {
                this._showApiError(error);
            }).finally(() => {
                registerButton.disabled = false;
            })
        }
    }

    /**
     * @function _resetApiError
     * @description Метод сброса ошибки API
     */
    _resetApiError() {
        const apiError = document.getElementById('api-error') as HTMLElement;
        apiError.classList.remove('error__visible');
    }

    /**
     * @function _showApiError
     * @description Метод отображения ошибки API
     * @param {Error} error ошибка API
     */
    _showApiError(error: Error) {
        const apiError = document.getElementById('api-error') as HTMLElement;
        apiError.textContent = error.message;
        apiError.classList.add('error__visible');
    }

    /**
     * @function _validateFormFields
     * @description Метод валидации полей формы
     * @param {HTMLElement} formElement элемент формы
     * @returns {boolean} true, если форма валидна, иначе false
     */
    _validateFormFields(formElement: HTMLElement): boolean {
        let isValid = true;
        const inputFields = formElement.querySelectorAll('input');

        inputFields.forEach((input) => {
            const errorText = validateFormInput(input, false);
            const errorField = input.nextElementSibling;

            if (!errorField) {
                return;
            }

            if (errorText !== "") {
                isValid = false;
                this._showFieldError(input, errorField, errorText);
            }
        });

        return isValid;
    }

    /**
     * @function _showFieldError
     * @description Метод отображения ошибки в поле ввода
     * @param {HTMLInputElement} input поле ввода
     * @param {Element} errorField элемент ошибки
     * @param {string} errorText текст ошибки
     */
    _showFieldError(input: HTMLInputElement, errorField: Element, errorText: string) {
        input.classList.add('input__invalid');
        errorField.classList.add('error__visible');
        errorField.textContent = errorText;
    }

    /**
     * @function _registerFormInputHandler
     * @description Обработчик события отпускания input
     * @param {Event} event событие отпускания input
     * @param {HTMLElement} target элемент, на который кликнули
     * @private
     */
    _registerFormInputHandler(event: Event) {
        event.preventDefault();

        if (!event.target) {
            return;
        }
        const target = event.target as HTMLInputElement;

        if (target.tagName !== 'INPUT') {
            return;
        }

        const errorText = validateFormInput(target, true);
        const errorField = target.nextElementSibling as HTMLElement;
        if (errorText === "") {
            target.classList.remove('input__invalid');
            errorField.classList.remove('error__visible');
            errorField.textContent = errorText;
            return;
        }
        target.classList.add('input__invalid');
        errorField.classList.add('error__visible');
        errorField.textContent = errorText;
    }

    /**
     * @function _registerHeaderHandler
     * @description Обработчик нажатия на заголовок формы регистрации
     * @param {Event} event событие нажатия
     * @private
     */
    _registerHeaderHandler(event: Event) {
        event.preventDefault();
        RouteManager.navigateTo('/');
    }

    /**
     * @function _redirectJoinHandler
     * @description Обработчик нажатия на кнопку "Уже есть аккаунт?"
     * @param {Event} event событие нажатия
     * @private
     */
    _redirectJoinHandler(event: Event) {
        event.preventDefault();
        RouteManager.navigateTo('/login');
    }

    /**
     * @function _getFormValues
     * @description Метод получения значений полей формы
     * @param {HTMLElement} formElement элемент формы
     * @returns {Record<string, string>} объект с именами полей и их значениями
     */
    _getFormValues(formElement: HTMLElement): Record<string, string> {
        const inputFields = formElement.querySelectorAll('input');
        return Array.from(inputFields).reduce((acc: Record<string, string>, field) => {
            if (field.name !== 'confirmPassword') {
                acc[field.name] = field.value;
            }
            return acc;
        }, {});
    }
}