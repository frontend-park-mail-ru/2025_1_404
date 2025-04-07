
import {Page, PageRenderInterface} from '../page';
import RouteManager from "../../managers/routeManager/routeManager.js";
import User from "../../models/user.js";
import template from './template.precompiled.js';
import {validateFormInput} from "../../util/validatorUtil.js";
import {BaseLayout} from "../../layouts/baseLayout.js";

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

        const apiError = document.getElementById('api-error') as HTMLElement;
        apiError.classList.remove('error__visible');

        if (!event.target) {
            return;
        }
        const target = event.target as HTMLElement;

        const registerButton = target.querySelector('#registerSubmitButton') as HTMLButtonElement;
        registerButton.disabled = true;

        let isValid = true;
        const inputFields = target
            .querySelectorAll('input') as NodeListOf<HTMLInputElement>;

        inputFields.forEach((input) => {
            const errorText = validateFormInput(input, true);
            const errorField = input.nextElementSibling as HTMLElement;
            if (errorText !== "") {
                isValid = false;
                input.classList.add('input__invalid');
                errorField.classList.add('error__visible');
                errorField.textContent = errorText;
            }
        })

        if (!isValid) {
            registerButton.disabled = false;
            return;
        }
        const values = Array.from(inputFields).reduce((acc: Record<string, string>, field) => {

            if (field.name !== 'confirmPassword') {
                acc[field.name] = field.value;
            }
            return acc;
        }, {});

        if (this._layout) {
            this._layout.makeRequest(User.register.bind(User), values).then(() => {
                RouteManager.navigateTo('/');
            }).catch((error) => {
                apiError.textContent = error.message;
                apiError.classList.add('error__visible');
            }).finally(() => {
                registerButton.disabled = false;
            })
        }
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
}