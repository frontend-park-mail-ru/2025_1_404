import {BaseComponent, BaseComponentInterface} from "../baseComponent.ts";
import RouteManager from "../../managers/routeManager/routeManager.ts";
import User from "../../models/user.ts";
import {validateFormInput} from "../../util/validatorUtil.ts";

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
        this.initListener('login-form', 'focusout', this._loginFormInputHandler);
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

        const apiError = document.getElementById('api-error') as HTMLElement;
        apiError.classList.remove('error__visible');
        if (event.target === null) {
            return;
        }
        const target = event.target as HTMLElement;
        const loginButton = target.querySelector('#loginSubmitButton') as HTMLButtonElement;
        loginButton.disabled = true;

        let isValid = true;
        const inputFields = target
            .querySelectorAll('input');
        inputFields.forEach((input) => {
            const errorText = validateFormInput(input, false);
            const errorField = input.nextElementSibling;
            if (errorField === null) {
                return;
            }
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
        const values = Array.from(inputFields).reduce((acc: Record<string, any>, field) => {
            if (field.name !== 'confirmPassword') {
                acc[field.name] = field.value;
            }
            return acc;
        }, {});

        if (!this.layout) {
            return;
        }
        this.layout.makeRequest(User.login.bind(User), values).then(() => {
            if (!this.layout) {
                return;
            }
            this.layout.emit('login');
            this._loginCloseButtonHandler();
        }).catch((error: Error) => {
            apiError.textContent = error.message;
            apiError.classList.add('error__visible');
        }).finally(() => {
            loginButton.disabled = false;
        })
    }

    /**
     * @function _loginFormInputHandler
     * @description Обработчик события отпускания input
     * @param {Event} event событие отпускания клавиши
     * @param {HTMLElement} target элемент, на котором произошло событие
     * @private
     */
    _loginFormInputHandler(event: Event) {
        event.preventDefault();

        if (event.target === null) {
            return;
        }
        const target = event.target as HTMLInputElement;
        
        if (target.tagName !== 'INPUT') {
            return;
        }

        const errorText = validateFormInput(target);
        const errorField = target.nextElementSibling;
        if (errorField === null) {
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