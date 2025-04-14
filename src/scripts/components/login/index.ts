import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";
import User from "../../models/user.ts";
import {validateFormInput} from "../../util/validatorUtil.ts";

interface LoginInterface extends Record<string, string> {
    email: string;
    password: string;
}

/**
 * @class Login
 * @description Компонент авторизации.
 * @augments BaseComponent
 */
export default class Login extends BaseComponent {
    private _overlay: HTMLElement;
    /**
     * @description Конструктор класса.
     * @param {Page} page - экземпляр класса Page.
     * @param {BaseLayout} layout - экземпляр класса Layout.
     */
    constructor({page, layout}: BaseComponentInterface) {
        super({layout, page});
        this._overlay = document.querySelector('.overlay') as HTMLElement;
    }

    /**
     * @function initListeners
     * @description Метод инициализации слушателей событий.
     */
    initListeners() {
        this.initListener('loginCloseButton', 'click', this._loginCloseButtonHandler);
        this.initListener('login-form', 'submit', this._loginFormHandler);
        this.initListener('login-form', 'input', this._loginFormInputHandler);
        this.initListener('registerHrefButton', 'click', this._loginFormRegisterButtonHandler);
        this.initListener('overlay', 'click', this._overlayHandler);
    }

    /**
     * @function setShowLogin
     * @description Метод установки состояния окна авторизации.
     * @param {boolean} isShow - состояние окна авторизации.c
     */
    setShowLogin(isShow: boolean) {
        const login = document.querySelector(".login") as HTMLElement;
        const overlay = document.querySelector(".overlay") as HTMLElement;
        if (isShow) {
            const passwordInput = document.querySelector('#passwordInput') as HTMLInputElement;
            passwordInput.value = '';
            login.classList.add('active');
            overlay.classList.add('active');
            return;
        }
        login.classList.remove('active');
        overlay.classList.remove('active');
    }

    /**
     * @function _loginCloseButtonHandler
     * @description Обработчик события закрытия окна входа
     * @private
     */
    _loginCloseButtonHandler() {
        this.setShowLogin(false);
    }

    /**
     * @function _loginFormRegisterButtonHandler
     * @description Обработчик события перехода на страницу регистрации
     * @private
     */
    _loginFormRegisterButtonHandler() {
        RouteManager.navigateTo('/register');
    }

    /**
     * @function _loginFormHandler
     * @description Обработчик события формы входа
     * @param {Event} event событие отправки формы
     * @private
     */
    _loginFormHandler(event: Event) {
        event.preventDefault();

        this._resetApiError();

        const target = event.target as HTMLElement;
        const loginButton = target.querySelector('#loginSubmitButton') as HTMLButtonElement;
        loginButton.disabled = true;

        const isValid = this._validateFormFields(target);
        if (!isValid) {
            loginButton.disabled = false;
            return;
        }
        const values = this._getFormValues(target);
        if (!this.layout) {
            return;
        }
        this.layout.makeRequest(User.login.bind(User), values as LoginInterface).then(() => {
            if (!this.layout) {
                return;
            }
            this.layout.emit('login');
            this._loginCloseButtonHandler();
        }).catch((error: Error) => {
            this._showApiError(error);
        }).finally(() => {
            loginButton.disabled = false;
        })
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

    /**
     * @function _loginFormInputHandler
     * @description Обработчик события отпускания input
     * @param {Event} event событие отпускания клавиши
     * @private
     */
    _loginFormInputHandler(event: Event) {
        event.preventDefault();

        if (!event.target) {
            return;
        }
        const target = event.target as HTMLInputElement;
        
        if (target.tagName !== 'INPUT') {
            return;
        }

        const errorText = validateFormInput(target);
        const errorField = target.nextElementSibling;
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

    /**
     * @function _overlayHandler
     * @description Обработчик события клика на затемненное пространство
     * @param {Event} event событие клика
     * @private
     */
    _overlayHandler(event: Event) {
        if (event.target === this._overlay) {
            this._loginCloseButtonHandler();
        }
    }
}