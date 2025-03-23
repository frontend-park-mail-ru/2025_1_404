'use strict'

import Page from '../page.js';
import RouteManager from "../../managers/RouteManager/RouteManager.js";
import User from "../../models/User.js";
import template from './register.precompiled.js';
import {validateFormInput} from "../../util/ValidatorUtil.js";

/**
 * @class RegisterPage
 * @description Страница регистрации
 * @extends Page
 */
export default class RegisterPage extends Page {
    render({root}) {
        root.innerHTML = template();
        super.render(root);
    }

    initListeners() {
        this.initListener('register-form', 'submit', this._registerFormHandler);
        this.initListener('register-form', 'focusout', this._registerFormInputHandler);
        this.initListener('register-form-header-clickable', 'click', this._registerHeaderHandler);
        this.initListener('redirectJoinButton', 'click', this._redirectJoinHandler);
    }

    destroy() {
        super.destroy();
    }

    /**
     * @method _registerFormHandler
     * @description Обработчик отправки формы регистрации
     * @param event
     * @private
     */
    _registerFormHandler(event) {
        event.preventDefault();

        const apiError = document.getElementById('api-error');
        apiError.classList.remove('error__visible');

        const registerButton = event.target.querySelector('#registerSubmitButton');
        registerButton.disabled = true;

        let isValid = true;
        const inputFields = event.target
            .querySelectorAll('input');

        inputFields.forEach((input) => {
            const errorText = validateFormInput(input, true);
            const errorField = input.nextElementSibling;
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
        const values = Array.from(inputFields).reduce((acc, field) => {

            if (field.name !== 'confirmPassword') {
                acc[field.name] = field.value;
            }
            return acc;
        }, {});

        User.register(values).then(() => {
            RouteManager.navigateTo('/');
        }).catch((error) => {
            apiError.textContent = error.message;
            apiError.classList.add('error__visible');
        }).finally(() => {
            registerButton.disabled = false;
        })
    }

    /**
     * @method _registerFormInputHandler
     * @description Обработчик события отпускания input
     * @param event
     * @private
     */
    _registerFormInputHandler(event, {target} = event) {
        event.preventDefault();

        if (target.tagName !== 'INPUT') {
            return;
        }

        const errorText = validateFormInput(target, true);
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
     * @method _registerHeaderHandler
     * @description Обработчик нажатия на заголовок формы регистрации
     * @param event
     * @private
     */
    _registerHeaderHandler(event) {
        event.preventDefault();
        RouteManager.navigateTo('/');
    }

    _redirectJoinHandler(event) {
        event.preventDefault();
        RouteManager.navigateTo('/login');
    }
}