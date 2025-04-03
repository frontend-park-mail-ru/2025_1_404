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

export const getZhkPhone = async () => await ({"phone": '+7(123)456-78-90'})


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
    Photos:       "https://images.cdn-cian.ru/images/kvartira-moskva-shmitovskiy-proezd-2239195740-1.jpg",
    Description:  "Просторная квартира в центре города.",
}

/**
 * @function getOfferById
 * @description Функция для получения объявления по id.
 * @returns {Promise<null>}
 */
export const getOfferById =  async () => await offer;

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
 * @returns {Promise<null>}
 */
export const getHousingComplex = async () => await zhk;



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
