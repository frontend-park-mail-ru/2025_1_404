'use strict';

const   EMPTY_LENGTH = 0,
        MIN_PASSWORD_LENGTH = 8;
      
/**
 * @function validateEmail
 * @description Функция для валидации почты.
 * @param email
 * @returns RegExpMatchArray
 */
const validateEmail = function(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/u
        );
}

/**
 * @function validateNickname
 * @description Функция для валидации имени/фамилии.
 * @param name
 * @returns RegExpMatchArray
 */
const validateNickname = function(name) {
    return String(name)
        .match(
            /^[A-Za-zА-Яа-яЁё-]+$/u
        );
}

/**
 * @function validatePassword
 * @description Функция для валидации пароля.
 * @param password
 * @param additionalChecks
 * @returns boolean
 */
const validatePassword = function(password, additionalChecks=false) {
    if (additionalChecks) {
        return String(password)
            .match(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/u
            );
    }
    return String(password).length > EMPTY_LENGTH;
}

/**
 * @function validateFormInput
 * @description Функция для валидации input.
 * @param input
 * @param additionalDetails
 * @returns error
 */

export const validateFormInput = function ({value, name:valueName}, additionalDetails=false) {
    const valueLength = value.length;
    if (valueLength === EMPTY_LENGTH) {
        return 'Это поле обязательное';
    }

    const password = document.getElementById('registerPassword')?.value
    switch(valueName) {
        // Валидация имени и фамилии
        case 'first_name':
        if (validateNickname(value)) {
            return '';
        }
        return 'Неправильно введено имя';
        case 'last_name':
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
        if (value.length < MIN_PASSWORD_LENGTH) {
            return 'Пароль должен быть не меньше 8 символов';
        }
        return 'Пароль должен включать хотя бы одну букву каждого регистра и цифру';
        // Валидация подтверждения пароля
        case 'confirmPassword':
        if (password !== value) {
            return 'Пароли должны совпадать';
        }
        return '';
        default:
        return '';
    }
}

/**
 * @function parseForm
 * @description Функция для парсинга форм.
 * @param form
 * @returns {{name: *, value: *, error: string}[]}
 */
export const parseForm = function(form) {
    const {elements} = form;
    return Array.from(elements)
        .filter((item) => Boolean(item.name))
        .map((element) => {
            const {name, value} = element;
            const error = "";

            return {error, name, value};
        });
}

