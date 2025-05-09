import {HttpMethod, createRequestOptions, makeRequest} from "./httpUtil.ts";
import OfferMock from "../models/offerMock.ts";
import User from "../models/user.ts";

const ApiType = {
    AUTH: import.meta.env.VITE_BACKEND_AUTH_URL,
    OFFER: import.meta.env.VITE_BACKEND_OFFER_URL,
    ZHK: import.meta.env.VITE_BACKEND_ZHK_URL,
    AI: import.meta.env.VITE_BACKEND_AI_URL
}

let csrfToken: string | null = null;

/**
 * @interface makeAPIRequestInterface
 * @description Интерфейс для параметров функции makeAPIRequest.
 */
interface makeAPIRequestInterface {
    apiUrl: string;
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
    query?: Record<string, string>;
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
    await makeAPIRequest({
        apiUrl: ApiType.AUTH,
        method: 'GET',
        endpoint: '/users/csrf'
    }).then((data) => {
        csrfToken = data.csrf_token;
    })
}

/**
 * @function makeAPIRequest
 * @description Функция для выполнения запроса к бэкенду.
 * @param {string} endpoint URL-адрес API
 * @param {string} method HTTP-метод (GET, POST и т.д.)
 * @param {Record<string, string|number>} body Тело запроса
 * @param {Record<string, string>} query Query параметры
 * @param {Record<string, File>} files Файлы для загрузки
 * @returns {Promise<*>} Ответ от сервера
 */
const makeAPIRequest = async ({apiUrl, endpoint, method='GET', body={}, query={}, files={}}: makeAPIRequestInterface) => {
    const options = createRequestOptions(method);
    options.mode = 'cors';
    options.credentials = 'include';
    addCsrfToken(options);
    /* Для будущей фишки бэка с передачей requestId с фронта
    addRequestId(options);*/

    return await makeRequest({
        url: `${apiUrl}${endpoint}`,
        method,
        body,
        query,
        files,
        options 
    })
}

/**
 * @function addCsrfToken
 * @description Функция для добавления CSRF-токена в заголовки запроса.
 * @param {RequestInit} options Параметры запроса
 */
const addCsrfToken = (options: RequestInit) => {
    if (csrfToken) {
        options.headers = {
            ...options.headers,
            'X-CSRF-Token': csrfToken
        }
    }
}

const addRequestId = (options: RequestInit) => {
    const requestId = crypto.randomUUID();
    options.headers = {
        ...options.headers,
        'X-request-id': requestId
    }
}

/**
 * @function getOffers
 * @description Функция для получения списка предложений.
 * @returns {Promise<*>} Ответ от сервера
 */
export const getOffers = async() => await makeAPIRequest({
    apiUrl: ApiType.OFFER,
    endpoint: '/offers',
    method: 'GET'
});

/**
 * @function searchOffers
 * @description Функция для поиска предложений по фильтрам.
 * @param {Record<string, string>} filters Фильтры для поиска
 * @returns {Promise<*>} Ответ от сервера
 */
export const searchOffers = async (filters: Record<string, string>) => await makeAPIRequest({
    apiUrl: ApiType.OFFER,
    endpoint: '/offers',
    method: 'GET',
    query: filters
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
export const registerAccount = async ({email, first_name, last_name,  password}: RegisterAccountInterface) => await makeAPIRequest({
    apiUrl: ApiType.AUTH,
    endpoint: '/auth/register',
    method: 'POST',
    body: {email, first_name, last_name, password}
});


/**
 * @function getProfile
 * @description Функция для получения профиля.
 * @returns {Promise<*>} Ответ от сервера
 */
export const getProfile = async () => await makeAPIRequest({
    apiUrl: ApiType.AUTH,
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
export const updateProfile = async ({email, first_name, last_name}: UpdateProfileInterface) => await makeAPIRequest({
    apiUrl: ApiType.AUTH,
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
 * @returns {Promise<*>} Ответ от сервера
 */
export const updateAvatar = async ({avatar}: UpdateAvatarInterface) => await makeAPIRequest({
    apiUrl: ApiType.AUTH,
    endpoint: '/users/image',
    method: 'PUT',
    files: {avatar}
});

/**
 * @function removeAvatar
 * @description Функция для удаления аватара пользователя.
 * @returns {Promise<*>} Ответ от сервера
 */
export const removeAvatar = async () => await makeAPIRequest({
    apiUrl: ApiType.AUTH,
    endpoint: '/users/image',
    method: 'DELETE'
});

/**
 * @function getOfferById
 * @description Функция для получения объявления по id.
 * @param {number} id ID объявления
 * @returns {Promise<null>} Ответ от сервера
 */
export const getOfferById =  async (id: number) => await makeAPIRequest({
    apiUrl: ApiType.OFFER,
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

export const createOffer = async ({...args}: CreateOfferInterface) => await makeAPIRequest({
    apiUrl: ApiType.OFFER,
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
        renovation_id: args.renovation,
        complex_id: args.complexId,
    }
});

export const updateOffer = async ({...args}: CreateOfferInterface) => await makeAPIRequest({
    apiUrl: ApiType.OFFER,
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
        renovation_id: args.renovation
    }
})

export const deleteOffer = async (id: number) => await makeAPIRequest({
    apiUrl: ApiType.OFFER,
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
 * @returns {Promise<*>} Ответ от сервера
 */
export const uploadOfferImage = async({offerId, image}: UploadOfferImageInterface) => await makeAPIRequest({
    apiUrl: ApiType.OFFER,
    endpoint: `/offers/${offerId}/image`,
    method: 'POST',
    files: {
        image
    }
});

export const deleteOfferImage = async (imageId: number) => await makeAPIRequest({
    apiUrl: ApiType.OFFER,
    endpoint: `/images/${imageId}`,
    method: 'DELETE'
})

export const publishOffer = async (offerId: number) => await makeAPIRequest({
    apiUrl: ApiType.OFFER,
    endpoint: `/offers/${offerId}/publish`,
    method: 'POST'
})

/**
 * @function getHousingComplex
 * @description Функция для получения информации о ЖК.
 * @param {number} id ID ЖК
 * @returns {Promise<null>} Ответ от сервера
 */
export const getHousingComplex = async (id: number) => await makeAPIRequest({
    apiUrl: ApiType.ZHK,
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
export const login = async ({email, password}: LoginInterface) => await makeAPIRequest({
    apiUrl: ApiType.AUTH,
    endpoint: '/auth/login',
    method: 'POST',
    body: {email, password}
});

/**
 * @function logout
 * @description Функция для выхода из аккаунта.
 * @returns {Promise<boolean>} Ответ от сервера
 */
export const logout = async () => await makeAPIRequest({
    apiUrl: ApiType.AUTH,
    endpoint: '/auth/logout',
    method: 'POST'
});

export const favourite = async(offerId: number) => {
    if (!User.isAuthenticated()) {
        return {'status': false};
    }
    const userData = User.getData();
    if (!userData || userData.id === undefined || userData.id === null) {
        return {'status': false};
    }
    return OfferMock.toggleFavorite(userData.id, offerId);
}

interface EvaluateOfferInterface {
    offerType: string;
    metroStation?: string;
    rentType?: string;
    purchaseType: string;
    propertyType: string;
    renovation: string;
    address: string;
    complex?: string;
    area: number;
    floor: number;
    totalFloors: number;
    rooms: number;
    ceilingHeight: number;
}

export const evaluateOffer = (offer: EvaluateOfferInterface)=> {
    return makeAPIRequest({
        apiUrl: ApiType.AI,
        endpoint: '/evaluateOffer',
        method: 'POST',
        body: {
            offer_type: offer.offerType,
            metro_station: offer.metroStation || "",
            rent_type: offer.rentType || "",
            purchase_type: offer.purchaseType,
            property_type: offer.propertyType,
            renovation: offer.renovation,
            address: offer.address,
            complex: offer.complex || "",
            area: offer.area,
            floor: offer.floor,
            total_floors: offer.totalFloors,
            rooms: offer.rooms,
            ceiling_height: offer.ceilingHeight,
        }
    });
}

export const likeOfer = (offerId: number) => {
    return makeAPIRequest({
        apiUrl: ApiType.OFFER,
        endpoint: `/offers/like`,
        method: 'POST',
        body: {
            offer_id: offerId
        }
    });
}