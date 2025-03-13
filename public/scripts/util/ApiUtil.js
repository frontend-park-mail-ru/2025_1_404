'use strict';

const BACKEND_URL = 'http://localhost:8001/api/v1';

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
const makeRequest = async (endpoint, method=HTTP_METHOD_GET, body={}) => {
    const options = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        method,
        mode: 'cors',
    };
    if (method === HTTP_METHOD_POST) {
        options.body = JSON.stringify(body);
    }
    const response = await fetch(`${BACKEND_URL}${endpoint}`, options);
    if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error);
    }
    return await response.json();
}

/**
 * @function getOffers
 * @description Функция для получения списка предложений.
 * @returns {Promise<*>}
 */
export const getOffers =  async () => await makeRequest('/offers', HTTP_METHOD_GET);

/**
 * @function registerAccount
 * @description Функция для регистрации аккаунта.
 * @param email почта
 * @param password пароль
 * @param first_name имя
 * @param last_name фамилия
 * @returns {Promise<*>}
 */
export const registerAccount = async ({email, first_name, last_name,  password}) => await makeRequest('/auth/register', HTTP_METHOD_POST, {email, first_name, last_name, password});


/**
 * @function getProfile
 * @description Функция для получения профиля.
 * @returns {Promise<null>}
 */
export const getProfile = async () => await makeRequest('/auth/me', HTTP_METHOD_POST);


/**
 * @function login
 * @description Функция для входа в аккаунт.
 * @param email
 * @param password
 * @returns {Promise<{first_name: string, last_name: string}>}
 */
export const login = async ({email, password}) => await makeRequest('/auth/login', HTTP_METHOD_POST,  {email, password});


/**
 * @function logout
 * @description Функция для выхода из аккаунта.
 * @returns {Promise<boolean>}
 */
export const logout = async () => await makeRequest('/auth/logout', HTTP_METHOD_POST);
