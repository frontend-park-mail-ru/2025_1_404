
const   EMPTY_LENGTH = 0,
        MIN_PASSWORD_LENGTH = 8;
      
/**
 * @function validateEmail
 * @description Функция для валидации почты.
 * @param {string} email Электронная почта
 * @returns {boolean} Результат валидации
 */
const validateEmail = function(email: string) {
    return String(email)
        .toLowerCase()
        .match(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/u
        );
}

/**
 * @function validateNickname
 * @description Функция для валидации имени/фамилии.
 * @param {string} name Имя/фамилия
 * @returns {boolean} Результат валидации
 */
const validateNickname = function(name: string) {
    return /^[A-Za-zА-Яа-яЁё-]+$/u.test(name);
}

/**
 * @function validatePassword
 * @description Функция для валидации пароля.
 * @param {string} password Пароль
 * @param {boolean} additionalChecks Дополнительные проверки
 * @returns {boolean} Результат валидации
 */
const validatePassword = function(password: string, additionalChecks=false) {
    if (additionalChecks) {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/u.test(password);
    }
    return String(password).length > EMPTY_LENGTH;
}

const validateDoubleNumeric = function(number: string) {
    const num = parseInt(number, 10);
    return num >= 1 && num <= 99;
}

const validateTripleNumeric = function(number: string) {
    const num = parseInt(number, 10);
    return num >= 1 && num <= 999;
}

const validateFlat = function(flatNumber: string) {
    return /^(?:[1-9][0-9]{0,3}|[1-9][0-9]{0,3}[A-Za-z])$/u.test(flatNumber);
}

const validateAddress = function(address: string) {
    return /^(?<city>[А-Яа-яЁё\s\-]+)[,\s]+(?<street>(улица|проспект|бульвар|переулок)\s+[А-Яа-яЁё\s\-]+)[,\s]+(?<houseNumber>\d+(\/\d+)?)$/u.test(address);
}

const validateNumeric = function(number: string) {
    return /^[1-9]\d*$/u.test(number);
}

/**
 * @interface ValidateFormInputInterface
 * @description Интерфейс для валидации формы.
 */
interface ValidateFormInputInterface {
    /**
     * @property {string} value Значение поля ввода
     */
    value: string;
    /**
     * @property {string} name Имя поля ввода
     */
    name: string;
}

/**
 * @function validateFormInput
 * @description Функция для валидации input.
 * @param {ValidateFormInputInterface} param Объект с параметрами
 * @param {string} param.value Значение поля ввода
 * @param {string} param.name Имя поля ввода
 * @param {boolean} additionalDetails Дополнительные проверки
 * @param {boolean} required обязательное поле
 * @returns {string} Ошибка валидации
 */
export const validateFormInput = function ({value, name:valueName}: ValidateFormInputInterface, additionalDetails=false, required=true) {
    const valueLength = value.length;
    if (valueLength === EMPTY_LENGTH) {
        if (required) {
            return 'Это поле обязательное';
        }
        return '';
    }
    let password = '';
    const passwordDocument = document.getElementById('registerPassword') as HTMLInputElement | null;
    if (passwordDocument) {
        password = passwordDocument.value;
    }
    console.log(value, valueName);
    switch(valueName) {
        // Валидация имени и фамилии
        case 'first_name':
        if (validateNickname(value)) {
            return '';
        }
        return 'Неправильно введено имя';
        case 'last_name':
        if (validateNickname(value)) {
            return '';
        }
        return 'Неправильно введена фамилия';
        // Валидация email
        case 'email':
        if (validateEmail(value)) {
            return '';
        }
        return 'Неправильный email';
        // Валидация пароля
        case 'password':
        if (validatePassword(value, additionalDetails)) {
            return '';
        }
        if (value.length < MIN_PASSWORD_LENGTH) {
            return 'Пароль должен быть не меньше 8 символов';
        }
        return 'Пароль должен включать хотя бы одну букву каждого регистра и цифру';
        // Валидация подтверждения пароля
        case 'confirm_password':
        if (password !== value) {
            return 'Пароли должны совпадать';
        }
        return '';
        case 'offer_floor':
            if (validateDoubleNumeric(value)) {
                return '';
            }
            return "От 1 до 99";
        case 'offer_flat':
            if (validateFlat(value)) {
                return '';
            }
            return "от 1 до 9999";
        case 'offer_address':
            if (validateAddress(value)) {
                return '';
            }
            return "Неправильный формат адреса";
        case 'offer_square':
            if (validateTripleNumeric(value)) {
                return '';
            }
            return "От 1 до 999";
        case 'offer_price':
            if (validateNumeric(value)) {
                return '';
            }
            return "Неправильно введена цена";
        default:
        return '';
    }
}

/**
 * @function parseForm
 * @description Функция для парсинга форм.
 * @param {HTMLFormElement} form Форма
 * @returns {{name: *, value: *, error: string}[]} Массив объектов с именем, значением и ошибкой
 */
export const parseForm = function(form: HTMLFormElement) {
    const {elements} = form;
    return Array.from(elements)
        .filter((item) => {
            const input = item as HTMLInputElement;
            return input.name;
        })
        .map((element) => {
            const input = element as HTMLInputElement;
            const {name, value} = input;
            const error = "";

            return {error, name, value};
        });
}

