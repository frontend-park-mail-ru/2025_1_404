
const BACKEND_URL = 'http://localhost:8001/api/v1';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * @interface MakeRequestInterface
 * @description Интерфейс для параметров функции makeRequest.
 */
interface MakeRequestInterface {
    /**
     * @property {string} endpoint URL-адрес API
     */
    endpoint: string;
    /**
     * @property {string} method HTTP-метод (GET, POST, PUT и т.д.)
     */
    method?: HttpMethod;
    /**
     * @property {object} body Тело запроса
     */
    body?: Record<string, string>;
    /**
     * @property {string} query Query параметры
     */
    query?: string;
    /**
     * @property {object} files Файлы для загрузки
     */
    files?: Record<string, File>;
}

/**
 * @function makeRequest
 * @description Функция для выполнения запроса к бэкенду.
 * @param {string} endpoint URL-адрес API
 * @param {string} method HTTP-метод (GET, POST и т.д.)
 * @param {object} body Тело запроса
 * @param {string} query Query параметры
 * @param {object} files Файлы для загрузки
 * @returns {Promise<*>} Ответ от сервера
 */
const makeRequest = async ({endpoint, method='GET', body={}, query='', files={}}: MakeRequestInterface) => {
    const options: RequestInit = {
        credentials: 'include',
        headers: {},
        method,
        mode: 'cors',
    };
    if (files && Object.keys(files).length > 0) {
        const formData = new FormData();
        for (const key of Object.keys(body)) {
            formData.append(key, body[key]);
        }
        for (const key of Object.keys(files)) {
            formData.append(key, files[key]);
        }
        options.body = formData;
    }
    else if (body && Object.keys(body).length > 0) {
        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json'
        }
        options.body = JSON.stringify(body);
    }
    let endpointUrl = endpoint;
    if (query !== '') {
       endpointUrl = endpointUrl + '?' + query;
    }

    const response = await fetch(`${BACKEND_URL}${endpointUrl}`, options);
    if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error);
    }
    return await response.json();
}

/**
 * @function getOffers
 * @description Функция для получения списка предложений.
 * @returns {Promise<*>} Ответ от сервера
 */
export const getOffers = async(queryParams: Object={}) => await makeRequest({
    endpoint: '/offers',
    method: 'GET',
    query: _fromObjectToQuery(queryParams as Record<string, Set<string> | string>),
});

/**
 * @interface RegisterAccountInterface
 * @description Интерфейс для регистрации аккаунта.
 */
interface RegisterAccountInterface {
    /**
     * @property {string} email Электронная почта
     */
    email: string;
    /**
     * @property {string} first_name Имя
     */
    first_name: string;
    /**
     * @property {string} last_name Фамилия
     */
    last_name: string;
    /**
     * @property {string} password Пароль
     */
    password: string;
}

/**
 * @function registerAccount
 * @description Функция для регистрации аккаунта.
 * @param {string} email Электронная почта
 * @param {string} first_name Имя
 * @param {string} last_name Фамилия
 * @param {string} password Пароль
 * @returns {Promise<*>} Ответ от сервера
 */
export const registerAccount = async ({email, first_name, last_name,  password}: RegisterAccountInterface) => await makeRequest({
    endpoint: '/auth/register',
    method: 'POST',
    body: {email, first_name, last_name, password}
});


/**
 * @function getProfile
 * @description Функция для получения профиля.
 * @returns {Promise<*>} Ответ от сервера
 */
export const getProfile = async () => await makeRequest({
    endpoint: '/auth/me',
    method: 'POST'
});

/**
 * @interface UpdateProfileInterface
 * @description Интерфейс для обновления профиля.
 */
interface UpdateProfileInterface {
    /**
     * @property {string} email Электронная почта
     */
    email: string;
    /**
     * @property {string} first_name Имя
     */
    first_name: string;
    /**
     * @property {string} last_name Фамилия
     */
    last_name: string;
}

/**
 * @function updateProfile
 * @description Функция для обновления профиля.
 * @param {string} email Электронная почта
 * @param {string} first_name Имя
 * @param {string} last_name Фамилия
 * @returns {Promise<*>} Ответ от сервера
 */
export const updateProfile = async ({email, first_name, last_name}: UpdateProfileInterface) => await makeRequest({
    endpoint: '/users/update',
    method: 'PUT',
    body: {email, first_name, last_name}
});

/**
 * @interface UpdateAvatarInterface
 * @description Интерфейс для обновления аватара пользователя.
 */
interface UpdateAvatarInterface {
    /**
     * @property {File} avatar Файл аватара
     */
    avatar: File;
}

export const updateAvatar = async ({avatar}: UpdateAvatarInterface) => await makeRequest({
    endpoint: '/users/image',
    method: 'PUT',
    files: {avatar}
});

export const removeAvatar = async () => await makeRequest({
    endpoint: '/users/image',
    method: 'DELETE'
});

/**
 * @function getZhkPhone
 * @description Функция для получения телефона застройщика.
 * @returns {Promise<{phone: string}>} Ответ от сервера
 */
export const getZhkPhone = async () => await ({"phone": '+7(123)456-78-90'})

/**
 * @function getZhkLine
 * @description Функция для получения линии метро.
 * @returns {Promise<{metroLine: string}>} Ответ от сервера
 */
export const getZhkLine = async () => await ({"metroLine": 'Некрасовская'})

const offer = {
    ID:           1,
    Seller:       "Иван Петров",
    PropertyType: "квартира",
    OfferType:    "продажа",
    PurchaseType: "вторичка",
    RentType:     "",
    Address:      "ул. Ленина, д.10",
    MetroLine:    "Сокольническая",
    MetroStation: "Охотный ряд",
    Floor:        3,
    TotalFloors:  10,
    Area:         60.5,
    Rooms:        2,
    Price:        10000000,
    Photos:       [
        "https://images.cdn-cian.ru/images/kvartira-moskva-shmitovskiy-proezd-2239195740-1.jpg",
        "https://images.cdn-cian.ru/images/67/099/031/kvartira-putilkovo-shodnenskaya-ulica-1309907645-1.jpg",
        "https://images.cdn-cian.ru/images/67/099/031/kvartira-putilkovo-shodnenskaya-ulica-1309907625-1.jpg",
        "https://images.cdn-cian.ru/images/kvartira-moskva-shmitovskiy-proezd-2239195740-1.jpg",
        "https://images.cdn-cian.ru/images/67/099/031/kvartira-putilkovo-shodnenskaya-ulica-1309907645-1.jpg",
        "https://images.cdn-cian.ru/images/67/099/031/kvartira-putilkovo-shodnenskaya-ulica-1309907625-1.jpg"],
    Description:  "Уютная квартира с двумя спальными комнатами, панорамными окнами и балконами. 'Фрунзенская набережная' - неповторимый элитный клубный город-парк в престижном и желанном месте на Фрунзенской набережной, где нет...",
}

/**
 * @function getOfferById
 * @description Функция для получения объявления по id.
 * @param {number} id ID объявления
 * @returns {Promise<null>} Ответ от сервера
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getOfferById =  async (id: number) => await offer;

/**
 * @function getHousingComplex
 * @description Функция для получения информации о ЖК.
 * @param {number} id ID ЖК
 * @returns {Promise<null>} Ответ от сервера
 */
export const getHousingComplex = async (id: number) => await makeRequest({
    endpoint: '/zhk/'.concat(id.toString()),
    method: 'GET'
});

/**
 * @interface LoginInterface
 * @description Интерфейс для входа в аккаунт.
 */
interface LoginInterface {
    /**
     * @property {string} email Электронная почта
     */
    email: string;
    /**
     * @property {string} password Пароль
     */
    password: string;
}

/**
 * @function login
 * @description Функция для входа в аккаунт.
 * @param {string} email Электронная почта
 * @param {string} password Пароль
 * @returns {Promise<*>} Ответ от сервера
 */
export const login = async ({email, password}: LoginInterface) => await makeRequest({
    endpoint: '/auth/login',
    method: 'POST',
    body: {email, password}
});

/**
 * @function logout
 * @description Функция для выхода из аккаунта.
 * @returns {Promise<boolean>} Ответ от сервера
 */
export const logout = async () => await makeRequest({
    endpoint: '/auth/logout',
    method: 'POST'
});

const _fromObjectToQuery = function(object: Record<string, Set<string> | string>): string {
    let queryParams = '';
    Object.keys(object).forEach((key: string) => {
        if (object[key] instanceof Set) {
            queryParams += `${key}=`;
            object[key].forEach((value: string) => {
                queryParams += `${value},`;
            });
            queryParams = queryParams.slice(0, -1);
            queryParams += '&';
        } else if (typeof object[key] === 'string') {
            queryParams += `${key}=${object[key]}&`;
        }
    });

    if (queryParams.endsWith('&')) {
        queryParams = queryParams.slice(0, -1);
    }

    return queryParams;
}
