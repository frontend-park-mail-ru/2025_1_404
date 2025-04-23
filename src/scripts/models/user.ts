
import {
    LoginInterface, RegisterAccountInterface, UpdateAvatarInterface, UpdateProfileInterface, UserResponseInterface,
    getProfile,
    login,
    logout,
    registerAccount,
    removeAvatar,
    updateAvatar, updateCSRF,
    updateProfile,
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
    private isAuthenticatedVal: boolean;
    private isLoadedVal: boolean;

    private userData: UserDataInterface = {};

    /**
     * @description Конструктор класса.
     */
    constructor() {
        this.isAuthenticatedVal = false;
        this.isLoadedVal = false;
    }

    /**
     * @function isLoaded
     * @description Метод получения статуса загрузки данных пользователя.
     * @returns {boolean} статус загрузки данных пользователя.
     */
    isLoaded() {
        return this.isLoadedVal;
    }

    /**
     * @function isAuthenticated
     * @description Метод получения статуса авторизации пользователя.
     * @returns {boolean} статус авторизации пользователя.
     */
    isAuthenticated() {
        return this.isAuthenticatedVal;
    }

    /**
     * @function getData
     * @description Метод получения данных пользователя.
     * @returns {*} данные пользователя.
     */
    getData(): UserDataInterface | null {
        if (!this.isAuthenticatedVal) {
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
        if (!this.isAuthenticatedVal) {
            throw new Error('User is not authenticated');
        }
        await updateProfile({email, first_name, last_name})
            .then((response) => {
                this.parseData(response);
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
        if (!this.isAuthenticatedVal) {
            throw new Error('User is not authenticated');
        }
        await updateAvatar({avatar}).then((response) => {
            this.parseData(response);
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
        if (!this.isAuthenticatedVal) {
            throw new Error('User is not authenticated');
        }
        await removeAvatar().then((response) => {
            this.parseData(response);
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
            this.isAuthenticatedVal = true;
            this.parseData(userResponse);
            return this.getData();
        }).catch((error) => {
            throw error;
        }).finally(() => {
            this.isLoadedVal = true;
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
                this.isAuthenticatedVal = true;
                this.parseData(userResponse);
                updateCSRF();
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
            this.resetData();
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
                this.isAuthenticatedVal = true;
                this.parseData(response);
                updateCSRF();
                return this.getData();
            }).catch((error) => {
                throw error;
            });
    }

    /**
     * @function parseData
     * @description Метод парсинга данных пользователя, полученных с сервера.
     * @param {UserResponseInterface} data объект с данными пользователя, полученными с сервера.
     * @private
     */
    private parseData(data: UserResponseInterface) {
        this.userData.id = data.id;
        this.userData.email = data.email;
        this.userData.firstName = data.first_name;
        this.userData.lastName = data.last_name;
        this.userData.avatar = data.image;
    }

    /**
     * @function resetData
     * @description Метод сброса данных пользователя в начальное состояние.
     * @private
     */
    private resetData() {
        this.isAuthenticatedVal = false;
        this.userData.id = null;
        this.userData.email = null;
        this.userData.firstName = null;
        this.userData.lastName = null;
        this.userData.avatar = null;
    }
}

export default new User();