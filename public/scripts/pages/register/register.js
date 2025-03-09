'use strict'

import Page from '../page.js';
import template from './register.precompiled.js';
import {parseForm, validateForm} from "../../util/ValidatorUtil.js";
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

        const errorFields = event.target
            .getElementsByClassName('error');
        const inputFields = event.target
            .getElementsByTagName('input');
        parseForm(event.target).forEach((field, index) => {
            errorFields[index].classList.remove('error__visible');
            inputFields[index].classList.remove('input__invalid');
        });

        setTimeout(() => {
            const [isValid, data] = validateForm(event.target, true);
            data.forEach((field, index) => {
                errorFields[index].textContent = field.error;
                if (field.error !== "") {
                    errorFields[index].classList.add('error__visible');
                    inputFields[index].classList.add('input__invalid');
                } else {
                    errorFields[index].classList.remove('error__visible');
                    inputFields[index].classList.remove('input__invalid');
                }
            })

            if (isValid) {
                const values = data.reduce((acc, field) => {
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
            else {
                registerButton.disabled = false;
            }
        }, 50);

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

    render(root) {
        root.innerHTML = template();

        this._registerForm = document.getElementById('register-form');
        this._registerForm.addEventListener('submit',  (event) => this._registerFormHandler(event));

        this._registerHeader = document.getElementById('register-form-header-clickable')
        this._registerHeader.addEventListener('click', (event) => this._registerHeaderHandler(event));

        this._redirectJoinButton = document.getElementById('redirectJoinButton');
        this._redirectJoinButton.addEventListener('click', (event) => this._registerHeaderHandler(event));

        super.render(root);
    }

    destroy() {
        if (this._registerForm) {
            this._registerForm.removeEventListener('submit', this._registerFormHandler);
        }

        if (this._registerHeader) {
            this._registerHeader.removeEventListener('click', this._registerHeaderHandler);
        }

        if (this._redirectJoinButton) {
            this._redirectJoinButton.removeEventListener('click', this._registerHeaderHandler);
        }

        super.destroy();
    }
}