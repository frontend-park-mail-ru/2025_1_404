'use strict';

const   EMPTY_LENGTH = 0,
        MIN_PASSWORD_LENGTH = 8;
      
/**
 * @function validateEmail
 * @description Функция для валидации почты.
 * @param {string} email Электронная почта
 * @returns {boolean} Результат валидации
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
 * @param {string} name Имя/фамилия
 * @returns {boolean} Результат валидации
 */
const validateNickname = function(name) {
    return /^[A-Za-zА-Яа-яЁё-]+$/u.test(name);
}

/**
 * @function validatePassword
 * @description Функция для валидации пароля.
 * @param {string} password Пароль
 * @param {boolean} additionalChecks Дополнительные проверки
 * @returns {boolean} Результат валидации
 */
const validatePassword = function(password, additionalChecks=false) {
    if (additionalChecks) {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/u.test(password);
    }
    return String(password).length > EMPTY_LENGTH;
}

/**
 * @function validateFormInput
 * @description Функция для валидации input.
 * @param input
 * @param additionalDetails
 * @returns string
 */

export const validateFormInput = function ({value, name:valueName}, additionalDetails=false) {
    const valueLength = value.length;
    if (valueLength === EMPTY_LENGTH) {
        return 'Это поле обязательное';
    }
    console.log(valueName)
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
 * @param {HTMLFormElement} form Форма
 * @returns {{name: *, value: *, error: string}[]} Массив объектов с именем, значением и ошибкой
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

