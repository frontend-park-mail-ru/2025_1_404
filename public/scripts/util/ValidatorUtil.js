'use strict';

/**
 * @function validateForm
 * @description Функция для валидации форм.
 * @param form
 * @param additionalDetails
 * @returns [isValid, data]
 */
export const validateFormInput = function (input, additionalDetails=false) {
    const value = input.value;

    if (value.length === 0) {
        return 'Это поле обязательное';
    }

    switch(input.name) {
        // Валидация имени и фамилии
        case 'firstName':
        if (validateNickname(value)) {
            return '';
        }
        return 'Неправильно введено имя';
        case 'lastName':
        if (validateNickname(value)) {
            return '';
        }
        return 'Неправильно введена фамилия';
        // Валидация email
        case 'email':
        if (validateEmail(value)) {
            return '';
        }
        return 'Неправильный email';
        // Валидация пароля
        case 'password':
        if (validatePassword(value, additionalDetails)) {
            return '';
        }
        if (value.length < 8) {
            return 'Пароль должен быть не меньше 8 символов';
        }
        return 'Пароль должен включать хотя бы одну букву каждого регистра и цифру';
        // Валидация подтверждения пароля
        case 'confirmPassword':
        const password = document.getElementById('registerPassword')?.value
        if (password !== value) {
            return 'Пароли должны совпадать';
        }
        return '';
    }
}

/**
 * @function parseForm
 * @description Функция для парсинга форм.
 * @param form
 * @returns {{name: *, value: *, error: string}[]}
 */
export function parseForm(form) {
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
            /^[A-Za-zА-Яа-яЁё-]+$/
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