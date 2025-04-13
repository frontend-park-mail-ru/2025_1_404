
const BACKEND_URL = 'http://localhost:8001/api/v1';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

let csrfToken: string | undefined;

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
    body?: Record<string, string|number>;
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
 * @interface UserResponseInterface
 * @description Интерфейс для ответа от сервера с данными пользователя.
 */
export interface UserResponseInterface {
    /**
     * @property {number} id ID пользователя.
     */
    id: number;
    /**
     * @property {string} email Email пользователя.
     */
    email: string;
    /**
     * @property {string} first_name Имя пользователя.
     */
    first_name: string;
    /**
     * @property {string} last_name Фамилия пользователя.
     */
    last_name: string;
    /**
     * @property {string} image Аватар пользователя.
     */
    image: string;
}

export const updateCSRF = async () => {
    await makeRequest({
        method: 'GET',
        endpoint: '/users/csrf'
    }).then((data) => {
        csrfToken = data.csrf_token;
    })
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
    if (csrfToken) {
        options.headers = {
            ...options.headers,
            'X-CSRF-Token': csrfToken
        }
    }
    if (files && Object.keys(files).length > 0) {
        const formData = new FormData();
        for (const key of Object.keys(body)) {
            if (typeof body[key] === 'string') {
                formData.append(key, body[key]);
            }
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
export const getOffers = async() => await makeRequest({
    endpoint: '/offers',
    method: 'GET',
});

/**
 * @function searchOffers
 * @description Функция для поиска предложений по фильтрам.
 * @param filters
 */
export const searchOffers = async (filters: Record<string, string>) => await makeRequest({
    endpoint: '/offers',
    method: 'GET',
    query: _fromObjectToQuery(filters)
})

/**
 * @interface RegisterAccountInterface
 * @description Интерфейс для регистрации аккаунта.
 */
export interface RegisterAccountInterface {
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
export interface UpdateProfileInterface {
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
export interface UpdateAvatarInterface {
    /**
     * @property {File} avatar Файл аватара
     */
    avatar: File;
}

/**
 * @function updateAvatar
 * @description Функция для обновления аватара пользователя.
 * @param {File} avatar Файл аватара
 */
export const updateAvatar = async ({avatar}: UpdateAvatarInterface) => await makeRequest({
    endpoint: '/users/image',
    method: 'PUT',
    files: {avatar}
});

/**
 * @function removeAvatar
 * @description Функция для удаления аватара пользователя.
 */
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

/**
 * @function getOfferById
 * @description Функция для получения объявления по id.
 * @param {number} id ID объявления
 * @returns {Promise<null>} Ответ от сервера
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getOfferById =  async (id: number) => await makeRequest({
    endpoint: '/offers/'.concat(id.toString()),
    method: 'GET'
});

/**
 * @interface CreateOfferInterface
 * @description Интерфейс для создания объявления.
 */
export interface CreateOfferInterface {
    /**
     * @property {number} id ID объявления
     */
    id?: number;
    /**
     * @property {string} propertyType Тип недвижимости
     */
    propertyType: number;
    /**
     * @property {string} offerType Тип предложения
     */
    offerType: number;
    /**
     * @property {string} purchaseType Тип покупки
     */
    purchaseType: number;
    /**
     * @property {string} rentType Тип аренды
     */
    rentType: number;
    /**
     * @property {string} address Адрес
     */
    address: string;
    /**
     * @property {string} metroLine Линия метро
     */
    metroLine: string;
    /**
     * @property {string} metroStation Станция метро
     */
    metroStation: string;
    /**
     * @property {number} floor Этаж
     */
    floor: number;
    /**
     * @property {number} totalFloors Всего этажей
     */
    totalFloors: number;
    /**
     * @property {number} area Площадь
     */
    area: number;
    /**
     * @property {number} rooms Количество комнат
     */
    rooms: number;
    /**
     * @property {number} price Цена
     */
    price: number;
    /**
     * @property {string} description Описание
     */
    description: string;
    /**
     * @property {number} flat Номер квартиры
     */
    flat: number;
    /**
     * @property {string} ceilingHeight Высота потолков
     */
    ceilingHeight: number;
    /**
     * @property {number} renovation Ремонт
     */
    renovation: number;
    /**
     * @property {number} complexId ID ЖК
     */
    complexId: number;
    /**
     * @property {Array<File>} images Изображения
     */
    images: Array<File>;
}

export const createOffer = async ({...args}: CreateOfferInterface) => await makeRequest({
    endpoint: '/offers',
    method: 'POST',
    body: {
        price: args.price,
        description: args.description,
        floor: args.floor,
        total_floors: args.totalFloors,
        rooms: args.rooms,
        address: args.address,
        flat: args.flat,
        area: args.area,
        ceiling_height: args.ceilingHeight,
        offer_type_id: args.offerType,
        rent_type_id: args.rentType,
        purchase_type_id: args.purchaseType,
        property_type_id: args.propertyType,
        // metro_line: args.metroLine,
        // metro_station_id: args.metroStation,
        renovation_id: args.renovation,
        complex_id: args.complexId,
    }
});

export const updateOffer = async ({...args}: CreateOfferInterface) => await makeRequest({
    endpoint: `/offers/${args.id}`,
    method: 'PUT',
    body: {
        price: args.price,
        description: args.description,
        floor: args.floor,
        total_floors: args.totalFloors,
        rooms: args.rooms,
        address: args.address,
        flat: args.flat,
        area: args.area,
        ceiling_height: args.ceilingHeight,
        offer_type_id: args.offerType,
        rent_type_id: args.rentType,
        purchase_type_id: args.purchaseType,
        property_type_id: args.propertyType,
        // metro_line: args.metroLine,
        // metro_station_id: args.metroStation,
        renovation_id: args.renovation
    }
})

export const deleteOffer = async (id: number) => await makeRequest({
    endpoint: `/offers/${id}`,
    method: 'DELETE'
});

/**
 * @interface UploadOfferImageInterface
 * @description Интерфейс для загрузки изображения.
 */
interface UploadOfferImageInterface {
    /**
     * @property {number} offerId ID объявления
     */
    offerId: number;
    /**
     * @property {File} image Файл изображения
     */
    image: File;
}

/**
 * @function uploadOfferImage
 * @description Функция для загрузки изображения.
 * @param {number} offerId ID объявления
 * @param {File} image Файл изображения
 */
export const uploadOfferImage = async({offerId, image}: UploadOfferImageInterface) => makeRequest({
    endpoint: `/offers/${offerId}/image`,
    method: 'POST',
    files: {
        'image': image
    }
});

export const deleteOfferImage = async (imageId: number) => makeRequest({
    endpoint: `/images/${imageId}`,
    method: 'DELETE'
})

export const publishOffer = async (offerId: number) => makeRequest({
    endpoint: `/offers/${offerId}/publish`,
    method: 'POST'
})

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
export interface LoginInterface {
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

const _fromObjectToQuery = function(object: Record<string, string>): string {
    let queryParams = '';
    Object.keys(object).forEach((key: string) => {
        queryParams += `${key}=${object[key]}&`;
    });

    if (queryParams.endsWith('&')) {
        queryParams = queryParams.slice(0, -1);
    }

    return queryParams;
}
