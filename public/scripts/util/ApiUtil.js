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
 * @param is_realtor является ли риэлтором
 * @returns {Promise<*>}
 */
export async function registerAccount({ email, password, firstName: first_name, lastName: last_name, isRealtor: is_realtor }) {
    return makeRequest(HTTP_METHOD_POST, '/auth/register', { email, password, first_name, last_name, is_realtor });
}