'use strict';

import {getProfile, login, logout, registerAccount} from "../util/apiUtil.js";

/**
 * @class User
 * @description Модель пользователя.
 */
class User {
    /**
     * @description Конструктор класса.
     */
    constructor() {
        this._isAuthenticated = false;
        this._isLoaded = false;
    }

    /**
     * @function isLoaded
     * @description Метод получения статуса загрузки данных пользователя.
     * @returns {boolean} статус загрузки данных пользователя.
     */
    isLoaded() {
        return this._isLoaded;
    }

    /**
     * @function isAuthenticated
     * @description Метод получения статуса авторизации пользователя.
     * @returns {boolean} статус авторизации пользователя.
     */
    isAuthenticated() {
        return this._isAuthenticated;
    }

    /**
     * @function getData
     * @description Метод получения данных пользователя.
     * @returns {{email: (null|*), firstName: (null|*), lastName: (null|*)}|null} данные пользователя.
     */
    getData() {
        if (!this._isAuthenticated) {
            return null;
        }
        return {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName
        }
    }

    /**
     * @function update
     * @description Метод обновления данных пользователя.
     * @returns {Promise<void>}
     */
    async update() {
        await getProfile().then((response) => {
            this._isAuthenticated = true;
            this.email = response.email;
            this.firstName = response.first_name;
            this.lastName = response.last_name;
            return this.getData();
        }).catch((error) => {
            throw error;
        }).finally(() => {
            this._isLoaded = true;
        });
    }

    /**
     * @function login
     * @description Метод авторизации пользователя.
     * @param {string} email email пользователя.
     * @param {string} password пароль пользователя.
     * @returns {Promise<void>}
     */
    async login({email, password}) {
        await login({email, password})
            .then((response) => {
                this._isAuthenticated = true;
                this.email = response.email;
                this.firstName = response.first_name;
                this.lastName = response.last_name;
                return this.getData();
            }).catch((error) => {
                throw error;
            });
    }

    /**
     * @function logout
     * @description Метод выхода пользователя.
     * @returns {Promise<void>}
     */
    async logout() {
        await logout().then(() => {
            this._isAuthenticated = false;
            this.email = null;
            this.firstName = null;
            this.lastName = null;
        })
    }

    /**
     * @function register
     * @description Метод регистрации пользователя.
     * @param {string} email email пользователя.
     * @param {string} password пароль пользователя.
     * @param {string} first_name имя пользователя.
     * @param {string} last_name фамилия пользователя.
     * @returns {Promise<void>}
     */
    async register({email, password, first_name, last_name}) {
        await registerAccount({email, first_name, last_name, password})
            .then((response) => {
                this._isAuthenticated = true;
                this.email = response.email;
                this.firstName = response.first_name;
                this.lastName = response.last_name;
                return this.getData();
            }).catch((error) => {
                throw error;
            });
    }
}

export default new User();