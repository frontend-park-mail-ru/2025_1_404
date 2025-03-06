'use strict';

export function validateForm(form) {
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
            if (!validatePassword(password)) {
                isValid = false;
                if (password.length === 0) {
                    field.error = 'Это поле обязательное';
                } else if (password.length < 8) {
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

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        );
}

function validateNickname(name) {
    return String(name)
        .match(
            /^([A-Z])[a-z]+$/
        );
}

function validatePassword(password) {
    return String(password)
        .match(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
        );

}