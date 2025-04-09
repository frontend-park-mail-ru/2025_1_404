
const BACKEND_URL = 'http://localhost:8001/api/v1';

type HttpMethod = 'GET' | 'POST' | 'PUT';

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
 * @param {object} files Файлы для загрузки
 * @returns {Promise<*>} Ответ от сервера
 */
const makeRequest = async ({endpoint, method='GET', body={}, files={}}: MakeRequestInterface) => {
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
 * @returns {Promise<*>} Ответ от сервера
 */
export const getOffers = async() => await makeRequest({
    endpoint: '/offers',
    method: 'GET'
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

const zhk = {
    "contacts": {
        "developer": "ООО 'Строитель'",
        "phone": "+7(123)-456-78-90",
    },
    "description": "Есть такие места, куда всегда хочется возвращаться и где с первого мгновения накрывает мысль, от которой становится тепло внутри: «Я дома». Таким местом силы для вас станет квартал «Цветочные Поляны» в Новой Москве. Гуляйте с семьей по собственному лесопарку или устраивайте с детьми веселые игры в плейхабе. Заводите новых друзей среди соседей, ведь многие квартиры уже нашли своих хозяев. Не правда ли, приятнее выпить капучино в кафе на первом этаже дома или провести тренировку во дворе в компании близких по духу людей?",    
    "general": {
        "address": "Москва, д. Староселье, деревня Староселье, к2",
        "appartments": [
        {   
            "highestPrice": 5_321_123,
            "lowestPrice": 3_500_000,
            "minSquare": 22.2,
            "offers": 8,
            "rooms": 1,
        },
        {
            "highestPrice": 10_600_000,
            "lowestPrice": 6_500_500,
            "minSquare": 43.6,
            "offers": 1,
            "rooms": 3,
        },
        {
            "highestPrice": 25_600_000,
            "lowestPrice": 18_000_000,
            "minSquare": 57.5,
            "offers": 10,
            "rooms": 4,
        },
    ],
    "characteristics": {
        "buildings": "4 корпуса",
        "ceilingHeight": {
            "highestHeight": 3.2,
            "lowestHeight": 2.5,
        },
        "class": "Комфорт",
        "decoration": "Без отделки, Предчистовая",
        "floors": {
            "highestFloor": 15,
            "lowestFloor": 10,
        },
        "square": {
            "highestSquare": 88.8,
            "lowestSquare": 22.2,
        },

    },
    },
    "header": {
        "highestPrice": 19_213_123,
        "images": [
            'https://images.cdn-cian.ru/images/kavkazskiy-bulvar-51-moskva-jk-2426961588-6.jpg',
            'https://images.cdn-cian.ru/images/kavkazskiy-bulvar-51-moskva-jk-2426961605-6.jpg',
            'https://images.cdn-cian.ru/images/kavkazskiy-bulvar-51-moskva-jk-2426961600-6.jpg'
        ],
        "imagesSize": 3,
        "lowestPrice": 5_950_123,
        "name": "ЖК Цветочные поляны",
    },
    "reviews": {
        "items": [
            {
                "avatar": "https://www.cian.ru/api/get-avatar/?i=24417787&t=2&p=2&timestamp=1648544916",
                "name": "Анна Сергеева",
                "rating" : 5,
                "text": "Отличный жилой комплекс! Просторные квартиры, удобная планировка, тихий район. Рядом много магазинов и кафе. Очень довольна покупкой!",

            },
            {
                "avatar": "https://www.cian.ru/api/get-avatar/?i=84824&t=2&p=2&timestamp=1679386315",
                "name": "Петр Петров",
                "rating" : 5,
                "text": "Живу здесь уже полгода – всё супер! Хорошая звукоизоляция, дружелюбные соседи, а двор просто замечательный. Рекомендую!",
            },
            {
                "avatar": "https://www.cian.ru/api/get-avatar/?i=126875&t=2&p=1&timestamp=1558365314",
                "name": "Максим Максимов",
                "rating" : 4,
                "text": "Все нравится, но хотелось бы побольше парковочных мест. В остальном всё отлично – современный дизайн, светлые квартиры, хороший ремонт.",
            },
            {
                "avatar": "https://www.cian.ru/api/get-avatar/?i=33469618&t=2&p=1&timestamp=1648723886",
                "name": "Сергей Смирнов",
                "rating" : 3,
                "text": "ЖК неплохой, но ничего выдающегося. Обычный комфорт-класс. Есть плюсы – близость к метро, нормальные соседи. Но цена могла бы быть ниже.",
            },
            {
                "avatar": "https://www.cian.ru/api/get-avatar/?i=138894&t=2&p=1&timestamp=1558709382",
                "name": "Владимир Владимиров",
                "rating" : 2,
                "text": "Разочарован. Дома выглядят красиво, но качество строительства оставляет желать лучшего. Постоянные проблемы с лифтами, сырость в подвалах, плохая управляющая компания.",
            },
        ],
        "quantity": 5,
        "totalRating": 3.8,
  
    },
    
    
}

/**
 * @function getHousingComplex
 * @description Функция для получения информации о ЖК.
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
