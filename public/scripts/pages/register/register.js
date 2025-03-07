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
            const values = data
                .filter((field) => field.name !== "confirmPassword")
                .map(field => field.value);
            console.log(values);
            registerAccount(...values).then((user) => {
                // TODO менять header
            }).catch((error) => {
                console.error(error)
            })
        }

    }

    render(root) {
        root.innerHTML = template();

        this._registerForm = document.getElementById('register-form');
        this._registerForm.addEventListener('submit',  (event) => this._registerFormHandler(event));
    }

    destroy() {

    }
}