import BaseComponent from "../BaseComponent.js";
import {login} from "../../util/ApiUtil.js";
import {validateFormInput} from "../../util/ValidatorUtil.js";

/**
 * @class Login
 * @description Компонент авторизации.
 * @extends BaseComponent
 */
export default class Login extends BaseComponent {
    constructor() {
        super();

        this._loginCloseButton = document.getElementById('loginCloseButton');
        this._loginCloseButton.addEventListener('click', () => this._loginCloseButtonHandler());

        this._loginFormRegisterButton = document.getElementById('registerHrefButton');
        this._loginFormRegisterButton.addEventListener('click', () => this._loginFormRegisterButtonHandler());

        this._loginForm = document.getElementById('login-form');
        this._loginForm.addEventListener('submit', (event) => this._loginFormHandler(event));
        this._loginForm.addEventListener('blur', (event) => this._loginFormInputHandler(event), true);

        this._overlay = null;
        [this._overlay] = document.getElementsByClassName('overlay');
        this._overlay.addEventListener('click', (event) => this._overlayHandler(event));
    }

    destroy() {
        this._loginCloseButton.removeEventListener('click', this._loginCloseButtonHandler);
        this._loginForm.removeEventListener('submit', this._loginFormHandler);
        this._loginForm.removeEventListener('blur', this._loginFormInputHandler);
        this._loginFormRegisterButton.removeEventListener('click', this._loginFormRegisterButtonHandler);
        this._overlay.removeEventListener('click', this._loginCloseButtonHandler);
        super.destroy();
    }

    /**
     * @method _loginCloseButtonHandler
     * @description Обработчик события закрытия окна входа
     * @private
     */
    _loginCloseButtonHandler() {
        document.querySelector(".login").classList.remove('active');
        document.querySelector(".overlay").classList.remove('active');
    }

    /**
     * @method _loginFormRegisterButtonHandler
     * @description Обработчик события перехода на страницу регистрации
     * @private
     */
    _loginFormRegisterButtonHandler() {
        window.routeManager.navigateTo('/register');
    }

    /**
     * @method _loginFormHandler
     * @description Обработчик события формы входа
     * @param event
     * @private
     */
    _loginFormHandler(event) {
        event.preventDefault();

        const apiError = document.getElementById('api-error');
        apiError.classList.remove('error__visible');
        const loginButton = event.target.querySelector('#loginSubmitButton');
        loginButton.disabled = true;

        let isValid = true;
        const inputFields = event.target
            .querySelectorAll('input');
        inputFields.forEach((input) => {
            const errorText = validateFormInput(input, false);
            const errorField = input.nextElementSibling;
            if (errorText !== "") {
                isValid = false;
                input.classList.add('input__invalid');
                errorField.classList.add('error__visible');
                errorField.textContent = errorText;
            }
        })
        if (!isValid) {
            loginButton.disabled = false;
            return;
        }
        const values = Array.from(inputFields).reduce((acc, field) => {
            if (field.name !== 'confirmPassword') {
                acc[field.name] = field.value;
            }
            return acc;
        }, {});

        login(values).then((user) => {
            window.currentUser = user;
            window.pageManager.setHeaderStatus(true);
            this._loginCloseButtonHandler();
        }).catch((error) => {
            apiError.textContent = error.message;
            apiError.classList.add('error__visible');
        }).finally(() => {
            loginButton.disabled = false;
        })
    }

    /**
     * @method _loginFormInputHandler
     * @description Обработчик события отпускания input
     * @param event
     * @private
     */
    _loginFormInputHandler(event, {target} = event) {
        event.preventDefault();

        if (target.tagName !== 'INPUT') {
            return;
        }

        const errorText = validateFormInput(target);
        const errorField = target.nextElementSibling;
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
     * @method _overlayHandler
     * @description Обработчик события клика на затемненное пространство
     * @param event
     * @private
     */
    _overlayHandler(event) {
        if (event.target === this._overlay) {
            this._loginCloseButtonHandler();
        }
    }
}