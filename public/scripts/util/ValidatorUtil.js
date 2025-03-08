'use strict';

/**
 * @function validateForm
 * @description Функция для валидации форм.
 * @param form
 * @param additionalDetails
 * @returns [isValid, data]
 */
export function validateForm(form, additionalDetails=false) {
    const data = parseForm(form)

    let password = ""
    let isValid = true;
    data.forEach((field) => {
        if (field.name === "email") {

            if (!validateEmail(field.value)) {
                isValid = false;
                if (field.value.length === 0) {
                    field.error = 'Это поле обязательное';
                } else {
                    field.error = 'Неправильный email';
                }
            } else {
                field.error = "";
            }

        } else if (field.name === "password") {
            password = field.value;
            if (!validatePassword(password, additionalDetails)) {
                isValid = false;
                if (password.length === 0) {
                    field.error = 'Это поле обязательное';
                }
                else if (password.length < 8) {
                    field.error = 'Пароль должен быть не меньше 8 символов';
                } else {
                    field.error = 'Пароль должен включать хотя бы одну букву каждого регистра и цифру';
                }
            } else {
                field.error = "";
            }

        } else if (field.name === "confirmPassword") {

            if (field.value !== password || field.value === "") {
                isValid = false;
                field.error = 'Пароли должны совпадать';
            } else {
                field.error = "";
            }

        } else if (field.name === "firstName") {
            if (!validateNickname(field.value)) {
                isValid = false;
                if (field.value.length === 0) {
                    field.error = 'Это поле обязательное';
                } else {
                    field.error = 'Неправильно введено имя';
                }
            } else {
                field.error = "";
            }
        } else if (field.name === "lastName") {
            if (!validateNickname(field.value)) {
                isValid = false;
                if (field.value.length === 0) {
                    field.error = 'Это поле обязательное';
                } else {
                    field.error = 'Неправильно введена фамилия';
                }
            } else {
                field.error = "";
            }
        }
    });

    return [isValid, data];

}

/**
 * @function parseForm
 * @description Функция для парсинга форм.
 * @param form
 * @returns {{name: *, value: *, error: string}[]}
 */
function parseForm(form) {
    const {elements} = form;
    return Array.from(elements)
        .filter((item) => !!item.name)
        .map((element) => {
            const {name, value} = element;
            const error = "";

            return {name, value, error};
        });
}

/**
 * @function validateEmail
 * @description Функция для валидации почты.
 * @param email
 * @returns RegExpMatchArray
 */
function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        );
}

/**
 * @function validateNickname
 * @description Функция для валидации имени/фамилии.
 * @param name
 * @returns RegExpMatchArray
 */
function validateNickname(name) {
    return String(name)
        .match(
            /^([А-ЯЁ])[а-яё]+$/
        );
}

/**
 * @function validatePassword
 * @description Функция для валидации пароля.
 * @param password
 * @param additionalChecks
 * @returns boolean
 */
function validatePassword(password, additionalChecks=false) {
    if (additionalChecks) {
        return String(password)
            .match(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
            );
    }
    else {
        return String(password).length > 0;
    }

}