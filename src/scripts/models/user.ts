
import {
    getProfile,
    login, LoginInterface,
    logout,
    registerAccount, RegisterAccountInterface,
    removeAvatar,
    updateAvatar, UpdateAvatarInterface,
    updateProfile, UpdateProfileInterface, UserResponseInterface
} from "../util/apiUtil.ts";

/**
 * @interface UserDataInterface
 * @description Интерфейс для данных пользователя.
 */
export interface UserDataInterface {
    [key: string]: unknown;
    /**
     * @property {string} email Email пользователя.
     */
    id?: number | null;
    /**
     * @property {string} email Email пользователя.
     */
    email?: string | null;
    /**
     * @property {string} firstName Имя пользователя.
     */
    firstName?: string | null;
    /**
     * @property {string} lastName Фамилия пользователя.
     */
    lastName?: string | null;
    /**
     * @property {string} avatar Аватар пользователя.
     */
    avatar?: string | null;
}

/**
 * @class User
 * @description Модель пользователя.
 */
class User {
    private _isAuthenticated: boolean;
    private _isLoaded: boolean;

    private userData: UserDataInterface = {};

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
    getData(): UserDataInterface | null {
        if (!this._isAuthenticated) {
            return null;
        }
        return {...this.userData};
    }

    /**
     * @function updateProfile
     * @description Метод обновления данных пользователя на сервере.
     * @param {string} email email пользователя.
     * @param {string} first_name имя пользователя.
     * @param {string} last_name фамилия пользователя.
     * @returns {Promise<void>}
     */
    async updateProfile({email, first_name, last_name}: UpdateProfileInterface) {
        if (!this._isAuthenticated) {
            throw new Error('User is not authenticated');
        }
        await updateProfile({email, first_name, last_name})
            .then((response) => {
                this._parseData(response);
                this.getData();
            })
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
    async updateAvatar({avatar}: UpdateAvatarInterface) {
        if (!this._isAuthenticated) {
            throw new Error('User is not authenticated');
        }
        await updateAvatar({avatar}).then((response) => {
            this._parseData(response);
            return this.getData();
        }
        ).catch((error) => {
            throw error;
        });
    }

    /**
     * @function removeAvatar
     * @description Метод удаления аватара пользователя на сервере.
     */
    async removeAvatar() {
        if (!this._isAuthenticated) {
            throw new Error('User is not authenticated');
        }
        await removeAvatar().then((response) => {
            this._parseData(response);
            return this.getData();
        })
    }

    /**
     * @function update
     * @description Метод обновления данных пользователя.
     * @returns {Promise<void>}
     */
    async update() {
        await getProfile().then((response) => {
            if (!response) {
                return this.getData();
            }
            const userResponse = response as UserResponseInterface;
            this._isAuthenticated = true;
            this._parseData(userResponse);
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
    async login({email, password}: LoginInterface) {
        await login({email, password})
            .then((response) => {
                if (!response) {
                    return this.getData();
                }
                const userResponse = response as UserResponseInterface;
                this._isAuthenticated = true;
                this._parseData(userResponse);
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
    async register({email, password, first_name, last_name}: RegisterAccountInterface) {
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
     * @param {UserResponseInterface} data объект с данными пользователя, полученными с сервера.
     * @private
     */
    _parseData(data: UserResponseInterface) {
        this.userData.id = data.id;
        this.userData.email = data.email;
        this.userData.firstName = data.first_name;
        this.userData.lastName = data.last_name;
        this.userData.avatar = data.image;
    }

    /**
     * @function _resetData
     * @description Метод сброса данных пользователя в начальное состояние.
     * @private
     */
    _resetData() {
        this._isAuthenticated = false;
        this.userData.id = null;
        this.userData.email = null;
        this.userData.firstName = null;
        this.userData.lastName = null;
        this.userData.avatar = null;
    }
}

export default new User();