export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * @interface MakeRequestInterface
 * @description Интерфейс для параметров функции makeRequest.
 */
interface MakeRequestInterface {
    /**
     * @property {string} url URL-адрес
     */
    url: string;
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
    /**
     * @property {RequestInit} options Дополнительные опции запроса
     */
    options?: RequestInit | null;
}

/**
 * @function makeRequest
 * @description Функция для выполнения запроса к бэкенду.
 * @param {string} url URL-адрес
 * @param {string} method HTTP-метод (GET, POST и т.д.)
 * @param {Record<string, string|number>} body Тело запроса
 * @param {Record<string, string>} query Query параметры
 * @param {Record<string, File>} files Файлы для загрузки
 * @param {RequestInit} options Дополнительные опции запроса
 * @returns {Promise<*>} Ответ от сервера
 */
export const makeRequest = async ({url, method='GET', body={}, query={}, files={}, options=null}: MakeRequestInterface) => {

    const totalOptions = options ? options : createRequestOptions(method);
    if (!totalOptions) {
        return null;
    }

    if (shouldUseFormData(files)) {
        totalOptions.body = createFormData(body, files);
    } else if (isObjectFilled(body)) {
        setJsonContentType(totalOptions);
        totalOptions.body = JSON.stringify(body);
    }

    let finalUrl = url;
    if (isObjectFilled(query)) {
        const queryString = convertQueryToString(query);
        finalUrl += '?' + queryString;
    }

    return await fetchAndHandleResponse(finalUrl, totalOptions);
}

/**
 *
 * @function fetchAndHandleResponse
 * @description Функция для выполнения запроса к бэкенду.
 * @param {string} url URL-адрес
 * @param {RequestInit} options Параметры запроса
 * @returns {Promise<*>} Ответ от сервера
 */
const fetchAndHandleResponse = async(url: string, options: RequestInit) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error);
    }
    return await response.json();
}

/**
 * @function setJsonContentType
 * @description Функция для установки заголовка Content-Type в JSON.
 * @param {RequestInit} options Параметры запроса
 */
const setJsonContentType = (options: RequestInit) => {
    options.headers = {
        ...options.headers,
        'Content-Type': 'application/json'
    };
}

/**
 * @function createFormData
 * @param {Record<string, string|number>} body Тело запроса
 * @param {Record<string, File>} files Файлы для загрузки
 * @returns {FormData} FormData объект
 */
const createFormData = (body: Record<string, string|number>, files: Record<string, File>): FormData => {
    const formData = new FormData();

    Object.keys(body).forEach(key => {
        if (typeof body[key] === 'string') {
            formData.append(key, body[key]);
        }
    });

    Object.keys(files).forEach(key => {
        formData.append(key, files[key]);
    });

    return formData;
}

/**
 * @function createRequestOptions
 * @description Функция для создания параметров запроса.
 * @param {HttpMethod} method HTTP-метод (GET, POST и т.д.)
 * @returns {RequestInit} Параметры запроса
 */
export const createRequestOptions = (method: HttpMethod): RequestInit => ({
    headers: {},
    method,
});

/**
 * @function shouldUseFormData
 * @description Функция для проверки, нужно ли использовать FormData.
 * @param {object} files Файлы для загрузки
 * @returns {boolean} true, если нужно использовать FormData, иначе false
 */
const shouldUseFormData = (files: object): boolean => files && Object.keys(files).length > 0;

/**
 * @function isObjectFilled
 * @description Функция для проверки наличия элементов в объекье
 * @param {object} body Тело запроса
 * @returns {boolean} true, если нужно использовать JSON, иначе false
 */
const isObjectFilled = (body: object): boolean => body && Object.keys(body).length > 0;

const convertQueryToString = function(object: Record<string, string>): string {
    let queryParams = '';
    Object.keys(object).forEach((key: string) => {
        queryParams += `${key}=${object[key]}&`;
    });

    if (queryParams.endsWith('&')) {
        queryParams = queryParams.slice(0, -1);
    }

    return queryParams;
}