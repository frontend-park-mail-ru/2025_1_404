'use strict'

import Page from '../page.js';
import template from './register.precompiled.js';
import {validateForm} from "../../util/ValidatorUtil.js";
import {registerAccount} from "../../util/ApiUtil.js";

/**
 * @class RegisterPage
 * @description Страница регистрации
 * @extends Page
 */
export default class RegisterPage extends Page {

    _registerFormHandler(event) {
        event.preventDefault();

        const [isValid, data] = validateForm(event.target, true)
        console.log(data)
        const errorFields = event.target
            .getElementsByClassName('error');
        data.forEach((field, index) => {
            errorFields[index].textContent = field.error;
            if (field.error !== "")
                errorFields[index].classList.add('error__visible');
            else
                errorFields[index].classList.remove('error__visible');
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
                routeManager.navigateTo('/');
                let apiError = document.getElementById('api-error');
                apiError.classList.remove('error__visible');
            }).catch((error) => {
                let apiError = document.getElementById('api-error');
                apiError.textContent = error.message;
                apiError.classList.add('error__visible');
            })
        }

    }

    _registerHeaderHandler(event) {
        event.preventDefault();
        routeManager.navigateTo('/');
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