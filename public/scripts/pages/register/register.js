'use strict'

import Page from '../page.js';
import template from './register.precompiled.js';
import {validateFormInput} from "../../util/ValidatorUtil.js";
import {registerAccount} from "../../util/ApiUtil.js";

/**
 * @class RegisterPage
 * @description Страница регистрации
 * @extends Page
 */
export default class RegisterPage extends Page {

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
            let errorText = validateFormInput(input, true);
            let errorField = input.nextElementSibling;
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
        registerAccount(values).then((user) => {
            window.currentUser = user;
            window.routeManager.navigateTo('/');
        }).catch((error) => {
            apiError.textContent = error.message;
            apiError.classList.add('error__visible');
        }).finally(() => {
            registerButton.disabled = false;
        })
    }

    _registerFormInputHandler(event) {
        event.preventDefault();

        let target = event.target;
        if (target.tagName !== 'INPUT') {
            return;
        }

        let errorText = validateFormInput(target, true);
        let errorField = target.nextElementSibling;
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
        window.routeManager.navigateTo('/');
    }

    _redirectJoinHandler(event) {
        event.preventDefault();
        window.routeManager.navigateTo('/');
        document.querySelector('#passwordInput').value = '';
        document.querySelector(".login").classList.add('active');
        document.querySelector(".overlay").classList.add('active');
    }

    render(root) {
        root.innerHTML = template();

        this._registerForm = document.getElementById('register-form');
        this._registerForm.addEventListener('submit',  (event) => this._registerFormHandler(event));
        this._registerForm.addEventListener('blur', (event) => this._registerFormInputHandler(event), true);

        this._registerHeader = document.getElementById('register-form-header-clickable')
        this._registerHeader.addEventListener('click', (event) => this._registerHeaderHandler(event));

        this._redirectJoinButton = document.getElementById('redirectJoinButton');
        this._redirectJoinButton.addEventListener('click', (event) => this._redirectJoinHandler(event));

        super.render(root);
    }

    destroy() {
        if (this._registerForm) {
            this._registerForm.removeEventListener('submit', this._registerFormHandler);
            this._registerForm.removeEventListener('blur', this._registerFormInputHandler);
        }

        if (this._registerHeader) {
            this._registerHeader.removeEventListener('click', this._registerHeaderHandler);
        }

        if (this._redirectJoinButton) {
            this._redirectJoinButton.removeEventListener('click', this._redirectJoinHandler);
        }

        super.destroy();
    }
}