'use strict';

const BACKEND_URL = 'http://localhost:8000';

const HTTP_METHOD_GET = 'GET';
const HTTP_METHOD_POST = 'POST';

/**
 * @function makeRequest
 * @description Функция для выполнения запроса к бэкенду.
 * @param method
 * @param endpoint
 * @param body
 * @returns {Promise<any>}
 */
async function makeRequest(method=HTTP_METHOD_GET, endpoint, body={}) {
    const options = {
        method,
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (method === HTTP_METHOD_POST) {
        options.body = JSON.stringify(body);
    }
    try {
        const response = await fetch(`${BACKEND_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        throw new Error(`Ошибка при выполнении запроса: ${error.message}`);
    }
}

/**
 * @function getOffers
 * @description Функция для получения списка предложений.
 * @returns {Promise<*>}
 */
export async function getOffers() {
    return makeRequest(HTTP_METHOD_GET, '/offers');
}

/**
 * @function registerAccount
 * @description Функция для регистрации аккаунта.
 * @param email почта
 * @param password пароль
 * @param first_name имя
 * @param last_name фамилия
 * @returns {Promise<*>}
 */
export async function registerAccount({firstName: first_name, lastName: last_name, email, password}) {
    return makeRequest(HTTP_METHOD_POST, '/auth/register', {first_name, last_name, email, password});
}

/**
 * @function getProfile
 * @description Функция для получения профиля.
 * @returns {Promise<null>}
 */
export async function getProfile() {
    return null;
    // return {
    //     'first_name': 'Иван',
    //     'last_name': 'Петров'
    // }
    //return makeRequest(HTTP_METHOD_GET, '/me');
}

/**
 * @function login
 * @description Функция для входа в аккаунт.
 * @param email
 * @param password
 * @returns {Promise<{first_name: string, last_name: string}>}
 */
export async function login({email, password}) {
    return {
        'first_name': 'Иван',
        'last_name': 'Петров'
    }
    // return makeRequest(HTTP_METHOD_POST, '/auth/login', {email, password});
}

/**
 * @function logout
 * @description Функция для выхода из аккаунта.
 * @returns {Promise<boolean>}
 */
export async function logout() {
    return true;
    // return makeRequest(HTTP_METHOD_POST, '/auth/logout');
}