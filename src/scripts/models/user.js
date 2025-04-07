'use strict';

import {getProfile, login, logout, registerAccount, updateAvatar, updateProfile} from "../util/apiUtil.js";

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
     * @returns {*} данные пользователя.
     */
    getData() {
        if (!this._isAuthenticated) {
            return null;
        }
        return {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            avatar: this.avatar || '/img/userAvatar/unknown.svg'
        }
    }

    /**
     * @function updateProfile
     * @description Метод обновления данных пользователя на сервере.
     * @param {string} email email пользователя.
     * @param {string} first_name имя пользователя.
     * @param {string} last_name фамилия пользователя.
     * @returns {Promise<void>}
     */
    async updateProfile({email, first_name, last_name}) {
        if (!this._isAuthenticated) {
            throw new Error('User is not authenticated');
        }
        await updateProfile({email, first_name, last_name})
            .then(() => this.getData())
            .catch((error) => {
                throw error;
            }
         );
    }

    /**
     * @function updateAvatar
     * @description Метод обновления аватара пользователя на сервере.
     * @param {File} avatar аватар пользователя.
     * @returns {Promise<void>}
     */
    async updateAvatar({avatar}) {
        if (!this._isAuthenticated) {
            throw new Error('User is not authenticated');
        }
        await updateAvatar({avatar}).then((response) => {
            this.avatar = response.image;
        }
        ).catch((error) => {
            throw error;
        });
    }

    /**
     * @function update
     * @description Метод обновления данных пользователя.
     * @returns {Promise<void>}
     */
    async update() {
        await getProfile().then((response) => {
            this._isAuthenticated = true;
            this._parseData(response);
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
                this._parseData(response);
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
            this._resetData();
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
                this._parseData(response);
                return this.getData();
            }).catch((error) => {
                throw error;
            });
    }

    /**
     * @function _parseData
     * @description Метод парсинга данных пользователя, полученных с сервера.
     * @param {object} data объект с данными пользователя, полученными с сервера.
     * @private
     */
    _parseData(data) {
        this.email = data.email;
        this.firstName = data.first_name;
        this.lastName = data.last_name;
        this.avatar = data.image;
    }

    /**
     * @function _resetData
     * @description Метод сброса данных пользователя в начальное состояние.
     * @private
     */
    _resetData() {
        this._isAuthenticated = false;
        this.email = null;
        this.firstName = null;
        this.lastName = null;
        this.avatar = null;
    }
}

export default new User();