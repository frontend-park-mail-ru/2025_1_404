import RouteManager from "../../managers/routeManager/routeManager.ts";
import User from "../../models/user.ts";
import {validateFormInput} from "../../util/validatorUtil.ts";
import BaseModal, {BaseModalInterface} from "../baseModal";
import PasswordInput from "../passwordInput";

interface LoginInterface extends Record<string, string> {
    email: string;
    password: string;
}

/**
 * @class Login
 * @description Компонент авторизации.
 * @augments BaseComponent
 */
export default class Login extends BaseModal {
    private loginButton: HTMLButtonElement | undefined;
    private passwordInput: PasswordInput | undefined;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     * @param {string} id - идентификатор компонента.
     */
    constructor({page, layout, id}: BaseModalInterface) {
        super({layout, page, id});
        const root = document.getElementById(this.id);
        if (!root) {
            return;
        }
        this.loginButton = root.querySelector('#loginSubmitButton') as HTMLButtonElement;
        this.passwordInput = new PasswordInput({
            layout,
            page,
            id: 'loginPassword'
        })
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        super.initListeners();
        this.initListenerFromElement({root: this.id, elementId: 'login-form', type: 'submit', handler: this.loginFormHandler});
        this.initListenerFromElement({
            root: this.id,
            elementId: 'login-form',
            type: 'input',
            handler: this.loginFormInputHandler
        });
        this.initListenerFromElement({
            root: this.id,
            elementId: 'registerHrefButton',
            type: 'click',
            handler: this.loginFormRegisterButtonHandler
        });
    }

    /**
     * @function setShowModal
     * @description Метод установки состояния окна авторизации.
     * @param {boolean} isShow - состояние окна авторизации.
     */
    setShowModal(isShow: boolean) {
        if (isShow && this.passwordInput) {
            const passwordInput = document.querySelector('#loginPassword__input') as HTMLInputElement;
            passwordInput.value = '';
            this.passwordInput.setVisibility(false);
        }
        super.setShowModal(isShow);
    }

    /**
     * @function loginFormRegisterButtonHandler
     * @description Обработчик события перехода на страницу регистрации
     * @private
     */
    private loginFormRegisterButtonHandler() {
        RouteManager.navigateTo('/register');
    }

    /**
     * @function loginFormHandler
     * @description Обработчик события формы входа
     * @param {Event} event событие отправки формы
     * @private
     */
    private loginFormHandler(event: Event) {
        event.preventDefault();
        if (!this.loginButton) {
            return;
        }

        this.resetApiError();

        const target = event.target as HTMLElement;
        if (target.classList.contains('passwordInput__eye')) {
            return;
        }
        this.loginButton.disabled = true;

        const isValid = this.validateFormFields(target);
        if (!isValid) {
            this.loginButton.disabled = false;
            return;
        }
        const values = this.getFormValues(target);
        if (!this.layout) {
            return;
        }
        this.layout.makeRequest(User.login.bind(User), values as LoginInterface).then(() => {
            if (!this.layout) {
                return;
            }
            this.layout.emit('login');
            this.submitCancelButtonHandler();
        }).catch((error: Error) => {
            this.showApiError(error);
        }).finally(() => {
            if (!this.loginButton) {
                return;
            }
            this.loginButton.disabled = false;
        })
    }

    /**
     * @function resetApiError
     * @description Метод сброса ошибки API
     */
    private resetApiError() {
        const apiError = document.getElementById('login-api-error') as HTMLElement;
        apiError.classList.remove('error__visible');
    }

    /**
     * @function showApiError
     * @description Метод отображения ошибки API
     * @param {Error} error ошибка API
     */
    private showApiError(error: Error) {
        const apiError = document.getElementById('login-api-error') as HTMLElement;
        apiError.textContent = 'Ошибка: '.concat(error.message);
        apiError.classList.add('error__visible');
    }

    /**
     * @function validateFormFields
     * @description Метод валидации полей формы
     * @param {HTMLElement} formElement элемент формы
     * @returns {boolean} true, если форма валидна, иначе false
     */
    validateFormFields(formElement: HTMLElement): boolean {
        let isValid = true;
        const inputFields = formElement.querySelectorAll('input');

        inputFields.forEach((input) => {
            const errorText = validateFormInput(input, false);
            let errorField = input.nextElementSibling;
            if ((input.dataset.clearfield || input.dataset.passwordfield) && input.parentElement) {
                errorField = input.parentElement.nextElementSibling;
            }

            if (!errorField) {
                return;
            }

            if (errorText !== "") {
                isValid = false;
                this.showFieldError(input, errorField, errorText);
            }
        });
        return isValid;
    }

    /**
     * @function showFieldError
     * @description Метод отображения ошибки в поле ввода
     * @param {HTMLInputElement} input поле ввода
     * @param {Element} errorField элемент ошибки
     * @param {string} errorText текст ошибки
     */
    private showFieldError(input: HTMLInputElement, errorField: Element, errorText: string) {
        input.classList.add('input__invalid');
        errorField.classList.add('error__visible');
        errorField.textContent = errorText;
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

    /**
     * @function loginFormInputHandler
     * @description Обработчик события отпускания input
     * @param {Event} event событие отпускания клавиши
     * @private
     */
    private loginFormInputHandler(event: Event) {
        event.preventDefault();

        if (!event.target) {
            return;
        }
        const target = event.target as HTMLInputElement;
        
        if (target.tagName !== 'INPUT') {
            return;
        }

        const errorText = validateFormInput(target);
        let errorField = target.nextElementSibling;
        if ((target.dataset.clearfield || target.dataset.passwordfield) && target.parentElement) {
            errorField = target.parentElement.nextElementSibling;
        }
        if (!errorField) {
            return;
        }
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
}